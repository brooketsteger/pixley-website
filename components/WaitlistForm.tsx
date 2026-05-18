"use client";

import { useState, useTransition } from "react";
import { joinWaitlist, type WaitlistResult } from "@/app/beta/actions";

type Size = "default" | "large";

export default function WaitlistForm({
  size = "default",
  id,
}: {
  size?: Size;
  id?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<WaitlistResult | null>(null);
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await joinWaitlist(fd);
      setResult(res);
      if (res.ok) setEmail("");
    });
  }

  const inputClasses =
    size === "large"
      ? "h-14 text-lg px-5"
      : "h-12 text-base px-4";
  const buttonClasses =
    size === "large"
      ? "h-14 px-7 text-lg"
      : "h-12 px-6 text-base";

  // Success state: hide the form entirely and show a prominent confirmation.
  if (result?.ok) {
    return (
      <div id={id} className="w-full">
        <div
          role="status"
          aria-live="polite"
          className="rounded-card border-2 border-teal bg-teal/10 px-6 py-5 text-center"
        >
          <p className="text-xl font-bold text-teal md:text-2xl">
            {result.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id={id} className="w-full">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
        aria-label="Join the Pixley beta waitlist"
      >
        <label htmlFor={`${id || "waitlist"}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id || "waitlist"}-email`}
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={pending}
          className={`flex-1 rounded-full border-2 border-sand bg-white text-cocoa placeholder:text-warmbrown/60 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30 transition-all ${inputClasses}`}
        />
        <button
          type="submit"
          disabled={pending}
          className={`whitespace-nowrap rounded-full bg-coral font-bold text-cream hover:opacity-90 disabled:opacity-60 transition-opacity ${buttonClasses}`}
        >
          {pending ? "Joining…" : "Join the Waitlist"}
        </button>
      </form>

      {result && !result.ok && (
        <p
          role="status"
          aria-live="polite"
          className="mt-3 text-base font-medium text-coral"
        >
          {result.message}
        </p>
      )}

      {!result && (
        <p className="mt-3 text-xs text-warmbrown">
          We&rsquo;ll only email you when the beta opens. No spam, ever.
        </p>
      )}
    </div>
  );
}
