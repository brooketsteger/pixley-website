"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { WaitlistResult } from "@/app/beta/actions";

type WaitlistContextValue = {
  success: WaitlistResult | null;
  setSuccess: (result: WaitlistResult) => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

/**
 * Shares waitlist success state across every WaitlistForm on the page, so that
 * submitting one form flips all of them into the thank-you state.
 */
export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [success, setSuccess] = useState<WaitlistResult | null>(null);
  return (
    <WaitlistContext.Provider value={{ success, setSuccess }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  return useContext(WaitlistContext);
}
