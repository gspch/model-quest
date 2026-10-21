import { describe, expect, it } from "vitest";
import { MODELS, MODEL_PROFILES, PROVIDERS, SCENARIOS } from "../data/models";
import { EN_LEVELS, EN_MODELS, EN_PROVIDERS, EN_SCENARIOS } from "../data/en";
import { PROVIDER_PRICING_URLS } from "../data/sources";

describe("October 2026 catalogue", () => {
  it("keeps every supplied model and an English entry and profile per ID", () => {
    const ids = MODELS.map((model) => model.id).sort();
    expect(ids).toHaveLength(23); // The supplied list contains 23, not 22.
    expect(new Set(ids).size).toBe(ids.length);
    expect(Object.keys(EN_MODELS).sort()).toEqual(ids);
    expect(Object.keys(MODEL_PROFILES).sort()).toEqual(ids);
    for (const model of MODELS) {
      expect(model.efforts.length).toBeGreaterThan(0);
      expect(EN_MODELS[model.id]?.capabilities.length).toBe(model.capabilities.length);
      expect(MODEL_PROFILES[model.id]?.releaseTag).toMatch(/^\d{4}(-\d{2})?$/);
      expect(MODEL_PROFILES[model.id]?.modalitiesOut).toEqual(["text"]);
      if (["openai", "anthropic"].includes(model.providerId)) {
        expect(MODEL_PROFILES[model.id]?.modalitiesIn).toEqual(["text", "image"]);
      }
    }
  });

  it("has eight scenarios with supported efforts and translated explanations", () => {
    expect(SCENARIOS).toHaveLength(8);
    expect(Object.keys(EN_SCENARIOS).sort()).toEqual(
      SCENARIOS.map((scenario) => scenario.id).sort(),
    );
    for (const scenario of SCENARIOS) {
      expect(
        scenario.choices.filter((choice) => choice.verdict === "ideal").length,
      ).toBeGreaterThanOrEqual(1);
      expect(
        scenario.choices.filter((choice) => choice.verdict === "valid").length,
      ).toBeGreaterThanOrEqual(2);
      expect(
        scenario.choices.filter((choice) => choice.verdict === "risky").length,
      ).toBeGreaterThanOrEqual(1);
      expect(new Set(scenario.choices.map((choice) => choice.modelId)).size).toBe(
        scenario.choices.length,
      );
      expect(Object.keys(EN_SCENARIOS[scenario.id]?.notes ?? {}).sort()).toEqual(
        scenario.choices.map((choice) => choice.modelId).sort(),
      );
      for (const choice of scenario.choices) {
        expect(MODELS.find((model) => model.id === choice.modelId)?.efforts).toContain(
          choice.effort,
        );
      }
    }
  });

  it("provides official pricing for every provider and all English journey levels", () => {
    for (const provider of PROVIDERS) {
      expect(EN_PROVIDERS[provider.id]).toBeDefined();
      expect(PROVIDER_PRICING_URLS[provider.id]).toMatch(/^https:\/\//);
    }
    expect(Object.keys(EN_LEVELS)).toHaveLength(4);
    for (const level of Object.values(EN_LEVELS)) expect(level.questions).toHaveLength(3);
  });
});
