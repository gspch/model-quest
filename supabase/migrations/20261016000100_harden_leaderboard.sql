ALTER TABLE public.leaderboard ADD CONSTRAINT leaderboard_max_score_check CHECK (max_score = 64) NOT VALID;
ALTER TABLE public.leaderboard ADD CONSTRAINT leaderboard_rank_title_check CHECK (rank_title IN ('Architecte IA','Dompteur de modèles','Apprenti prompteur','AI Architect','Model Tamer','Prompt Apprentice')) NOT VALID;
ALTER TABLE public.leaderboard ADD CONSTRAINT leaderboard_trimmed_name_check CHECK (char_length(btrim(player_name)) BETWEEN 1 AND 30) NOT VALID;
ALTER TABLE public.leaderboard VALIDATE CONSTRAINT leaderboard_max_score_check;
ALTER TABLE public.leaderboard VALIDATE CONSTRAINT leaderboard_rank_title_check;
ALTER TABLE public.leaderboard VALIDATE CONSTRAINT leaderboard_trimmed_name_check;