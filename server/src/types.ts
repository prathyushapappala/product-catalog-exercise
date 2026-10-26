export interface Product {
  id: string;
  name: string;
  category: string;
  /** Price in cents, e.g. 1999 means $19.99 */
  priceCents: number;
  tags: string[];
  inStock: boolean;
}
