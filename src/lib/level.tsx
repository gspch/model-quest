// Niveau d'affichage : Débutant masque les détails techniques, Expert les dévoile.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Level = "beginner" | "expert";

const KEY = "modelquest:level:v1";

interface LevelCtx {
  level: Level;
  expert: boolean;
  setLevel: (l: Level) => void;
}

const Ctx = createContext<LevelCtx>({ level: "beginner", expert: false, setLevel: () => {} });

export function LevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevelState] = useState<Level>("beginner");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "beginner" || saved === "expert") setLevelState(saved);
    } catch {
      // stockage indisponible
    }
  }, []);

  function setLevel(l: Level) {
    setLevelState(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      // ignore
    }
  }

  return (
    <Ctx.Provider value={{ level, expert: level === "expert", setLevel }}>{children}</Ctx.Provider>
  );
}

export function useLevel() {
  return useContext(Ctx);
}

// Affiche son contenu uniquement en mode Expert.
export function Expert({ children }: { children: ReactNode }) {
  return useLevel().expert ? <>{children}</> : null;
}
