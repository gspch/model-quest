import { Link } from "@tanstack/react-router";
import { useLang } from "../lib/i18n";
import { dataAgeDays } from "../data/sources";

// Pied de page : lexique du terminal pour novices + commandes cliquables expliquées.
export function Footer() {
  const { t } = useLang();

  const commands = [
    { cmd: "quiz --start", to: "/quiz", explain: t("footer.cmd.quiz") },
    { cmd: "simulate --interactive", to: "/simulateur", explain: t("footer.cmd.sim") },
    { cmd: "journey --start", to: "/parcours", explain: t("footer.cmd.journey") },
    { cmd: "cat /guide/*", to: "/guide", explain: t("footer.cmd.guide") },
    { cmd: "leaderboard --global", to: "/scores", explain: t("footer.cmd.scores") },
  ] as const;

  return (
    <footer className="border-t border-border/60 bg-terminal/60">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <p className="font-mono text-xs font-semibold text-primary">{t("footer.title")}</p>
        <p className="mt-2 max-w-3xl text-[11px] leading-relaxed text-muted-foreground">
          {t("footer.legend")}
        </p>
        <nav aria-label={t("footer.commands")} className="mt-4 space-y-2.5">
          {commands.map((c) => (
            <div key={c.cmd} className="flex flex-wrap items-baseline gap-x-3">
              <Link
                to={c.to}
                className="group flex w-fit items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="text-primary">$</span>
                <span className="group-hover:underline group-hover:underline-offset-4">
                  {c.cmd}
                </span>
                <span className="inline-block h-3.5 w-1.5 animate-pulse bg-primary/70 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <span className="text-[11px] text-muted-foreground/80">: {c.explain}</span>
            </div>
          ))}
          <div className="flex flex-wrap items-baseline gap-x-3">
            <a
              href="https://github.com/gspch/model-quest"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-fit items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <span className="text-primary">$</span>
              <span className="group-hover:underline group-hover:underline-offset-4">
                git clone gspch/model-quest
              </span>
            </a>
            <span className="text-[11px] text-muted-foreground/80">: {t("footer.cmd.source")}</span>
          </div>
        </nav>
        <p className="mt-4 border-t border-border/40 pt-3 text-center font-mono text-[10px] text-muted-foreground/70">
          model.quest · {t("catalogue.notice")}
        </p>
        {dataAgeDays() > 90 && (
          <p role="status" className="mt-2 text-center font-mono text-[10px] text-amber-glow">
            {t("footer.stale")}
          </p>
        )}
        <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground/70">
          <Link to="/mentions-legales" className="underline underline-offset-4 hover:text-primary">
            {t("footer.legal")}
          </Link>{" "}
          · MIT ·{" "}
          <a
            href="https://github.com/gspch/model-quest"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
