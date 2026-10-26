import type { Product } from "./types.js";

export const CATEGORIES = ["Electronics", "Books", "Home", "Garden", "Toys", "Sports"];

const ADJECTIVES = ["Compact", "Deluxe", "Eco", "Smart", "Classic", "Portable", "Pro", "Mini"];
const NOUNS = ["Lamp", "Speaker", "Chair", "Kettle", "Backpack", "Notebook", "Blender", "Drone", "Planter", "Racket"];
const TAGS = ["new", "sale", "popular", "gift", "outdoor", "premium", "eco"];

/** Small deterministic PRNG so every run (and every candidate) sees the same data. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateProducts(count = 10000): Product[] {
  const rand = mulberry32(42);
  const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];

  const products: Product[] = [];
  for (let i = 1; i <= count; i++) {
    const tags = Array.from(new Set([pick(TAGS), pick(TAGS)]));
    products.push({
      id: `p${i}`,
      name: `${pick(ADJECTIVES)} ${pick(NOUNS)} ${i}`,
      category: pick(CATEGORIES),
      priceCents: 500 + Math.floor(rand() * 49500),
      tags,
      inStock: rand() > 0.15,
    });
  }
  return products;
}

export const PRODUCTS: Product[] = generateProducts();
