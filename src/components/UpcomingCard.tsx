import { EN_UPCOMING } from "../data/en";
import type { ProviderInfo, UpcomingModel } from "../data/models";
import { formatDataDate } from "../data/sources";
import { useLang } from "../lib/i18n";
import { ProviderLogo } from "./ProviderLogo";

export function UpcomingCard({
  model,
  provider,
}: {
  model: UpcomingModel;
  provider: ProviderInfo;
}) {
  const { lang, t } = useLang();
  const note = lang === "en" ? (EN_UPCOMING[model.id]?.note ?? model.note) : model.note;
  return (
    <div className="rounded-xl border border-dashed border-amber-glow/60 bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2">
          <ProviderLogo provider={provider} size="sm" />
          <span className="font-mono text-sm font-semibold text-foreground">{model.name}</span>
        </span>
        <span className="rounded border border-amber-glow/60 px-1.5 py-px font-mono text-[10px] text-amber-glow">
          {t("upcoming.badge")}
        </span>
      </div>
      <p className="mt-2 font-mono text-[11px] text-amber-glow">
        {t("upcoming.weights").replace("{date}", formatDataDate(model.weightsDate, lang))}
      </p>
      <p className="mt-1 font-mono text-[11px] text-muted-foreground">
        {t("upcoming.specs")
          .replace("{total}", String(model.paramsTotalB))
          .replace("{active}", String(model.paramsActiveB))
          .replace("{ctx}", String(model.contextK / 1000))}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{note}</p>
      <p className="mt-2 font-mono text-[10px] text-muted-foreground/70">
        {t("upcoming.excluded")}
      </p>
    </div>
  );
}
