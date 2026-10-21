import { describe, expect, it } from "vitest";
import { MODELS, SCENARIOS, scoreChoice, type Effort } from "../data/models";
describe("quiz scoring", () => {
  it("stays between 1 and 8 for every model and effort", () => {
    for (const scenario of SCENARIOS)
      for (const model of MODELS)
        for (const effort of model.efforts) {
          const { points } = scoreChoice(model.id, effort, scenario);
          expect(points).toBeGreaterThanOrEqual(1);
          expect(points).toBeLessThanOrEqual(8);
        }
  });
  it("awards 8 for ideals and 1 for unlisted distant efforts", () => {
    for (const scenario of SCENARIOS) {
      for (const choice of scenario.choices.filter((c) => c.verdict === "ideal"))
        expect(scoreChoice(choice.modelId, choice.effort, scenario).points).toBe(8);
      const target = scenario.choices[0]?.effort;
      const distant: Effort = target === "high" || target === "medium" ? "none" : "high";
      expect(scoreChoice("unlisted-model", distant, scenario).points).toBe(1);
    }
  });
  it("matches the fixed database constraint, update migration if this changes", () => {
    expect(SCENARIOS.length * 8).toBe(64);
    const total = SCENARIOS.reduce(
      (sum, s) =>
        sum + Math.max(...s.choices.map((c) => scoreChoice(c.modelId, c.effort, s).points)),
      0,
    );
    expect(total).toBe(SCENARIOS.length * 8);
  });
});
