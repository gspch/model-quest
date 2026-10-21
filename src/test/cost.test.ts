import { describe, expect, it } from "vitest";
import { MODELS, currentPrice, estimateCost } from "../data/models";
describe("costs and promotional dates", () => {
  it("weights input and output and multiplies output only", () => {
    const m = MODELS[0];
    if (!m) throw new Error("Missing model");
    expect(estimateCost(m, "none", 10)).toBeCloseTo(10 * (0.75 * m.priceIn + 0.25 * m.priceOut));
    expect(estimateCost(m, "high", 10, 0.9)).toBeCloseTo(
      10 * (0.9 * m.priceIn + 0.1 * m.priceOut * 4),
    );
    expect(estimateCost(m, "high", 0)).toBe(0);
  });
  it("uses promo prices through the entire final UTC day and then switches", () => {
    for (const m of MODELS.filter((m) => m.promo)) {
      if (!m.promo) throw new Error("Missing promotion");
      const before = new Date(`${m.promo.until}T23:59:59.999Z`);
      const after = new Date(before.getTime() + 1);
      expect(currentPrice(m, before)).toEqual({ priceIn: m.priceIn, priceOut: m.priceOut });
      expect(currentPrice(m, after)).toEqual({
        priceIn: m.promo.priceInAfter,
        priceOut: m.promo.priceOutAfter,
      });
      expect(estimateCost(m, "low", 2, 0.75, after)).toBeCloseTo(
        2 * (0.75 * m.promo.priceInAfter + 0.25 * m.promo.priceOutAfter * 1.3),
      );
    }
  });
});
