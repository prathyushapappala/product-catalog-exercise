import cors from "cors";
import express from "express";
import { listCategories, searchProducts } from "./products.js";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/categories", (_req, res) => {
    res.json({ items: listCategories() });
  });

  // GET /api/products?search=lamp&category=Home
  app.get("/api/products", (req, res) => {
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const category = typeof req.query.category === "string" ? req.query.category : undefined;

    const items = searchProducts({ search, category });
    res.json({ items, total: items.length });
  });

  // TODO (Task 2): return a single product by id, or 404 if it does not exist.
  app.get("/api/products/:id", (_req, res) => {
    res.status(501).json({ error: "Not implemented" });
  });

  return app;
}
