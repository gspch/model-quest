import { afterEach, expect, it, vi } from "vitest";
import {
  fetchTopScores,
  fetchPlayerRank,
  submitScore,
  isLeaderboardConfigured,
} from "../lib/leaderboard";
afterEach(() => vi.unstubAllEnvs());
it("degrades gracefully without environment configuration", async () => {
  vi.stubEnv("VITE_SUPABASE_URL", "");
  vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "");
  expect(isLeaderboardConfigured()).toBe(false);
  expect(await fetchTopScores()).toEqual([]);
  expect(await fetchPlayerRank(32)).toBeNull();
  expect(await submitScore("Player", 32, 64, "Model Tamer")).toBe(false);
});
