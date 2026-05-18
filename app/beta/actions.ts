"use server";

import { getSupabaseServer } from "@/lib/supabase-server";

export type WaitlistResult = {
  ok: boolean;
  message: string;
};

// Basic email shape — not RFC-perfect but catches typos.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function joinWaitlist(formData: FormData): Promise<WaitlistResult> {
  const rawEmail = formData.get("email");
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

  if (!email) {
    return { ok: false, message: "Please enter your email address." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "That doesn't look like a valid email." };
  }
  if (email.length > 255) {
    return { ok: false, message: "Email is too long." };
  }

  const supabase = getSupabaseServer();

  // If Supabase env vars aren't configured yet, gracefully accept the signup
  // and log to the server console. Replace once env vars are set in Vercel.
  if (!supabase) {
    console.warn(
      `[waitlist] Supabase not configured — would have stored: ${email}`
    );
    return {
      ok: true,
      message: "Thanks! You're on the list. We'll be in touch when the beta opens.",
    };
  }

  const { error } = await supabase.from("waitlist").insert({
    email,
    source: "beta-page",
  });

  if (error) {
    // Duplicate (already on the list) — treat as success
    if (error.code === "23505") {
      return {
        ok: true,
        message: "You're already on the list — we'll let you know when the beta opens.",
      };
    }
    console.error("[waitlist] insert error:", error);
    return {
      ok: false,
      message: "Something went wrong. Please try again in a moment.",
    };
  }

  return {
    ok: true,
    message: "Thanks! You're on the list. We'll be in touch when the beta opens.",
  };
}
