CREATE TABLE public.leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name TEXT NOT NULL,
  score INT NOT NULL,
  max_score INT NOT NULL,
  rank_title TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.leaderboard TO anon;
GRANT SELECT, INSERT ON public.leaderboard TO authenticated;
GRANT ALL ON public.leaderboard TO service_role;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read leaderboard" ON public.leaderboard FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can submit a score" ON public.leaderboard FOR INSERT TO anon, authenticated WITH CHECK (score >= 0 AND score <= max_score AND char_length(player_name) BETWEEN 1 AND 30);