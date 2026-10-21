import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../lib/i18n";
import { useTheme } from "../lib/theme";

// Badge de score : rendu canvas téléchargeable en PNG + partage LinkedIn / X.
// Les intents de partage ne transportent pas d'image : on copie le texte et on joint le PNG.
export function ShareBadge({ score, max, title }: { score: number; max: number; title: string }) {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = 800;
    const H = 420;
    canvas.width = W;
    canvas.height = H;

    const styles = getComputedStyle(document.documentElement);
    const neon = styles.getPropertyValue("--neon").trim() || "#7CFC00";
    const cyan = styles.getPropertyValue("--cyan-glow").trim() || neon;
    const bg = styles.getPropertyValue("--terminal").trim() || "#0b0f14";
    const fg = styles.getPropertyValue("--foreground").trim() || "#e6f2e6";

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = neon;
    ctx.lineWidth = 3;
    ctx.strokeRect(14, 14, W - 28, H - 28);

    // Logo model.quest : puce neuronale + curseur clignotant (version canvas)
    const lx = 44;
    const ly = 40;
    ctx.strokeStyle = neon;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(lx, ly, 40, 40, 9);
    ctx.stroke();
    ctx.fillStyle = neon;
    ctx.beginPath();
    ctx.arc(lx + 13, ly + 15, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = cyan;
    ctx.beginPath();
    ctx.arc(lx + 27, ly + 15, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = neon;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(lx + 20, ly + 27, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(lx + 13, ly + 15);
    ctx.lineTo(lx + 27, ly + 15);
    ctx.moveTo(lx + 13, ly + 15);
    ctx.lineTo(lx + 20, ly + 27);
    ctx.moveTo(lx + 27, ly + 15);
    ctx.lineTo(lx + 20, ly + 27);
    ctx.stroke();
    ctx.globalAlpha = 1;
    // curseur clignotant
    ctx.fillRect(lx + 30, ly + 31, 6, 3.5);

    ctx.fillStyle = neon;
    ctx.font = "700 30px 'JetBrains Mono', monospace";
    ctx.fillText("model.quest", lx + 54, ly + 30);
    ctx.fillStyle = fg;
    ctx.font = "400 20px 'JetBrains Mono', monospace";
    ctx.fillText(t("share.canvasCommand"), 44, 122);

    ctx.font = "700 96px 'JetBrains Mono', monospace";
    ctx.fillStyle = neon;
    ctx.fillText(`${score}/${max}`, 44, 240);

    ctx.font = "600 34px 'Space Grotesk', sans-serif";
    ctx.fillStyle = fg;
    ctx.fillText(title, 44, 306);

    ctx.font = "400 18px 'JetBrains Mono', monospace";
    ctx.fillStyle = fg;
    ctx.globalAlpha = 0.7;
    ctx.fillText(t("share.canvasSubtitle"), 44, 362);
    ctx.globalAlpha = 1;
  }

  // Dessine le badge dès l'affichage et à chaque changement de langue/thème
  useEffect(() => {
    const id = window.setTimeout(draw, 150); // laisse les polices et variables CSS se charger
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, max, title, lang, theme]);

  function download() {
    draw();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "modelquest-badge.png";
    a.click();
  }

  const shareText =
    t("quiz.shareText").replace("{score}", String(score)).replace("{max}", String(max)) +
    ` · ${title}`;

  async function copyText() {
    try {
      await navigator.clipboard.writeText(`${shareText} ${window.location.origin}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // presse-papiers indisponible : l'utilisateur peut sélectionner le texte manuellement
    }
  }

  const text = encodeURIComponent(shareText);
  const url = encodeURIComponent(typeof window === "undefined" ? "" : window.location.origin);
  const xHref = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  const liHref = `https://www.linkedin.com/feed/`;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-mono text-xs text-muted-foreground">
        {t("quiz.shareBadge").toUpperCase()}
      </h3>
      <canvas
        ref={canvasRef}
        className="mt-3 w-full rounded-lg border border-border/60"
        style={{ aspectRatio: "800/420" }}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          variant="unstyled"
          type="button"
          onClick={download}
          className="rounded-lg bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground transition-transform hover:scale-105"
        >
          {t("share.download")}
        </Button>
        <Button
          variant="unstyled"
          type="button"
          onClick={copyText}
          className="rounded-lg border border-primary/50 bg-terminal px-4 py-2 font-mono text-xs text-primary transition-colors hover:bg-secondary"
        >
          {copied ? t("quiz.copied") : t("quiz.copyText")}
        </Button>
        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border bg-terminal px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-primary/60"
        >
          𝕏 {t("share.x")}
        </a>
        <a
          href={liHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border bg-terminal px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-primary/60"
        >
          in {t("share.linkedin")}
        </a>
      </div>
      <p className="mt-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
        {t("quiz.shareTip")}
      </p>
    </div>
  );
}
