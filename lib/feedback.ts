import { cookies } from "next/headers";
import { getSupabaseServer } from "@/lib/supabase-server";

export type FeatureStatus = "open" | "planned" | "in_progress" | "shipped";

export type FeatureRequest = {
  id: string;
  title: string;
  description: string | null;
  status: FeatureStatus;
  voteCount: number;
  createdAt: string;
};

// Loads the public, ranked feature list plus which items this browser has voted on.
// Returns an empty list (rather than throwing) if Supabase isn't reachable, so the
// rest of the page still renders.
export async function getFeatureRequests(): Promise<{
  features: FeatureRequest[];
  myVotes: string[];
}> {
  const supabase = getSupabaseServer();
  if (!supabase) return { features: [], myVotes: [] };

  const voterId = cookies().get("px_voter")?.value;

  const [list, votes] = await Promise.all([
    supabase
      .from("feature_requests")
      .select("id, title, description, status, vote_count, created_at")
      .order("vote_count", { ascending: false })
      .order("created_at", { ascending: true })
      .limit(200),
    voterId
      ? supabase.rpc("my_feature_votes", { p_voter_id: voterId })
      : Promise.resolve({ data: [] as string[], error: null }),
  ]);

  if (list.error) console.error("[feature_requests] select error:", list.error);
  if (votes.error) console.error("[feature_votes] my votes error:", votes.error);

  const features: FeatureRequest[] = (list.data ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    status: r.status as FeatureStatus,
    voteCount: r.vote_count,
    createdAt: r.created_at,
  }));

  const myVotes = ((votes.data ?? []) as unknown[]).map((v) =>
    typeof v === "string" ? v : String((v as Record<string, unknown>).my_feature_votes ?? "")
  );

  return { features, myVotes };
}
