import { useEffect, useState } from "react";
import { fetchProducts, type Product } from "./api";
import { ProductCard } from "./ProductCard";

export function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchProducts({ search }, controller.signal)
      .then((data) => {
        setProducts(data.items);
        setTotal(data.total);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [search]);

  return (
    <main className="container">
      <h1>Product Catalog</h1>

      <div className="controls">
        <input
          type="search"
          placeholder="Search products or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p className="status">Loading...</p>}
      {!loading && !error && <p className="status">{total} products</p>}

      <ul className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </main>
  );
}
