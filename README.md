# Product Catalog – Coding Exercise

A small full-stack app: a **React + TypeScript (Vite)** frontend and a **Node/Express** API serving a catalog of 10,000 products from memory. There is no database or AWS setup needed.

You will make a handful of changes, talk through your decisions as you go, and we will discuss them at the end. This is a conversation, not a test of speed. You are welcome to use the internet, docs, and your usual tools. Please **think out loud**.

## Setup

Requirements: Node 20+ and [pnpm](https://pnpm.io) (`npm i -g pnpm` if you don't have it).

```bash
pnpm install
pnpm dev        # API on http://localhost:3001, web on http://localhost:5173
pnpm test       # runs both test suites
```

Layout:

```
server/   Express API (TypeScript, Vitest + Supertest)
web/      React app (TypeScript, Vite, Vitest + Testing Library)
```

Right now `pnpm test` has **failing tests** in `web/`. That is expected.

## Tasks

Work through them in order. The first three are the core; 4 and 5 are there if we have time.

### 1. Fix a UI bug
Prices on the product cards look wrong (a product costing $19.99 shows as `$1999`). Find the cause and fix it. The failing test in `web/src/format.test.ts` should pass afterwards.

### 2. Add an API endpoint
`GET /api/products/:id` currently returns `501 Not Implemented`. Implement it so it returns the product, or a `404` with a JSON error if the id does not exist. Un-skip and pass the tests in `server/src/app.test.ts`.

### 3. Change an existing endpoint
`GET /api/products` returns every matching product in one response, and the page gets slow. Add pagination with `page` and `pageSize` query params (pick sensible defaults and limits) and return enough information for a client to build paging controls. Then update the UI to use it.

While you are in there, review how the search is implemented. We will talk about its **runtime complexity** and whether it can be improved.

### 4. Add a category filter (UI)
The API already supports `?category=` and `GET /api/categories`. Add a category dropdown next to the search box and wire it up.

### 5. Add tests
Add tests for the behavior you built or changed (API and/or UI).

## Things we will talk about
- Why you made each change the way you did, and the tradeoffs
- Runtime complexity of the search code, before and after
- Edge cases (invalid input, empty results, rapid typing)
- What you would do next with more time
