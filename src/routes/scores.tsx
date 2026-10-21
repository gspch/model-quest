import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { fetchTopScores, isLeaderboardConfigured, type LeaderboardRow } from "../lib/leaderboard";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/scores")({
  head: () => ({
    meta: [
      { title: "Classement mondial | model.quest" },
      {
        name: "description",
        content: "Les meilleurs scores du quiz model.quest, sauvegardés en ligne.",
      },
      { property: "og:title", content: "Classement mondial : model.quest" },
      {
        property: "og:description",
        content: "Comparez votre score au classement mondial et partagez votre badge.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Scores,
});

const MEDAL_CLS = [
  "text-amber-glow font-bold",
  "text-foreground font-bold",
  "text-amber-glow/70 font-bold",
];

function Scores() {
  const { t, lang } = useLang();
  const [rows, setRows] = useState<LeaderboardRow[] | null>(null);

  useEffect(() => {
    fetchTopScores().then(setRows);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <p className="font-mono text-sm text-primary">$ leaderboard --global</p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">{t("scores.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("scores.sub")}</p>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
          <div className="grid grid-cols-[3rem_1fr_5rem_7rem] gap-2 border-b border-border bg-terminal px-4 py-2.5 font-mono text-[11px] text-muted-foreground sm:grid-cols-[3rem_1fr_6rem_8rem_7rem]">
            <span>#</span>
            <span>{t("scores.player")}</span>
            <span className="text-right">{t("scores.score")}</span>
            <span className="hidden sm:block">{t("scores.rank")}</span>
            <span className="text-right">{t("scores.date")}</span>
          </div>
          {!isLeaderboardConfigured() ? (
            <p role="status" className="p-8 text-center text-sm text-muted-foreground">
              {t("scores.unconfigured")}
            </p>
          ) : rows === null ? (
            <div className="space-y-2 p-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-9 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : rows.length === 0 ? (
            <p className="p-8 text-center font-mono text-sm text-muted-foreground">
              {t("scores.empty")}
            </p>
          ) : (
            rows.map((r, i) => (
              <div
                key={r.id}
                className="animate-rise grid grid-cols-[3rem_1fr_5rem_7rem] items-center gap-2 border-b border-border/40 px-4 py-3 font-mono text-sm last:border-0 sm:grid-cols-[3rem_1fr_6rem_8rem_7rem]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className={MEDAL_CLS[i] ?? "text-muted-foreground"}>{i + 1}.</span>
                <span className="truncate text-foreground">{r.player_name}</span>
                <span className="text-right text-primary">
                  {r.score}/{r.max_score}
                </span>
                <span className="hidden truncate text-xs text-muted-foreground sm:block">
                  {r.rank_title}
                </span>
                <span className="text-right text-xs text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString(lang === "en" ? "en-US" : "fr-FR")}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/quiz"
            className="inline-block rounded-lg bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            {t("scores.play")}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
