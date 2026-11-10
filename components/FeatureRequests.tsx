"use client";

import { useMemo, useState, useTransition } from "react";
import { suggestFeature, toggleVote, type FormResult } from "@/app/feedback/actions";
import type { FeatureRequest, FeatureStatus } from "@/lib/feedback";

const STATUS_LABEL: Record<FeatureStatus, { text: string; className: string } | null> = {
  open: null,
  planned: { text: "Planned", className: "bg-bluetint text-cocoa" },
  in_progress: { text: "In progress", className: "bg-sunshine/40 text-cocoa" },
  shipped: { text: "Shipped", className: "bg-greentint text-cocoa" },
};

function rank(list: FeatureRequest[]) {
  // Shipped items drop to the bottom; everything else ranks by votes, then oldest first.
  return [...list].sort((a, b) => {
    const as = a.status === "shipped" ? 1 : 0;
    const bs = b.status === "shipped" ? 1 : 0;
    if (as !== bs) return as - bs;
    if (b.voteCount !== a.voteCount) return b.voteCount - a.voteCount;
    return a.createdAt.localeCompare(b.createdAt);
  });
}

export default function FeatureRequests({
  initialFeatures,
  initialVotes,
}: {
  initialFeatures: FeatureRequest[];
  initialVotes: string[];
}) {
  const [features, setFeatures] = useState(initialFeatures);
  const [voted, setVoted] = useState(() => new Set(initialVotes));
  const [busy, setBusy] = useState<string | null>(null);
  const [voteError, setVoteError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const ranked = useMemo(() => rank(features), [features]);

  async function onVote(f: FeatureRequest) {
    if (busy || f.status === "shipped") return;
    setVoteError(false);
    setBusy(f.id);

    // Optimistic update
    const wasVoted = voted.has(f.id);
    const apply = (isVoted: boolean, count: number) => {
      setVoted((prev) => {
        const next = new Set(prev);
        if (isVoted) next.add(f.id);
        else next.delete(f.id);
        return next;
      });
      setFeatures((prev) => prev.map((x) => (x.id === f.id ? { ...x, voteCount: count } : x)));
    };
    apply(!wasVoted, f.voteCount + (wasVoted ? -1 : 1));

    const res = await toggleVote(f.id);
    if (res.ok) apply(res.voted, res.voteCount);
    else {
      apply(wasVoted, f.voteCount);
      setVoteError(true);
    }
    setBusy(null);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-warmbrown">
          Vote for the ideas you want most. The list is ranked by votes.
        </p>
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="h-11 self-start whitespace-nowrap rounded-full border-2 border-coral px-5 text-sm font-bold text-coral transition-colors hover:bg-coraltint sm:self-auto"
          >
            + Suggest a feature
          </button>
        )}
      </div>

      {showForm && <SuggestForm onClose={() => setShowForm(false)} />}

      {voteError && (
        <p role="status" className="mt-4 text-sm font-medium text-coral">
          Your vote didn&rsquo;t go through. Please try again.
        </p>
      )}

      {ranked.length === 0 ? (
        <div className="mt-8 rounded-card border border-dashed border-sand bg-cream p-10 text-center">
          <p className="text-lg font-bold text-cocoa">No feature requests yet</p>
          <p className="mt-2 text-sm text-warmbrown">
            Have an idea for Pixley? Be the first to suggest one.
          </p>
        </div>
      ) : (
        <ol className="mt-8 space-y-3">
          {ranked.map((f, i) => {
            const isVoted = voted.has(f.id);
            const badge = STATUS_LABEL[f.status];
            const shipped = f.status === "shipped";
            return (
              <li
                key={f.id}
                className="flex items-start gap-4 rounded-card border border-sand bg-white/60 p-4 sm:p-5"
              >
                <button
                  type="button"
                  onClick={() => onVote(f)}
                  disabled={shipped || busy === f.id}
                  aria-pressed={isVoted}
                  aria-label={`${isVoted ? "Remove your vote for" : "Vote for"} ${f.title}. ${f.voteCount} ${f.voteCount === 1 ? "vote" : "votes"}.`}
                  className={`flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border-2 transition-colors ${
                    isVoted
                      ? "border-coral bg-coral text-cream"
                      : "border-sand bg-cream text-cocoa hover:border-coral"
                  } ${shipped ? "cursor-default opacity-60" : ""}`}
                >
                  <svg viewBox="0 0 12 8" className="h-2.5 w-3.5" aria-hidden="true">
                    <path d="M6 0 12 8H0z" fill="currentColor" />
                  </svg>
                  <span className="mt-1 text-lg font-bold leading-none">{f.voteCount}</span>
                </button>

                <div className="min-w-0 flex-1 pt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-warmbrown">#{i + 1}</span>
                    <h3 className="text-base font-bold text-cocoa sm:text-lg">{f.title}</h3>
                    {badge && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${badge.className}`}
                      >
                        {badge.text}
                      </span>
                    )}
                  </div>
                  {f.description && (
                    <p className="mt-1 whitespace-pre-line text-sm text-warmbrown">
                      {f.description}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function SuggestForm({ onClose }: { onClose: () => void }) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<FormResult | null>(null);

  const inputClass =
    "w-full rounded-2xl border-2 border-sand bg-white px-4 py-3 text-base text-cocoa placeholder:text-warmbrown/60 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30 transition-all disabled:opacity-60";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => setResult(await suggestFeature(fd)));
  }

  if (result?.ok) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-6 rounded-card border-2 border-teal bg-teal/10 px-6 py-5 text-center"
      >
        <p className="text-lg font-bold text-teal">{result.message}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 text-sm font-medium text-cocoa underline hover:text-coral"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Suggest a feature"
      className="mt-6 space-y-4 rounded-card border-2 border-coral bg-coraltint/40 p-5 sm:p-6"
    >
      <div>
        <label htmlFor="fr-title" className="mb-1.5 block text-sm font-bold text-cocoa">
          Your idea
        </label>
        <input
          id="fr-title"
          name="title"
          type="text"
          required
          minLength={3}
          maxLength={120}
          placeholder="e.g. Separate profiles for each kid"
          disabled={pending}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="fr-description" className="mb-1.5 block text-sm font-bold text-cocoa">
          Details <span className="font-normal text-warmbrown">(optional)</span>
        </label>
        <textarea
          id="fr-description"
          name="description"
          rows={3}
          maxLength={1000}
          placeholder="How would it help your family?"
          disabled={pending}
          className={`${inputClass} resize-y`}
        />
      </div>
      <div>
        <label htmlFor="fr-email" className="mb-1.5 block text-sm font-bold text-cocoa">
          Email <span className="font-normal text-warmbrown">(optional, never shown publicly)</span>
        </label>
        <input
          id="fr-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          disabled={pending}
          className={inputClass}
        />
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="fr-website">Website</label>
        <input id="fr-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {result && !result.ok && (
        <p role="status" aria-live="polite" className="text-sm font-medium text-coral">
          {result.message}
        </p>
      )}

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={pending}
          className="h-11 rounded-full px-5 text-sm font-medium text-cocoa hover:bg-sand/60"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pending}
          className="h-11 rounded-full bg-coral px-6 text-sm font-bold text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Submit idea"}
        </button>
      </div>
    </form>
  );
}
