import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Product } from "./api";
import { ProductCard } from "./ProductCard";

const product: Product = {
  id: "p1",
  name: "Smart Lamp 1",
  category: "Home",
  priceCents: 1999,
  tags: ["new", "sale"],
  inStock: true,
};

describe("ProductCard", () => {
  it("renders the name, category and tags", () => {
    render(
      <ul>
        <ProductCard product={product} />
      </ul>,
    );
    expect(screen.getByText("Smart Lamp 1")).toBeTruthy();
    expect(screen.getByText(/Home/)).toBeTruthy();
    expect(screen.getByText("sale")).toBeTruthy();
  });
});
