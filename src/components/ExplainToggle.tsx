import { Button } from "./ui/button";
import { useState } from "react";
import { useLang } from "../lib/i18n";
import { useLevel } from "../lib/level";

export function ExplainToggle({ simple, tech }: { simple: string; tech: string }) {
  const { t } = useLang();
  const [mode, setMode] = useState<"simple" | "tech">("simple");
  const { expert } = useLevel();
  if (!expert) {
    return (
      <div className="rounded-lg border border-border bg-terminal p-4">
        <p className="text-sm leading-relaxed text-foreground">{simple}</p>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-border bg-terminal p-4">
      <div className="mb-2 flex items-center gap-2">
        <Button
          variant="unstyled"
          type="button"
          onClick={() => setMode("simple")}
          className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
            mode === "simple"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("explain.simple")}
        </Button>
        <Button
          variant="unstyled"
          type="button"
          onClick={() => setMode("tech")}
          className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
            mode === "tech"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("explain.tech")}
        </Button>
      </div>
      <p className="text-sm leading-relaxed text-foreground">{mode === "simple" ? simple : tech}</p>
    </div>
  );
}
