import { describe, expect, it } from "vitest";
import { MODELS, MODEL_PROFILES, PROVIDERS, SCENARIOS } from "../data/models";
import { EN_MODELS, EN_PROVIDERS, EN_SCENARIOS, EN_LEVELS } from "../data/en";
import { LEVELS } from "../data/parcours";

describe("data integrity", () => {
  it("aligns scenarios, models, efforts and translations", () => {
    for (const scenario of SCENARIOS) {
      expect(new Set(scenario.choices.map((c) => c.modelId)).size).toBe(scenario.choices.length);
      for (const verdict of ["ideal", "valid", "risky"])
        expect(scenario.choices.some((c) => c.verdict === verdict)).toBe(true);
      expect(EN_SCENARIOS[scenario.id]).toBeDefined();
      for (const choice of scenario.choices) {
        const model = MODELS.find((m) => m.id === choice.modelId);
        expect(model).toBeDefined();
        expect(model?.efforts).toContain(choice.effort);
        expect(EN_SCENARIOS[scenario.id]?.notes[choice.modelId]?.trim()).toBeTruthy();
      }
    }
  });
  it("requires complete profiles, distinct explanations, positive prices and supported efforts", () => {
    for (const model of MODELS) {
      expect(MODEL_PROFILES[model.id]).toBeDefined();
      const en = EN_MODELS[model.id];
      expect(en).toBeDefined();
      expect(en?.bestFor.trim()).toBeTruthy();
      expect(en?.simpleNote.trim()).toBeTruthy();
      expect(en?.techNote.trim()).toBeTruthy();
      expect(en?.capabilities.length).toBeGreaterThan(0);
      expect(en?.capabilities.every((c) => c.trim())).toBe(true);
      expect(en?.simpleNote).not.toBe(en?.bestFor);
      expect(model.simpleNote).not.toBe(model.bestFor);
      expect(model.priceIn).toBeGreaterThan(0);
      expect(model.priceOut).toBeGreaterThan(0);
      expect(model.efforts.length).toBeGreaterThan(0);
    }
    for (const provider of PROVIDERS) expect(EN_PROVIDERS[provider.id]).toBeDefined();
  });
  it("keeps learning levels and answer indices aligned", () => {
    expect(LEVELS).toHaveLength(4);
    expect(Object.keys(EN_LEVELS)).toHaveLength(4);
    for (const level of LEVELS) {
      const en = EN_LEVELS[level.id];
      expect(en?.questions).toHaveLength(level.questions.length);
      level.questions.forEach((q, i) => {
        expect(en?.questions[i]?.options).toHaveLength(q.options.length);
        expect(Number.isInteger(q.answer)).toBe(true);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
      });
    }
  });
});
