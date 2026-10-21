import { Button } from "../components/ui/button";
import { PromoBadge } from "../components/PromoBadge";
import { currentPrice } from "../data/models";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ExplainToggle } from "../components/ExplainToggle";
import { ShareBadge } from "../components/ShareBadge";
import { useCountUp } from "../hooks/use-count-up";
import { loadScores, recordQuizRun, type ScoreState } from "../lib/scores";
import {
  fetchPlayerRank,
  isLeaderboardConfigured,
  rankTitle,
  submitScore,
} from "../lib/leaderboard";
import { useLang } from "../lib/i18n";
import { ProviderLogo } from "../components/ProviderLogo";
import {
  EN_EFFORTS,
  EN_MODELS,
  EN_PROVIDERS,
  EN_SCENARIOS,
  EN_TIER_LABELS,
  EN_VERDICT_LABELS,
} from "../data/en";
import {
  EFFORTS,
  PROVIDERS,
  SCENARIOS,
  TIER_LABELS,
  VERDICT_LABELS,
  modelById,
  modelsOfProvider,
  profileOf,
  scoreChoice,
  type Effort,
} from "../data/models";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz : Quel modèle d'IA choisir ? | model.quest" },
      {
        name: "description",
        content:
          "8 scénarios réels : choisissez le bon provider, le bon modèle et le bon effort de raisonnement, puis comprenez pourquoi plusieurs réponses sont possibles.",
      },
      { property: "og:title", content: "Quiz : Quel modèle d'IA choisir ?" },
      { property: "og:description", content: "Testez votre instinct sur 8 cas d'usage concrets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Quiz,
});

type Step = "provider" | "model" | "effort" | "result";

const MAX_PER_SCENARIO = 8;

function Quiz() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState<Step>("provider");
  const [providerId, setProviderId] = useState<string | null>(null);
  const [modelId, setModelId] = useState<string | null>(null);
  const [effort, setEffort] = useState<Effort | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [records, setRecords] = useState<ScoreState | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [publishState, setPublishState] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [playerRank, setPlayerRank] = useState<{ rank: number; total: number } | null>(null);

  useEffect(() => {
    setRecords(loadScores());
  }, []);

  const scenario = SCENARIOS[idx] ?? SCENARIOS[0];
  if (!scenario) throw new Error("No quiz scenarios configured");
  const enScenario = en ? EN_SCENARIOS[scenario.id] : undefined;
  const chosenModel = modelId ? modelById(modelId) : undefined;
  const { points, choice } =
    modelId && effort ? scoreChoice(modelId, effort, scenario) : { points: 0, choice: null };

  const animatedScore = useCountUp(score, 700);

  const effortLabel = (e: Effort) => (en ? EN_EFFORTS[e].label : EFFORTS[e].label);
  const tierLabels = en ? EN_TIER_LABELS : TIER_LABELS;
  const verdictLabels = en ? EN_VERDICT_LABELS : VERDICT_LABELS;

  function next() {
    if (idx + 1 >= SCENARIOS.length) {
      setRecords(recordQuizRun(score, SCENARIOS.length * MAX_PER_SCENARIO));
      setDone(true);
    } else {
      setIdx(idx + 1);
    }
    setStep("provider");
    setProviderId(null);
    setModelId(null);
    setEffort(null);
  }

  function restart() {
    setIdx(0);
    setScore(0);
    setDone(false);
    setStep("provider");
    setProviderId(null);
    setModelId(null);
    setEffort(null);
    setPublishState("idle");
    setPlayerName("");
  }

  async function publish() {
    if (!playerName.trim() || publishState === "saving") return;
    setPublishState("saving");
    const max = SCENARIOS.length * MAX_PER_SCENARIO;
    const ok = await submitScore(playerName.trim(), score, max, rankTitle(score / max, lang));
    setPublishState(ok ? "done" : "error");
    if (ok) setPlayerRank(await fetchPlayerRank(score));
  }

  if (done) {
    const max = SCENARIOS.length * MAX_PER_SCENARIO;
    const pct = score / max;
    const isRecord = records?.quizBest?.score === score && score > 0;
    const title = rankTitle(pct, lang);
    const verdict =
      pct >= 0.8 ? t("quiz.verdictHigh") : pct >= 0.5 ? t("quiz.verdictMid") : t("quiz.verdictLow");
    return (
      <div className="flex min-h-screen flex-col">
        <Nav />
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-20 text-center">
          <p className="font-mono text-sm text-primary">{t("quiz.results")}</p>
          <h1 className="mt-4 text-5xl font-bold text-foreground">
            <span className="animate-pop inline-block">{animatedScore}</span>
            <span className="text-muted-foreground">/{max}</span>
          </h1>
          <p className="animate-badge mt-3 inline-block rounded-full border border-cyan-glow/50 bg-secondary px-4 py-1 font-mono text-xs text-cyan-glow text-glow-cyan">
            {title}
          </p>
          {isRecord && (
            <p className="animate-badge mt-3 ml-2 inline-block rounded-full border border-primary/50 bg-secondary px-4 py-1 font-mono text-xs text-primary text-glow">
              {t("quiz.newRecord")}
            </p>
          )}
          <div className="mx-auto mt-6 h-3 max-w-md overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000"
              style={{ width: `${pct * 100}%` }}
            />
          </div>
          <p className="mt-6 text-lg text-muted-foreground">{verdict}</p>
          {records && records.quizRuns > 0 && (
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              {records.quizRuns} {t("quiz.gamesPlayed")}
              {records.quizBest
                ? ` · ${t("quiz.record")} : ${records.quizBest.score}/${records.quizBest.max}`
                : ""}
            </p>
          )}

          <div className="mt-8 space-y-4 text-left">
            {isLeaderboardConfigured() && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-mono text-xs text-muted-foreground">
                  {t("quiz.saveOnline").toUpperCase()}
                </h3>
                {publishState === "done" ? (
                  <div className="animate-pop mt-3">
                    <p className="font-mono text-sm text-primary text-glow">
                      ✔ {t("quiz.published")}
                    </p>
                    {playerRank && (
                      <p className="mt-1 font-mono text-xs text-cyan-glow">
                        {t("quiz.yourRank")
                          .replace("{rank}", String(playerRank.rank))
                          .replace("{total}", String(playerRank.total))}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mt-3 flex gap-2">
                    <label htmlFor="player-name" className="sr-only">
                      {t("quiz.yourName")}
                    </label>
                    <input
                      id="player-name"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      maxLength={30}
                      placeholder={t("quiz.yourName")}
                      className="min-w-0 flex-1 rounded-lg border border-border bg-terminal px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                    />
                    <Button
                      variant="unstyled"
                      type="button"
                      onClick={publish}
                      disabled={!playerName.trim() || publishState === "saving"}
                      className="rounded-lg bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-40"
                    >
                      {publishState === "saving" ? "…" : t("quiz.publish")}
                    </Button>
                  </div>
                )}
                {publishState === "error" && (
                  <p className="mt-2 font-mono text-xs text-destructive">{t("quiz.saveError")}</p>
                )}
              </div>
            )}

            <ShareBadge score={score} max={max} title={title} />
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <Button
              variant="unstyled"
              type="button"
              onClick={restart}
              className="rounded-lg bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform"
            >
              {t("quiz.replay")}
            </Button>
            <a
              href="/guide"
              className="rounded-lg border border-border bg-card px-6 py-3 font-mono text-sm text-foreground hover:border-primary/60"
            >
              {t("quiz.readGuide")}
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <div className="mb-6 flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>
            {t("quiz.scenario")} {idx + 1}/{SCENARIOS.length}
          </span>
          <span>
            {t("quiz.score")}: <span className="text-primary">{score}</span>
            {records?.quizBest ? (
              <span className="ml-2">
                · {t("quiz.record")} {records.quizBest.score}
              </span>
            ) : null}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${((idx + (step === "result" ? 1 : 0)) / SCENARIOS.length) * 100}%` }}
          />
        </div>

        <div
          key={scenario.id + lang}
          className="animate-rise mt-8 rounded-xl border border-border bg-card p-6"
        >
          <p className="font-mono text-xs text-primary">$ scenario --load {scenario.id}</p>
          <h1 className="mt-2 text-2xl font-bold text-foreground">
            {enScenario?.title ?? scenario.title}
          </h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {enScenario?.story ?? scenario.story}
          </p>
        </div>

        {step === "provider" && (
          <section className="animate-rise mt-6">
            <h2 className="font-mono text-sm text-foreground">
              <span className="text-primary">1/3</span> : {t("quiz.step1")}
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
              {PROVIDERS.map((p) => (
                <Button
                  variant="unstyled"
                  type="button"
                  key={p.id}
                  onClick={() => {
                    setProviderId(p.id);
                    setStep("model");
                  }}
                  className="card-hover-neon flex flex-col gap-2 rounded-lg border border-border bg-card p-4 text-left"
                >
                  <span className="flex items-center gap-2">
                    <ProviderLogo provider={p} size="sm" />
                    <span className={`font-mono text-[10px] ${p.hue}`}>[{p.badge}]</span>
                  </span>
                  <span className="text-sm font-semibold text-foreground">{p.name}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {en ? (EN_PROVIDERS[p.id]?.tagline ?? p.tagline) : p.tagline}
                  </span>
                </Button>
              ))}
            </div>
          </section>
        )}

        {step === "model" && providerId && (
          <section className="animate-rise mt-6">
            <p className="mb-2 font-mono text-[11px] text-muted-foreground">
              {t("quiz.reminder")} {enScenario?.title ?? scenario.title}
            </p>
            <h2 className="font-mono text-sm text-foreground">
              <span className="text-primary">2/3</span> : {t("quiz.step2")}{" "}
              {PROVIDERS.find((p) => p.id === providerId)?.name} ?
            </h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {modelsOfProvider(providerId).map((m, i) => (
                <Button
                  variant="unstyled"
                  type="button"
                  key={m.id}
                  onClick={() => {
                    setModelId(m.id);
                    setStep("effort");
                  }}
                  className="animate-rise card-hover-neon rounded-lg border border-border bg-card p-4 text-left"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <p className="font-semibold text-foreground">
                    {m.name}
                    {profileOf(m.id).openWeights && (
                      <span className="ml-2 rounded border border-cyan-glow/50 px-1 py-px font-mono text-[9px] text-cyan-glow">
                        OW
                      </span>
                    )}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {tierLabels[m.tier]} · ${currentPrice(m).priceIn}/${currentPrice(m).priceOut}{" "}
                    /Mtok · {"★".repeat(m.quality)} · {profileOf(m.id).releaseTag} ·{" "}
                    {profileOf(m.id).paramsB === null
                      ? t("params.undisclosed")
                      : en
                        ? `≈${profileOf(m.id).paramsB}B`
                        : `≈${profileOf(m.id).paramsB} Md`}
                  </p>
                  <PromoBadge model={m} />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {en ? (EN_MODELS[m.id]?.bestFor ?? m.bestFor) : m.bestFor}
                  </p>
                </Button>
              ))}
            </div>
            <Button
              variant="unstyled"
              type="button"
              onClick={() => setStep("provider")}
              className="mt-3 font-mono text-xs text-muted-foreground hover:text-primary"
            >
              {t("quiz.backProvider")}
            </Button>
          </section>
        )}

        {step === "effort" && (
          <section className="animate-rise mt-6">
            <p className="mb-2 font-mono text-[11px] text-muted-foreground">
              {t("quiz.reminder")} {enScenario?.title ?? scenario.title} · {chosenModel?.name}
            </p>
            <h2 className="font-mono text-sm text-foreground">
              <span className="text-primary">3/3</span> : {t("quiz.step3")}
            </h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-4">
              {(Object.keys(EFFORTS) as Effort[]).map((e) => {
                const supported = chosenModel?.efforts.includes(e) ?? true;
                return (
                  <Button
                    variant="unstyled"
                    type="button"
                    key={e}
                    disabled={!supported}
                    onClick={() => {
                      setEffort(e);
                      if (modelId) setScore((s) => s + scoreChoice(modelId, e, scenario).points);
                      setStep("result");
                    }}
                    className={`rounded-lg border border-border bg-card p-4 text-left transition-all ${
                      supported ? "card-hover-neon" : "cursor-not-allowed opacity-40"
                    }`}
                  >
                    <p className="font-semibold text-foreground">{effortLabel(e)}</p>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                      {supported
                        ? `×${EFFORTS[e].costMultiplier} ${t("effort.output")}`
                        : t("quiz.notOffered")}
                    </p>
                  </Button>
                );
              })}
            </div>
            <Button
              variant="unstyled"
              type="button"
              onClick={() => setStep("model")}
              className="mt-3 font-mono text-xs text-muted-foreground hover:text-primary"
            >
              {t("quiz.backModel")}
            </Button>
          </section>
        )}

        {step === "result" && (
          <section aria-live="polite" className="animate-rise mt-6 space-y-4">
            <div
              className={`rounded-xl border p-5 ${
                points >= 7
                  ? "card-glow border-primary bg-card"
                  : points >= 4
                    ? "border-amber-glow/50 bg-card"
                    : "animate-shake border-destructive/50 bg-card"
              }`}
            >
              <p className="font-mono text-sm">
                {points >= 7 ? (
                  <span className="text-primary text-glow">
                    {t("quiz.excellent")} (+{points})
                  </span>
                ) : points >= 4 ? (
                  <span className="text-amber-glow">
                    {t("quiz.defensible")} (+{points})
                  </span>
                ) : (
                  <span className="text-destructive">
                    {t("quiz.risky")} (+{points})
                  </span>
                )}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("quiz.yourChoice")} :{" "}
                <span className="font-mono text-foreground">
                  {chosenModel?.name} / {t("effort")} {effort ? effortLabel(effort) : ""}
                </span>
              </p>
              {choice && (
                <p className="mt-2 text-sm text-muted-foreground">
                  <span
                    className={`font-mono text-xs ${
                      choice.verdict === "ideal"
                        ? "text-primary"
                        : choice.verdict === "valid"
                          ? "text-amber-glow"
                          : "text-destructive"
                    }`}
                  >
                    [{verdictLabels[choice.verdict]}]
                  </span>{" "}
                  {en ? (enScenario?.notes[choice.modelId] ?? choice.note) : choice.note}
                </p>
              )}
              {!choice && (
                <p className="mt-2 text-sm text-muted-foreground">{t("quiz.notListed")}</p>
              )}
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-mono text-xs text-muted-foreground">{t("quiz.allAnswers")}</h3>
              <div className="mt-3 space-y-2">
                {(["ideal", "valid", "risky"] as const).map((v) => {
                  const list = scenario.choices.filter((c) => c.verdict === v);
                  if (list.length === 0) return null;
                  return (
                    <div key={v}>
                      <p
                        className={`font-mono text-xs ${
                          v === "ideal"
                            ? "text-primary"
                            : v === "valid"
                              ? "text-amber-glow"
                              : "text-destructive"
                        }`}
                      >
                        {verdictLabels[v]}
                      </p>
                      <ul className="mt-1 space-y-1.5">
                        {list.map((c) => {
                          const m = modelById(c.modelId);
                          return (
                            <li
                              key={c.modelId}
                              className="rounded-lg border border-border/60 bg-terminal p-2.5 text-xs"
                            >
                              <span className="font-mono font-semibold text-foreground">
                                {m?.name} · {t("effort")} {effortLabel(c.effort)}
                              </span>
                              <span className="mt-0.5 block text-muted-foreground">
                                {en ? (enScenario?.notes[c.modelId] ?? c.note) : c.note}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            <ExplainToggle
              simple={enScenario?.explainSimple ?? scenario.explainSimple}
              tech={enScenario?.explainTech ?? scenario.explainTech}
            />
            <Button
              variant="unstyled"
              type="button"
              onClick={next}
              className="w-full rounded-lg bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              {idx + 1 >= SCENARIOS.length ? t("quiz.seeScore") : t("quiz.next")}
            </Button>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
