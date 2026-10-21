import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ModelCard } from "../components/ModelCard";
import { ProviderLogo } from "../components/ProviderLogo";
import { EFFORTS, GLOSSARY, MODELS, PROVIDERS, modelsOfProvider } from "../data/models";
import { EN_EFFORTS, EN_GLOSSARY, EN_PROVIDERS } from "../data/en";
import { useLang } from "../lib/i18n";
import { PROVIDER_PRICING_URLS } from "../data/sources";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Guide des providers et modèles d'IA | model.quest" },
      {
        name: "description",
        content:
          "Fiches de référence : OpenAI, Google, Anthropic, DeepSeek, Mistral, Meta, Alibaba, Cohere. Forces, faiblesses, prix indicatifs, contexte, capacités et conformité.",
      },
      { property: "og:title", content: "Guide des modèles d'IA : model.quest" },
      {
        property: "og:description",
        content:
          "Toutes les fiches pour choisir provider, modèle et effort en connaissance de cause.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Guide,
});

function Guide() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const glossary = en ? EN_GLOSSARY : GLOSSARY;
  const efforts = Object.keys(EFFORTS) as (keyof typeof EFFORTS)[];

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <p className="font-mono text-sm text-primary">$ cat /guide/*</p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">{t("guide.title")}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("guide.sub")}</p>
        <p className="mt-4 border-l-2 border-primary bg-secondary px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          {t("catalogue.notice")}
        </p>
        <p className="mt-3 max-w-2xl font-mono text-[11px] leading-relaxed text-muted-foreground/80">
          {t("cost.legend")}
        </p>

        {/* Bandeau animé de sélection des providers */}
        <div className="mt-8">
          <p className="mb-2 font-mono text-xs text-muted-foreground">{t("guide.pickProvider")}</p>
          <div className="scan-sweep space-y-2 overflow-hidden rounded-xl border border-border bg-terminal py-3">
            {[
              { row: PROVIDERS.filter((_, i) => i % 2 === 0), anim: "animate-marquee-left" },
              { row: PROVIDERS.filter((_, i) => i % 2 === 1), anim: "animate-marquee-right" },
            ].map(({ row, anim }) => (
              <div key={anim} className={`${anim} flex w-max gap-3`}>
                {[...row, ...row, ...row, ...row].map((p, i) => (
                  <a
                    key={`${p.id}-${i}`}
                    href={`#provider-${p.id}`}
                    className="card-hover-neon flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-2.5"
                  >
                    <ProviderLogo provider={p} size="sm" />
                    <span className="whitespace-nowrap font-mono text-sm font-semibold text-foreground">
                      {p.name}
                    </span>
                    <span className={`font-mono text-[10px] uppercase tracking-wider ${p.hue}`}>
                      [{p.badge}]
                    </span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-10">
          {PROVIDERS.map((p) => {
            const models = modelsOfProvider(p.id);
            const enP = en ? EN_PROVIDERS[p.id] : undefined;
            return (
              <section key={p.id} id={`provider-${p.id}`} className="animate-rise scroll-mt-20">
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <ProviderLogo provider={p} size="lg" />
                    <span className={`font-mono text-sm font-bold ${p.hue}`}>[{p.badge}]</span>
                    <h2 className="text-2xl font-bold text-foreground">{p.name}</h2>
                    <span className="text-sm text-muted-foreground">
                      {enP?.tagline ?? p.tagline}
                    </span>
                  </div>
                  <a
                    href={PROVIDER_PRICING_URLS[p.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex font-mono text-xs text-primary underline underline-offset-4"
                  >
                    {t("catalogue.pricing")} : {p.name} ↗
                  </a>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div>
                      <h3 className="font-mono text-xs text-primary">{t("guide.strengths")}</h3>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {(enP?.strengths ?? p.strengths).map((s) => (
                          <li key={s}>+ {s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-mono text-xs text-destructive">
                        {t("guide.weaknesses")}
                      </h3>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {(enP?.weaknesses ?? p.weaknesses).map((w) => (
                          <li key={w}>- {w}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-mono text-xs text-cyan-glow">{t("guide.compliance")}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {enP?.compliance ?? p.compliance}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {models.map((m) => (
                      <ModelCard key={m.id} model={m} provider={p} />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <p className="mt-10 text-center font-mono text-xs text-muted-foreground">
          {MODELS.length} {t("guide.models")}
        </p>

        {/* Concepts et effort : en dernier, une fois les fiches vues */}
        <section className="mt-10 rounded-xl border border-border bg-terminal p-5 scanlines">
          <h2 className="font-mono text-sm font-semibold text-primary">{t("guide.concepts")}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(glossary).map((def) => {
              const term = def.slice(0, def.indexOf("(")).trim();
              const definition = def.slice(def.indexOf("(") + 1, def.lastIndexOf(")"));
              return (
                <div
                  key={term}
                  className="card-hover-neon rounded-lg border border-border bg-card p-3"
                >
                  <p className="font-mono text-sm font-semibold text-foreground">{term}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{definition}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border bg-terminal p-5 scanlines">
          <h2 className="font-mono text-sm font-semibold text-primary">{t("guide.effort")}</h2>
          <p className="mt-2 text-xs text-muted-foreground">{t("guide.effortSub")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {efforts.map((k) => {
              const e = EFFORTS[k];
              const label = en ? EN_EFFORTS[k].label : e.label;
              const simple = en ? EN_EFFORTS[k].simple : e.simple;
              return (
                <div
                  key={k}
                  className="card-hover-neon rounded-lg border border-border bg-card p-3"
                >
                  <p className="font-mono text-sm font-semibold text-foreground">{label}</p>
                  <p className="mt-1 font-mono text-[11px] text-primary">
                    ×{e.costMultiplier} {t("effort.output")}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{simple}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-4 rounded-lg border border-cyan-glow/30 bg-card p-3 text-xs leading-relaxed text-muted-foreground">
            <span className="font-mono text-cyan-glow">{t("guide.note")}</span>{" "}
            {t("guide.effortNote")}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
