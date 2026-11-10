"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase-server";

export type FormResult = { ok: boolean; message: string };
export type VoteResult = { ok: boolean; voted: boolean; voteCount: number };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VOTER_COOKIE = "px_voter";
const GENERIC_ERROR = "Something went wrong. Please try again in a moment.";

function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function checkEmail(email: string): string | null {
  if (!email) return "Please enter your email address.";
  if (!EMAIL_RE.test(email) || email.length > 255) return "That doesn't look like a valid email.";
  return null;
}

// Hidden "website" field — real people never fill it in, simple bots do.
function isBot(fd: FormData) {
  return str(fd, "website") !== "";
}

// ─── Bug reports ──────────────────────────────────────────────────────────────

export async function submitBugReport(fd: FormData): Promise<FormResult> {
  if (isBot(fd)) return { ok: true, message: "Thanks — we got your report." };

  const email = str(fd, "email").toLowerCase();
  const description = str(fd, "description");
  const device = str(fd, "device").slice(0, 200) || null;
  const appVersion = str(fd, "app_version").slice(0, 50) || null;

  const emailError = checkEmail(email);
  if (emailError) return { ok: false, message: emailError };
  if (description.length < 10)
    return { ok: false, message: "Please tell us a bit more about what happened." };
  if (description.length > 5000)
    return { ok: false, message: "That's a lot of detail! Please keep it under 5,000 characters." };

  const supabase = getSupabaseServer();
  if (!supabase) {
    console.error("[bug_reports] Supabase not configured — report NOT stored.");
    return { ok: false, message: GENERIC_ERROR };
  }

  const userAgent = (headers().get("user-agent") || "").slice(0, 500) || null;

  const { error } = await supabase.from("bug_reports").insert({
    email,
    description,
    device,
    app_version: appVersion,
    user_agent: userAgent,
  });

  if (error) {
    console.error("[bug_reports] insert error:", error);
    return { ok: false, message: GENERIC_ERROR };
  }

  return {
    ok: true,
    message: "Thanks — we got your report. We'll email you if we need more details.",
  };
}

// ─── Feature requests ─────────────────────────────────────────────────────────

export async function suggestFeature(fd: FormData): Promise<FormResult> {
  if (isBot(fd)) return { ok: true, message: "Thanks for the idea!" };

  const title = str(fd, "title");
  const description = str(fd, "description") || null;
  const email = str(fd, "email").toLowerCase();

  if (title.length < 3) return { ok: false, message: "Please give your idea a short title." };
  if (title.length > 120) return { ok: false, message: "Please keep the title under 120 characters." };
  if (description && description.length > 1000)
    return { ok: false, message: "Please keep the details under 1,000 characters." };
  if (email) {
    const emailError = checkEmail(email);
    if (emailError) return { ok: false, message: emailError };
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    console.error("[feature_requests] Supabase not configured — suggestion NOT stored.");
    return { ok: false, message: GENERIC_ERROR };
  }

  const { error } = await supabase.from("feature_requests").insert({
    title,
    description,
    submitter_email: email || null,
  });

  if (error) {
    console.error("[feature_requests] insert error:", error);
    return { ok: false, message: GENERIC_ERROR };
  }

  return {
    ok: true,
    message: "Thanks for the idea! We review new suggestions before they appear on the list.",
  };
}

// One anonymous id per browser, kept in an httpOnly cookie, so each visitor gets one vote
// per feature. No login needed.
function getOrCreateVoterId(): string {
  const jar = cookies();
  const existing = jar.get(VOTER_COOKIE)?.value;
  if (existing && existing.length >= 16 && existing.length <= 64) return existing;
  const id = crypto.randomUUID();
  jar.set(VOTER_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365 * 2,
  });
  return id;
}

export async function toggleVote(featureId: string): Promise<VoteResult> {
  const supabase = getSupabaseServer();
  if (!supabase) return { ok: false, voted: false, voteCount: 0 };

  const voterId = getOrCreateVoterId();
  const { data, error } = await supabase.rpc("toggle_feature_vote", {
    p_feature_id: featureId,
    p_voter_id: voterId,
  });

  const row = Array.isArray(data) ? data[0] : data;
  if (error || !row) {
    console.error("[feature_votes] toggle error:", error);
    return { ok: false, voted: false, voteCount: 0 };
  }

  revalidatePath("/feedback");
  return { ok: true, voted: !!row.voted, voteCount: Number(row.vote_count) || 0 };
}
