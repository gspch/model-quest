// Ambiances d'éclairage de l'interface, persistées en localStorage.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeId = "matrix" | "cyberpunk" | "amber" | "stealth";

export const THEMES: { id: ThemeId; fr: string; en: string; swatch: string }[] = [
  {
    id: "matrix",
    fr: "Matrix (vert néon)",
    en: "Matrix (neon green)",
    swatch: "oklch(0.87 0.22 145)",
  },
  {
    id: "cyberpunk",
    fr: "Cyberpunk (cyan/violet)",
    en: "Cyberpunk (cyan/violet)",
    swatch: "oklch(0.85 0.15 195)",
  },
  { id: "amber", fr: "Ambre CRT (rétro)", en: "Amber CRT (retro)", swatch: "oklch(0.82 0.16 85)" },
  {
    id: "stealth",
    fr: "OLED furtif (platine)",
    en: "OLED stealth (platinum)",
    swatch: "oklch(0.85 0.01 260)",
  },
];

const KEY = "modelquest:theme:v1";

interface ThemeCtx {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}

const Ctx = createContext<ThemeCtx>({ theme: "matrix", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("matrix");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY) as ThemeId | null;
      if (saved && THEMES.some((t) => t.id === saved)) setThemeState(saved);
    } catch {
      // stockage indisponible
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset["theme"] = theme;
  }, [theme]);

  function setTheme(t: ThemeId) {
    setThemeState(t);
    try {
      window.localStorage.setItem(KEY, t);
    } catch {
      // ignore
    }
  }

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  return useContext(Ctx);
}
