import { Button } from "./ui/button";
import { PromoBadge } from "./PromoBadge";
import { currentPrice } from "../data/models";
import type { ModelInfo, ProviderInfo } from "../data/models";
import { TIER_LABELS, profileOf } from "../data/models";
import { EN_MODELS, EN_TIER_LABELS } from "../data/en";
import { useLang } from "../lib/i18n";
import { ProviderLogo } from "./ProviderLogo";

export function ModelCard({
  model,
  provider,
  selected,
  onSelect,
}: {
  model: ModelInfo;
  provider?: ProviderInfo;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const { lang, t } = useLang();
  const en = lang === "en";
  const tierLabels = en ? EN_TIER_LABELS : TIER_LABELS;
  const caps = en ? (EN_MODELS[model.id]?.capabilities ?? model.capabilities) : model.capabilities;
  const profile = profileOf(model.id);
  const params =
    profile.paramsB === null
      ? t("params.undisclosed")
      : en
        ? `≈${profile.paramsB}B`
        : `≈${profile.paramsB} Md`;
  return (
    <Button
      variant="unstyled"
      type="button"
      onClick={onSelect}
      className={`card-hover-neon w-full rounded-xl border p-4 text-left ${
        selected
          ? "card-glow border-primary bg-card"
          : "border-border bg-card hover:border-primary/50 hover:bg-secondary"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2">
          {provider ? <ProviderLogo provider={provider} size="sm" /> : null}
          <span className="font-mono text-sm font-semibold text-foreground">{model.name}</span>
        </span>
      </div>
      <p className="mt-1 font-mono text-[11px] text-muted-foreground">{tierLabels[model.tier]}</p>
      <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[11px]">
        <div>
          <div className="text-muted-foreground">{t("model.price")}</div>
          <div className="text-foreground">
            ${currentPrice(model).priceIn}/{currentPrice(model).priceOut}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground">{t("model.context")}</div>
          <div className="text-foreground">{model.contextK}K</div>
        </div>
        <div>
          <div className="text-muted-foreground">{t("model.quality")}</div>
          <div className="text-foreground">{"★".repeat(model.quality)}</div>
        </div>
      </div>
      <PromoBadge model={model} />
      <p className="mt-2 font-mono text-[10px] text-muted-foreground">
        {t("model.params")} : <span className="text-foreground">{params}</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        {caps.map((c) => (
          <span
            key={c}
            className="rounded border border-border bg-terminal px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {c}
          </span>
        ))}
      </div>
    </Button>
  );
}
