export const DATA_VERIFIED_ON = "2026-10-21";
// Public provider pricing references; the catalogue remains indicative.
export const PROVIDER_PRICING_URLS: Record<string, string> = {
  openai: "https://openai.com/api/pricing",
  google: "https://ai.google.dev/gemini-api/docs/pricing",
  anthropic: "https://platform.claude.com/docs/en/about-claude/pricing",
  deepseek: "https://api-docs.deepseek.com/quick_start/pricing",
  mistral: "https://mistral.ai/pricing",
  meta: "https://llama.developer.meta.com",
  alibaba: "https://www.alibabacloud.com/help/en/model-studio",
  cohere: "https://cohere.com/pricing",
};
export function formatDataDate(date: string, lang: "fr" | "en") {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
