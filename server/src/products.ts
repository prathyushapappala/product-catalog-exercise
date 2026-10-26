import { CATEGORIES, PRODUCTS } from "./data.js";
import type { Product } from "./types.js";

export interface SearchParams {
  search?: string;
  category?: string;
}

/**
 * Returns products matching the optional text query and category.
 * Text matches against the product name and its tags (case-insensitive).
 */
export function searchProducts({ search, category }: SearchParams): Product[] {
  const query = search?.trim().toLowerCase();

  const matches = PRODUCTS.filter((p) => {
    if (category && p.category !== category) return false;
    if (!query) return true;
    return (
      p.name.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query))
    );
  });

  // Make sure the same product never appears twice in the results.
  return matches.filter(
    (product, index, all) => all.findIndex((other) => other.id === product.id) === index,
  );
}

export function listCategories(): string[] {
  return [...CATEGORIES];
}
