export interface Product {
  id: string;
  name: string;
  category: string;
  /** Price in cents, e.g. 1999 means $19.99 */
  priceCents: number;
  tags: string[];
  inStock: boolean;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
}

export interface ProductQuery {
  search?: string;
  category?: string;
}

export async function fetchProducts(
  query: ProductQuery,
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  if (query.search) params.set("search", query.search);
  if (query.category) params.set("category", query.category);

  const res = await fetch(`/api/products?${params.toString()}`, { signal });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  return res.json();
}

export async function fetchCategories(signal?: AbortSignal): Promise<string[]> {
  const res = await fetch("/api/categories", { signal });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  const data: { items: string[] } = await res.json();
  return data.items;
}
