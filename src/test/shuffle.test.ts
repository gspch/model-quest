import { describe, expect, it } from "vitest";
import { seededShuffle } from "../lib/shuffle";
import { dataAgeDays } from "../data/sources";
import { SCENARIOS } from "../data/models";

describe("seededShuffle", () => {
  it("garde les mêmes éléments, sans doublon", () => {
    const out = seededShuffle(SCENARIOS, 42);
    expect(out).toHaveLength(SCENARIOS.length);
    expect(new Set(out.map((s) => s.id)).size).toBe(SCENARIOS.length);
  });
  it("est reproductible pour une même graine", () => {
    expect(seededShuffle([1, 2, 3, 4, 5, 6, 7, 8], 7)).toEqual(
      seededShuffle([1, 2, 3, 4, 5, 6, 7, 8], 7),
    );
  });
  it("change d'ordre selon la graine", () => {
    const orders = new Set(
      Array.from({ length: 20 }, (_, s) => seededShuffle([1, 2, 3, 4, 5, 6, 7, 8], s).join()),
    );
    expect(orders.size).toBeGreaterThan(10);
  });
  it("ne modifie pas le tableau d'origine", () => {
    const src = [1, 2, 3];
    seededShuffle(src, 3);
    expect(src).toEqual([1, 2, 3]);
  });
});

describe("dataAgeDays", () => {
  it("compte les jours depuis la vérification", () => {
    expect(dataAgeDays(new Date("2026-10-21T12:00:00Z"))).toBe(0);
    expect(dataAgeDays(new Date("2027-01-21T12:00:00Z"))).toBe(92);
  });
});
