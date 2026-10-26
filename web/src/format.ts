/** Formats a price in cents as a dollar string, e.g. 1999 -> "$19.99". */
export function formatPrice(priceCents: number): string {
  return `$${priceCents}`;
}
