"use client";

import { useState, useTransition } from "react";
import { submitBugReport, type FormResult } from "@/app/feedback/actions";

const inputClass =
  "w-full rounded-2xl border-2 border-sand bg-white px-4 py-3 text-base text-cocoa placeholder:text-warmbrown/60 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30 transition-all disabled:opacity-60";

export default function BugReportForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<FormResult | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    startTransition(async () => {
      const res = await submitBugReport(fd);
      setResult(res);
      if (res.ok) form.reset();
    });
  }

  if (result?.ok) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-card border-2 border-teal bg-teal/10 px-6 py-6 text-center"
      >
        <p className="text-xl font-bold text-teal">{result.message}</p>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-4 text-sm font-medium text-cocoa underline hover:text-coral"
        >
          Report another bug
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-label="Report a bug">
      <div>
        <label htmlFor="bug-email" className="mb-1.5 block text-sm font-bold text-cocoa">
          Your email
        </label>
        <input
          id="bug-email"
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          disabled={pending}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="bug-description" className="mb-1.5 block text-sm font-bold text-cocoa">
          What went wrong?
        </label>
        <textarea
          id="bug-description"
          name="description"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="What were you doing, what did you expect, and what happened instead?"
          disabled={pending}
          className={`${inputClass} resize-y`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bug-device" className="mb-1.5 block text-sm font-bold text-cocoa">
            Device <span className="font-normal text-warmbrown">(optional)</span>
          </label>
          <input
            id="bug-device"
            name="device"
            type="text"
            maxLength={200}
            placeholder="e.g. iPhone 15, iOS 18"
            disabled={pending}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="bug-version" className="mb-1.5 block text-sm font-bold text-cocoa">
            App version <span className="font-normal text-warmbrown">(optional)</span>
          </label>
          <input
            id="bug-version"
            name="app_version"
            type="text"
            maxLength={50}
            placeholder="e.g. 1.0.3"
            disabled={pending}
            className={inputClass}
          />
        </div>
      </div>

      {/* Honeypot — hidden from people, catches simple spam bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="bug-website">Website</label>
        <input id="bug-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-warmbrown">
          We&rsquo;ll only use your email to follow up on this report.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="h-12 whitespace-nowrap rounded-full bg-coral px-7 text-base font-bold text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send bug report"}
        </button>
      </div>

      {result && !result.ok && (
        <p role="status" aria-live="polite" className="text-base font-medium text-coral">
          {result.message}
        </p>
      )}
    </form>
  );
}
