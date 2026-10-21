import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const url = import.meta.env["VITE_SUPABASE_URL"];
const key = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

if (!url || !key) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY.");
}

// Anonymous client: the leaderboard needs no sign-in, so no session is persisted.
export const supabase = createClient<Database>(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});
