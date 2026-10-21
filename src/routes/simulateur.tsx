import { Button } from "../components/ui/button";
import { PromoBadge } from "../components/PromoBadge";
import { currentPrice } from "../data/models";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Gauge } from "../components/Gauge";
import { ExplainToggle } from "../components/ExplainToggle";
import { useLang } from "../lib/i18n";
import { EN_EFFORTS, EN_MODELS, EN_PROVIDERS } from "../data/en";
import {
  EFFORTS,
  MODELS,
  PROVIDERS,
  effectiveLatency,
  effectiveQuality,
  estimateCost,
  modelsOfProvider,
  profileOf,
  type Effort,
  type Modality,
} from "../data/models";

export const Route = createFileRoute("/simulateur")({
  head: () => ({
    meta: [
      { title: "Simulateur : Coût, vitesse, qualité | model.quest" },
      {
        name: "description",
        content:
          "Configurez provider, modèle et effort de raisonnement : visualisez en direct l'impact sur le coût, la latence, la qualité et la conformité.",
      },
      { property: "og:title", content: "Simulateur de choix de modèle d'IA" },
      {
        property: "og:description",
        content: "Voyez ce que chaque choix change : coût, latence, qualité, contexte, conformité.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Simulateur,
});

function Simulateur() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const [providerId, setProviderId] = useState("openai");
  const [modelId, setModelId] = useState("gpt-6-astra");
  const [effort, setEffort] = useState<Effort>("none");
  const [volume, setVolume] = useState(10); // millions de tokens / mois

  const [inputShare, setInputShare] = useState(75);

  const provider = PROVIDERS.find((p) => p.id === providerId) ?? PROVIDERS[0];
  const models = modelsOfProvider(providerId);
  const model = MODELS.find((m) => m.id === modelId) ?? models[0] ?? MODELS[0];
  const validEffort: Effort = model?.efforts.includes(effort)
    ? effort
    : (model?.efforts[0] ?? "none");

  const cost = model ? estimateCost(model, validEffort, volume, inputShare / 100) : 0;
  const latency = model ? effectiveLatency(model, validEffort) : 0;
  const quality = model ? effectiveQuality(model, validEffort) : 0;

  const comparison = useMemo(
    () =>
      MODELS.map((m) => ({
        m,
        cost: estimateCost(
          m,
          m.efforts.includes(validEffort) ? validEffort : (m.efforts[0] ?? "none"),
          volume,
          inputShare / 100,
        ),
      })).sort((a, b) => a.cost - b.cost),
    [validEffort, volume, inputShare],
  );
  if (!model || !provider) return null;
  const rank = comparison.findIndex((c) => c.m.id === model.id) + 1;

  const effortLabel = (e: Effort) => (en ? EN_EFFORTS[e].label : EFFORTS[e].label);
  const effortSimple = (e: Effort) => (en ? EN_EFFORTS[e].simple : EFFORTS[e].simple);
  const caps = en ? (EN_MODELS[model.id]?.capabilities ?? model.capabilities) : model.capabilities;
  const compliance = en
    ? (EN_PROVIDERS[provider.id]?.compliance ?? provider.compliance)
    : provider.compliance;
  const profile = profileOf(model.id);

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <p className="font-mono text-sm text-primary">$ simulate --interactive</p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">{t("sim.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("sim.sub")}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Configuration */}
          <div className="space-y-5">
            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-mono text-xs text-muted-foreground">{t("sim.provider")}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {PROVIDERS.map((p) => (
                  <Button
                    variant="unstyled"
                    type="button"
                    key={p.id}
                    onClick={() => {
                      setProviderId(p.id);
                      const firstModel = modelsOfProvider(p.id)[0];
                      if (firstModel) {
                        setModelId(firstModel.id);
                        setEffort(firstModel.efforts[0] ?? "none");
                      }
                    }}
                    className={`rounded-lg border px-3 py-2 font-mono text-xs transition-all ${
                      p.id === providerId
                        ? "border-primary bg-secondary text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    [{p.badge}] {p.name}
                  </Button>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-mono text-xs text-muted-foreground">{t("sim.model")}</h2>
              <div className="mt-3 space-y-2">
                {models.map((m) => (
                  <Button
                    variant="unstyled"
                    type="button"
                    key={m.id}
                    onClick={() => {
                      setModelId(m.id);
                      setEffort(m.efforts[0] ?? "none");
                    }}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                      m.id === model.id
                        ? "border-primary bg-secondary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {m.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        ${currentPrice(m).priceIn}/${currentPrice(m).priceOut} /Mtok
                      </span>
                    </div>
                    <PromoBadge model={m} />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {en ? (EN_MODELS[m.id]?.bestFor ?? m.bestFor) : m.bestFor}
                    </p>
                  </Button>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-mono text-xs text-muted-foreground">{t("sim.effort")}</h2>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {(Object.keys(EFFORTS) as Effort[]).map((e) => {
                  const supported = model.efforts.includes(e);
                  return (
                    <Button
                      variant="unstyled"
                      type="button"
                      key={e}
                      disabled={!supported}
                      onClick={() => setEffort(e)}
                      className={`rounded-lg border px-2 py-2 font-mono text-xs transition-all ${
                        !supported
                          ? "cursor-not-allowed border-border/40 text-muted-foreground/40"
                          : e === validEffort
                            ? "border-primary bg-secondary text-primary"
                            : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {effortLabel(e)}
                      <span className="block text-[10px]">
                        ×{EFFORTS[e].costMultiplier} {t("effort.output")}
                      </span>
                    </Button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{effortSimple(validEffort)}</p>
            </section>

            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <label htmlFor="monthly-volume" className="font-mono text-xs text-muted-foreground">
                  {t("sim.volume")}
                </label>
                <span className="font-mono text-sm text-primary">{volume}M tokens</span>
              </div>
              <input
                id="monthly-volume"
                type="range"
                min={1}
                max={500}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--neon)]"
              />
              <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>1M</span>
                <span>500M</span>
              </div>
            </section>
            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="input-share" className="text-sm text-foreground">
                  {t("sim.inputShare")}
                </label>
                <output htmlFor="input-share" className="font-mono text-sm text-primary">
                  {inputShare}%
                </output>
              </div>
              <input
                id="input-share"
                type="range"
                min={10}
                max={95}
                value={inputShare}
                onChange={(e) => setInputShare(Number(e.target.value))}
                aria-describedby="input-share-help"
                className="mt-3 w-full accent-primary"
              />
              <p id="input-share-help" className="mt-2 text-xs text-muted-foreground">
                {t("sim.inputHelp")}
              </p>
            </section>
          </div>

          {/* Résultats */}
          <div className="space-y-5">
            <section
              key={`${model.id}-${validEffort}-${volume}`}
              className="card-glow rounded-xl border border-primary/40 bg-card p-5"
            >
              <h2 className="font-mono text-xs text-muted-foreground">{t("sim.impact")}</h2>
              <div className="mt-4 space-y-4">
                <Gauge
                  label={t("sim.cost")}
                  value={Math.min(5, Math.log10(cost + 1) * 2)}
                  hint={`≈ $${cost.toFixed(0)}/${t("unit.month")}`}
                />
                <Gauge
                  label={t("sim.latency")}
                  value={latency}
                  invert
                  hint={
                    latency <= 2
                      ? t("sim.latencyFast")
                      : latency <= 3.5
                        ? t("sim.latencyMid")
                        : t("sim.latencySlow")
                  }
                />
                <Gauge label={t("sim.quality")} value={quality} hint={`${quality.toFixed(1)}/5`} />
                <Gauge
                  label={t("sim.context")}
                  value={Math.min(5, Math.log10(model.contextK) * 2.2)}
                  hint={`${model.contextK}K tokens`}
                />
              </div>
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                {t("sim.costRank")} : <span className="text-primary">#{rank}</span> /{" "}
                {MODELS.length} {t("sim.ofModels")}
              </p>
              <p className="mt-2 font-mono text-[10px] leading-relaxed text-muted-foreground/70">
                {t("cost.legend")} {t("sim.costFormula")}
              </p>
            </section>

            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-mono text-xs text-muted-foreground">{t("sim.capabilities")}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {caps.map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-primary/40 bg-terminal px-2.5 py-1 font-mono text-xs text-primary"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <h2 className="mt-5 font-mono text-xs text-muted-foreground">
                {t("sim.compliance")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{compliance}</p>
            </section>

            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-mono text-xs text-muted-foreground">{t("sim.profile")}</h2>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {t("sim.release")} {profile.releaseTag}
                </span>
              </div>
              <div className="mt-3 space-y-2 font-mono text-xs">
                <p className="text-muted-foreground">
                  {t("sim.modalitiesIn")} :{" "}
                  {profile.modalitiesIn.map((m: Modality) => (
                    <span
                      key={m}
                      className="mr-1.5 rounded border border-primary/40 bg-terminal px-1.5 py-0.5 text-primary"
                    >
                      {t(`mod.${m}` as Parameters<typeof t>[0])}
                    </span>
                  ))}
                </p>
                <p className="text-muted-foreground">
                  {t("sim.modalitiesOut")} :{" "}
                  {profile.modalitiesOut.map((m: Modality) => (
                    <span
                      key={m}
                      className="mr-1.5 rounded border border-cyan-glow/40 bg-terminal px-1.5 py-0.5 text-cyan-glow"
                    >
                      {t(`mod.${m}` as Parameters<typeof t>[0])}
                    </span>
                  ))}
                </p>
                <p className={profile.openWeights ? "text-primary" : "text-muted-foreground"}>
                  {profile.openWeights ? "◆" : "◇"}{" "}
                  {profile.openWeights ? t("sim.openWeights") : t("sim.closedWeights")}
                </p>
                <p className="text-muted-foreground">
                  {t("model.params")} :{" "}
                  <span className="text-foreground">
                    {profile.paramsB === null
                      ? t("params.undisclosed")
                      : en
                        ? `≈${profile.paramsB}B`
                        : `≈${profile.paramsB} Md`}
                  </span>
                </p>
              </div>
              <div className="mt-4 space-y-4">
                <Gauge
                  label={t("sim.toolUse")}
                  value={profile.toolUse}
                  hint={`${profile.toolUse}/5`}
                />
                <Gauge
                  label={t("sim.coding")}
                  value={profile.coding}
                  hint={`${profile.coding}/5`}
                />
              </div>
            </section>

            <ExplainToggle
              simple={en ? (EN_MODELS[model.id]?.simpleNote ?? model.simpleNote) : model.simpleNote}
              tech={en ? (EN_MODELS[model.id]?.techNote ?? model.techNote) : model.techNote}
            />

            <section className="rounded-xl border border-border bg-terminal p-5 scanlines">
              <h2 className="font-mono text-xs text-primary">$ diff --insight</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {validEffort === "none" || validEffort === "low"
                  ? `${t("sim.withEffort")} ${effortLabel(validEffort).toLowerCase()}, ${t("sim.insightLow")}`
                  : `${t("sim.theEffort")} ${effortLabel(validEffort).toLowerCase()} (×${EFFORTS[validEffort].costMultiplier}) ${t("sim.insightHigh")}`}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
