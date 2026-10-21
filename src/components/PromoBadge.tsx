import { type ModelInfo } from "../data/models";
import { formatDataDate } from "../data/sources";
import { useLang } from "../lib/i18n";

export function PromoBadge({ model }: { model: ModelInfo }) {
  const { lang, t } = useLang();
  if (!model.promo || Date.now() >= Date.parse(`${model.promo.until}T00:00:00Z`) + 86400000)
    return null;
  return (
    <span className="mt-2 block rounded border border-amber-glow/50 bg-secondary px-2 py-1 font-mono text-[10px] text-amber-glow">
      {t("promo.badge")
        .replace("{date}", formatDataDate(model.promo.until, lang))
        .replace("{in}", String(model.promo.priceInAfter))
        .replace("{out}", String(model.promo.priceOutAfter))}
    </span>
  );
}
