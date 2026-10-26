import type { Product } from "./api";
import { formatPrice } from "./format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <li className="card">
      <div className="card-header">
        <h3>{product.name}</h3>
        <span className="price">{formatPrice(product.priceCents)}</span>
      </div>
      <p className="meta">
        {product.category} · {product.inStock ? "In stock" : "Out of stock"}
      </p>
      <div className="tags">
        {product.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </li>
  );
}
