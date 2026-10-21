import { Button } from "../components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ExplainToggle } from "../components/ExplainToggle";
import { loadScores, recordLevelResult } from "../lib/scores";
import { useLang } from "../lib/i18n";
import { LEVELS, type Level } from "../data/parcours";
import { EN_LEVELS } from "../data/en";

export const Route = createFileRoute("/parcours")({
  head: () => ({
    meta: [
      { title: "Parcours progressif : de débutant à expert | model.quest" },
      {
        name: "description",
        content:
          "4 niveaux déblocables pour apprendre progressivement : le provider, le modèle, l'effort de raisonnement, puis le combo complet. Progression sauvegardée.",
      },
      { property: "og:title", content: "Parcours progressif : model.quest" },
      {
        property: "og:description",
        content: "Montez de niveau en niveau et maîtrisez le choix des modèles d'IA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Parcours,
});

const PASS_RATIO = 0.66;

function Parcours() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const [unlocked, setUnlocked] = useState(1);
  const [best, setBest] = useState<Record<number, { good: number; total: number }>>({});
  const [level, setLevel] = useState<Level | null>(null);
  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [good, setGood] = useState(0);
  const [levelDone, setLevelDone] = useState<null | boolean>(null);

  useEffect(() => {
    const state = loadScores();
    setUnlocked(Math.min(state.parcoursUnlocked, LEVELS.length));
    setBest(state.parcoursBest);
  }, []);

  function startLevel(l: Level) {
    setLevel(l);
    setQ(0);
    setPicked(null);
    setGood(0);
    setLevelDone(null);
  }

  function pickOpt(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (!level?.questions[q]) return;
    if (i === level.questions[q].answer) setGood((g) => g + 1);
  }

  function next() {
    if (!level) return;
    if (q + 1 >= level.questions.length) {
      const total = level.questions.length;
      const passed = good / total >= PASS_RATIO;
      setLevelDone(passed);
      const state = recordLevelResult(level.id, good, total, passed);
      setUnlocked(Math.min(state.parcoursUnlocked, LEVELS.length));
      setBest(state.parcoursBest);
    } else {
      setQ(q + 1);
      setPicked(null);
    }
  }

  const levelName = (l: Level) => (en ? (EN_LEVELS[l.id]?.name ?? l.name) : l.name);
  const levelTagline = (l: Level) => (en ? (EN_LEVELS[l.id]?.tagline ?? l.tagline) : l.tagline);
  const questionText = (l: Level, qi: number, field: "prompt" | "simple" | "tech") =>
    en
      ? (EN_LEVELS[l.id]?.questions[qi]?.[field] ?? l.questions[qi]?.[field] ?? "")
      : (l.questions[qi]?.[field] ?? "");
  const optionText = (l: Level, qi: number, oi: number) =>
    en
      ? (EN_LEVELS[l.id]?.questions[qi]?.options[oi] ?? l.questions[qi]?.options[oi] ?? "")
      : (l.questions[qi]?.options[oi] ?? "");

  if (level) {
    const nextLevel = LEVELS[level.id];
    const question = level.questions[q];
    if (!question) return null;
    return (
      <div className="flex min-h-screen flex-col">
        <Nav />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
          <Button
            variant="unstyled"
            type="button"
            onClick={() => setLevel(null)}
            className="font-mono text-xs text-muted-foreground hover:text-primary"
          >
            {t("journey.back")}
          </Button>
          <p className="mt-4 font-mono text-sm text-primary">
            $ {t("journey.level")} {level.id} : {levelName(level)}
          </p>

          {levelDone === null ? (
            <>
              <div className="mt-4 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>
                  {t("journey.question")} {q + 1}/{level.questions.length}
                </span>
                <span>
                  {t("journey.good")}: <span className="text-primary">{good}</span>
                </span>
              </div>
              <div
                key={q}
                className="animate-rise mt-4 rounded-xl border border-border bg-card p-6"
              >
                <h2 className="text-lg font-semibold leading-snug text-foreground">
                  {questionText(level, q, "prompt")}
                </h2>
                <div className="mt-4 space-y-2">
                  {question.options.map((_, i) => {
                    const isAnswer = i === question.answer;
                    const isPicked = i === picked;
                    let cls = "border-border bg-terminal hover:border-primary/60";
                    if (picked !== null) {
                      if (isAnswer) cls = "card-glow animate-pop border-primary bg-secondary";
                      else if (isPicked)
                        cls = "animate-shake border-destructive/60 bg-terminal opacity-80";
                      else cls = "border-border/50 bg-terminal opacity-50";
                    }
                    return (
                      <Button
                        variant="unstyled"
                        type="button"
                        key={i}
                        onClick={() => pickOpt(i)}
                        className={`w-full rounded-lg border p-3 text-left text-sm text-foreground transition-all ${cls}`}
                      >
                        <span className="mr-2 font-mono text-xs text-muted-foreground">
                          {String.fromCharCode(97 + i)})
                        </span>
                        {optionText(level, q, i)}
                      </Button>
                    );
                  })}
                </div>
              </div>
              {picked !== null && (
                <div aria-live="polite" className="animate-rise mt-4 space-y-4">
                  <ExplainToggle
                    simple={questionText(level, q, "simple")}
                    tech={questionText(level, q, "tech")}
                  />
                  <Button
                    variant="unstyled"
                    type="button"
                    onClick={next}
                    className="w-full rounded-lg bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                  >
                    {q + 1 >= level.questions.length ? t("journey.finish") : t("journey.nextQ")}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div
              aria-live="polite"
              className="animate-rise mt-8 rounded-xl border border-border bg-card p-8 text-center"
            >
              {levelDone ? (
                <>
                  <p className="animate-badge inline-block text-4xl">🏆</p>
                  <h2 className="mt-3 text-2xl font-bold text-primary text-glow">
                    {t("journey.passed")}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    {good}/{level.questions.length} {t("journey.good")}.
                    {level.id < LEVELS.length
                      ? ` ${t("journey.level")} ${level.id + 1} « ${nextLevel ? levelName(nextLevel) : ""} » ${t("journey.unlocked")}.`
                      : ` ${t("journey.allDone")}`}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-4xl">🔁</p>
                  <h2 className="mt-3 text-2xl font-bold text-amber-glow">{t("journey.failed")}</h2>
                  <p className="mt-2 text-muted-foreground">
                    {good}/{level.questions.length} {t("journey.good")} : {t("journey.need")}{" "}
                    {Math.ceil(level.questions.length * PASS_RATIO)} {t("journey.toUnlock")}.
                  </p>
                </>
              )}
              <div className="mt-6 flex justify-center gap-3">
                <Button
                  variant="unstyled"
                  type="button"
                  onClick={() => startLevel(level)}
                  className="rounded-lg border border-border bg-terminal px-5 py-2.5 font-mono text-sm text-foreground hover:border-primary/60"
                >
                  {t("journey.replay")}
                </Button>
                <Button
                  variant="unstyled"
                  type="button"
                  onClick={() => setLevel(null)}
                  className="rounded-lg bg-primary px-5 py-2.5 font-mono text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform"
                >
                  {t("journey.levels")}
                </Button>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <p className="font-mono text-sm text-primary">$ journey --start</p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">{t("journey.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("journey.sub")}</p>
        <div className="mt-8 space-y-3">
          {LEVELS.map((l) => {
            const isUnlocked = l.id <= unlocked;
            const isDone = l.id < unlocked;
            const record = best[l.id];
            return (
              <Button
                variant="unstyled"
                type="button"
                key={l.id}
                disabled={!isUnlocked}
                onClick={() => startLevel(l)}
                className={`flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-all ${
                  isUnlocked
                    ? "card-hover-neon border-border bg-card"
                    : "cursor-not-allowed border-border/40 bg-terminal opacity-50"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-lg font-bold ${
                    isDone
                      ? "bg-primary text-primary-foreground"
                      : isUnlocked
                        ? "border border-primary/50 text-primary"
                        : "border border-border text-muted-foreground"
                  }`}
                >
                  {isDone ? "✓" : l.id}
                </span>
                <div className="min-w-0">
                  <h2 className="font-semibold text-foreground">
                    {levelName(l)}
                    {!isUnlocked && (
                      <span className="ml-2 font-mono text-xs text-muted-foreground">
                        {t("journey.locked")}
                      </span>
                    )}
                  </h2>
                  <p className="text-sm text-muted-foreground">{levelTagline(l)}</p>
                </div>
                <span className="ml-auto text-right font-mono text-xs text-muted-foreground">
                  {l.questions.length} {t("journey.questions")}
                  {record && (
                    <span className="block text-primary">
                      {t("journey.record")} : {record.good}/{record.total}
                    </span>
                  )}
                </span>
              </Button>
            );
          })}
        </div>
        <p className="mt-6 text-center font-mono text-xs text-muted-foreground">
          {t("journey.saved")}
        </p>
      </main>
      <Footer />
    </div>
  );
}
