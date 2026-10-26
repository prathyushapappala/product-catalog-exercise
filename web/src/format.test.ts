import { describe, expect, it } from "vitest";
import { formatPrice } from "./format";

describe("formatPrice", () => {
  it("formats cents as dollars", () => {
    expect(formatPrice(1999)).toBe("$19.99");
  });

  it("keeps two decimal places", () => {
    expect(formatPrice(500)).toBe("$5.00");
  });
});
