// Classement en ligne via Supabase (table public.leaderboard).
export function isLeaderboardConfigured() {
  return Boolean(
    import.meta.env["VITE_SUPABASE_URL"] && import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"],
  );
}

export interface LeaderboardRow {
  id: string;
  player_name: string;
  score: number;
  max_score: number;
  rank_title: string;
  created_at: string;
}

export async function fetchTopScores(limit = 20): Promise<LeaderboardRow[]> {
  if (!isLeaderboardConfigured()) return [];
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase
      .from("leaderboard")
      .select("id, player_name, score, max_score, rank_title, created_at")
      .order("score", { ascending: false })
      .order("created_at", { ascending: true })
      .limit(limit);
    if (error) {
      console.error("leaderboard fetch", error);
      return [];
    }
    return data ?? [];
  } catch {
    return [];
  }
}

export async function submitScore(
  playerName: string,
  score: number,
  maxScore: number,
  rankTitle: string,
): Promise<boolean> {
  if (!isLeaderboardConfigured()) return false;
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { error } = await supabase.from("leaderboard").insert({
      player_name: playerName.trim().slice(0, 30),
      score,
      max_score: maxScore,
      rank_title: rankTitle,
    });
    if (error) {
      console.error("leaderboard insert", error);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Rang du joueur juste après publication : nombre de scores strictement supérieurs + 1.
export async function fetchPlayerRank(
  score: number,
): Promise<{ rank: number; total: number } | null> {
  if (!isLeaderboardConfigured()) return null;
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const higher = await supabase
      .from("leaderboard")
      .select("id", { count: "exact", head: true })
      .gt("score", score);
    const all = await supabase.from("leaderboard").select("id", { count: "exact", head: true });
    if (higher.error || all.error || higher.count == null || all.count == null) return null;
    return { rank: higher.count + 1, total: all.count };
  } catch {
    return null;
  }
}

export function rankTitle(pct: number, lang: "fr" | "en"): string {
  if (lang === "en") {
    return pct >= 0.8 ? "AI Architect" : pct >= 0.5 ? "Model Tamer" : "Prompt Apprentice";
  }
  return pct >= 0.8 ? "Architecte IA" : pct >= 0.5 ? "Dompteur de modèles" : "Apprenti prompteur";
}
