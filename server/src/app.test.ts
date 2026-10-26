import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

const app = createApp();

describe("GET /api/health", () => {
  it("returns ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("GET /api/products", () => {
  it("filters by category", async () => {
    const res = await request(app).get("/api/products").query({ category: "Books" });
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBeGreaterThan(0);
    expect(res.body.items.every((p: { category: string }) => p.category === "Books")).toBe(true);
  });

  it("filters by search text", async () => {
    const res = await request(app).get("/api/products").query({ search: "lamp" });
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(res.body.items.length);
    expect(res.body.items.length).toBeGreaterThan(0);
  });
});

// Task 2 - uncomment and make these pass once GET /api/products/:id is implemented.
describe.skip("GET /api/products/:id", () => {
  it("returns the product when it exists", async () => {
    const res = await request(app).get("/api/products/p1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe("p1");
  });

  it("returns 404 when it does not exist", async () => {
    const res = await request(app).get("/api/products/does-not-exist");
    expect(res.status).toBe(404);
  });
});

// Task 3 - write tests for pagination here.
