import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Typewriter } from "../components/Typewriter";
import { loadScores, type ScoreState } from "../lib/scores";
import { MODELS, PROVIDERS, UPCOMING_MODELS } from "../data/models";
import { formatDataDate } from "../data/sources";
import { seo } from "../lib/seo";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      path: "/",
      title: "model.quest : Apprenez à choisir le bon modèle d'IA",
      description:
        "Un jeu interactif pour apprendre à choisir entre OpenAI, Google, Anthropic, DeepSeek, Mistral, Meta, Alibaba et Cohere : quel provider, quel modèle, quel effort de raisonnement, et pourquoi.",
      ogTitle: "model.quest : Quel modèle d'IA choisir ?",
    }),
  component: Home,
});

// Particules de données flottantes en arrière-plan
function Particles() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 53) % 100}%`,
    delay: `${(i * 1.7) % 12}s`,
    duration: `${9 + ((i * 3) % 8)}s`,
  }));
  return (
    <div className="data-particles" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          style={{ left: d.left, animationDelay: d.delay, animationDuration: d.duration }}
        />
      ))}
    </div>
  );
}

function Home() {
  const { t, lang } = useLang();
  const [records, setRecords] = useState<ScoreState | null>(null);

  useEffect(() => {
    setRecords(loadScores());
  }, []);

  const MODES = [
    {
      to: "/quiz",
      cmd: "run quiz",
      title: t("mode.quiz.title"),
      desc: t("mode.quiz.desc"),
      cta: t("mode.quiz.cta"),
    },
    {
      to: "/simulateur",
      cmd: "run simulator",
      title: t("mode.sim.title"),
      desc: t("mode.sim.desc"),
      cta: t("mode.sim.cta"),
    },
    {
      to: "/parcours",
      cmd: "run journey",
      title: t("mode.journey.title"),
      desc: t("mode.journey.desc"),
      cta: t("mode.journey.cta"),
    },
    {
      to: "/guide",
      cmd: "open guide",
      title: t("mode.guide.title"),
      desc: t("mode.guide.desc"),
      cta: t("mode.guide.cta"),
    },
    {
      to: "/scores",
      cmd: "open leaderboard",
      title: t("mode.scores.title"),
      desc: t("mode.scores.desc"),
      cta: t("mode.scores.cta"),
    },
  ] as const;

  return (
    <div className="flex min-h-screen flex-col">
      <Particles />
      <Nav />
      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 pb-24">
        <section className="py-16 text-center sm:py-24">
          <p className="font-mono text-sm text-primary text-glow">
            <Typewriter text={t("home.tagline")} />
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            {t("home.title1")}
            <br />
            <span className="animate-float inline-block text-primary text-glow">
              {t("home.title2")}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("home.intro")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/quiz"
              className="rounded-lg bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              {t("home.ctaQuiz")}
            </Link>
            <Link
              to="/simulateur"
              className="rounded-lg border border-border bg-card px-6 py-3 font-mono text-sm text-foreground transition-colors hover:border-primary/60"
            >
              {t("home.ctaSim")}
            </Link>
          </div>
          {records && (records.quizBest || records.parcoursUnlocked > 1) && (
            <div className="animate-rise mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-2 font-mono text-xs">
              {records.quizBest && (
                <span className="rounded-full border border-primary/40 bg-card px-3 py-1 text-primary">
                  {t("home.recordQuiz")} : {records.quizBest.score}/{records.quizBest.max}
                </span>
              )}
              {records.parcoursUnlocked > 1 && (
                <span className="rounded-full border border-cyan-glow/40 bg-card px-3 py-1 text-cyan-glow">
                  {t("home.journeyLevel")} {records.parcoursUnlocked}
                </span>
              )}
            </div>
          )}
        </section>

        {UPCOMING_MODELS.map((u) => (
          <Link
            key={u.id}
            to="/guide"
            hash={`provider-${u.providerId}`}
            className="animate-rise mx-auto mb-8 flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-lg border border-dashed border-amber-glow/60 bg-card px-4 py-2 font-mono text-xs text-amber-glow transition-colors hover:bg-secondary"
          >
            <span className="rounded border border-amber-glow/60 px-1.5 py-px text-[10px]">
              {t("upcoming.badge")}
            </span>
            <span>{t("upcoming.home").replace("{name}", u.name)}</span>
            <span className="text-muted-foreground">{formatDataDate(u.weightsDate, lang)}</span>
          </Link>
        ))}

        <section className="grid gap-4 sm:grid-cols-2">
          {MODES.map((m, i) => (
            <Link
              key={m.to}
              to={m.to}
              className="group animate-rise card-hover-neon rounded-xl border border-border bg-card p-6"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="font-mono text-xs text-primary">$ {m.cmd}</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">{m.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              <span className="mt-4 inline-block font-mono text-sm text-primary group-hover:text-glow">
                {m.cta} →
              </span>
            </Link>
          ))}
        </section>

        <section className="mt-16 rounded-xl border border-border bg-terminal p-6 scanlines scan-sweep">
          <h2 className="font-mono text-sm font-semibold text-primary">{t("home.rules")}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              ["01", t("home.rule1t"), t("home.rule1d")],
              ["02", t("home.rule2t"), t("home.rule2d")],
              ["03", t("home.rule3t"), t("home.rule3d")],
            ].map(([n, title, d]) => (
              <div key={n}>
                <p className="font-mono text-2xl font-bold text-primary/60">{n}</p>
                <h3 className="mt-1 font-semibold text-foreground">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-10 text-center font-mono text-xs text-muted-foreground">
          {PROVIDERS.length} providers · {MODELS.length} {t("home.disclaimer")}
        </p>
        <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground/60">
          {t("home.langNotice")}
        </p>
      </main>
      <Footer />
    </div>
  );
}
