import { useState } from "react";
import type { ProviderInfo } from "../data/models";

// Favicons officiels des providers (servis par le service de favicons Google).
const DOMAINS: Record<string, string> = {
  openai: "openai.com",
  google: "gemini.google.com",
  anthropic: "anthropic.com",
  deepseek: "deepseek.com",
  mistral: "mistral.ai",
  meta: "meta.com",
  alibaba: "qwenlm.ai",
  cohere: "cohere.com",
};

export function ProviderLogo({
  provider,
  size = "md",
}: {
  provider: ProviderInfo;
  size?: "sm" | "md" | "lg";
}) {
  const dims = size === "lg" ? "h-12 w-12 p-2" : size === "sm" ? "h-6 w-6 p-0.5" : "h-9 w-9 p-1.5";
  const domain = DOMAINS[provider.id];
  const [failed, setFailed] = useState(false);
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-foreground/90 ${dims}`}
    >
      {domain && !failed ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt={`${provider.name} logo`}
          loading="lazy"
          className="h-full w-full rounded object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={`font-mono font-bold ${provider.hue}`}>{provider.glyph}</span>
      )}
    </span>
  );
}
