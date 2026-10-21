import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "./Logo";
import { useLang } from "../lib/i18n";
import { THEMES, useTheme } from "../lib/theme";

export function Nav() {
  const { lang, setLang, t } = useLang();
  const { theme, setTheme } = useTheme();
  const [themeOpen, setThemeOpen] = useState(false);

  const LINKS = [
    { to: "/", label: t("nav.home") },
    { to: "/quiz", label: t("nav.quiz") },
    { to: "/simulateur", label: t("nav.sim") },
    { to: "/parcours", label: t("nav.journey") },
    { to: "/guide", label: t("nav.guide") },
    { to: "/scores", label: t("nav.scores") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center flex-wrap justify-between gap-2 px-4 py-3">
        <Link to="/" aria-label="model.quest">
          <Logo />
        </Link>
        <nav className="order-3 flex w-full flex-wrap items-center justify-center gap-1 sm:order-none sm:w-auto">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "bg-secondary text-primary" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="rounded-md px-2 py-1.5 font-mono text-xs transition-colors sm:px-2.5 sm:text-sm"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          {/* Sélecteur de langue */}
          <div
            className="flex rounded-md border border-border"
            role="group"
            aria-label={t("lang.label")}
          >
            {(["fr", "en"] as const).map((l) => (
              <Button
                variant="unstyled"
                type="button"
                key={l}
                aria-label={l === "fr" ? "Français" : "English"}
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 font-mono text-[11px] uppercase transition-colors ${
                  lang === l
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </Button>
            ))}
          </div>
          {/* Sélecteur d'ambiance */}
          <div className="relative">
            <Button
              variant="unstyled"
              type="button"
              onClick={() => setThemeOpen((o) => !o)}
              aria-label={t("theme.label")}
              aria-expanded={themeOpen}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border transition-colors hover:border-primary/60"
            >
              <span
                className="h-3.5 w-3.5 rounded-full"
                style={{ background: THEMES.find((x) => x.id === theme)?.swatch }}
              />
            </Button>
            {themeOpen && (
              <div className="absolute right-0 top-9 z-50 w-52 rounded-lg border border-border bg-popover p-1.5 shadow-xl">
                {THEMES.map((th) => (
                  <Button
                    variant="unstyled"
                    type="button"
                    key={th.id}
                    aria-label={lang === "en" ? th.en : th.fr}
                    aria-pressed={theme === th.id}
                    onClick={() => {
                      setTheme(th.id);
                      setThemeOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left font-mono text-xs transition-colors ${
                      theme === th.id
                        ? "bg-secondary text-primary"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    }`}
                  >
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ background: th.swatch }}
                    />
                    {lang === "en" ? th.en : th.fr}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
