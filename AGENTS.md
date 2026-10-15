# AGENTS.md --- Vendra Project Guide

## Project overview

Vendra is an e-commerce frontend built with Next.js App Router,
TypeScript, Tailwind CSS, TanStack Query, Axios, and next-themes.

Use this file as the default project guide when helping with code in
this repository. Follow the existing patterns and avoid introducing
unnecessary architecture.

## Current project structure

```text
app/                  # Next.js routes, layouts, metadata, route-level files
components/            # Shared UI and reusable components
constants/             # Static configuration and navigation data
features/
  home/
    home.tsx           # Home feature composition
hooks/
  queries/             # TanStack Query hooks, e.g. useAllProducts.ts
lib/
  axios.ts             # Shared Axios instance
  utils.ts             # Shared utilities
Providers/             # App-level providers (match existing folder casing)
public/                # Static assets
services/              # API request functions, e.g. products.ts
styles/                # Global styles or styling resources
types/
  type.ts              # Shared TypeScript types (prefer domain-specific files as the project grows)
```

The screenshot shows `Providers` with a capital P. Do not rename it or
change folder casing casually; first check existing imports and
conventions.

## Architecture rules

### 1. App Router and features

- Keep `app/` route files thin. A route should import and render the
  relevant feature.
- Put page-specific composition and logic in
  `features/<feature-name>/`.
- Use lowercase kebab-case for folder and file names where consistent
  with the existing project, such as `features/home/home.tsx` and
  `hooks/queries/use-all-products.ts`. Do not rename existing files
  without a reason.
- React component/function names must start with an uppercase letter,
  e.g. `Home`, `ProductsGrid`, `CategoryCard`.
- Use `"use client"` only when the component needs client-side state,
  effects, event handlers, or client-only hooks. Keep components
  server-rendered when possible.

Example:

```tsx
// app/page.tsx
import Home from "@/features/home/home";

export default function Page() {
  return <Home />;
}
```

### 2. Components

- Put reusable site-wide UI in `components/`.
- Put components used only by one feature inside that feature,
  e.g. `features/home/components/`.
- Keep components focused on one responsibility. Avoid making one
  large component handle the whole page.
- Reuse existing UI components and patterns before creating
  replacements.
- Keep responsive behavior and accessibility in mind: semantic
  elements, accessible labels, keyboard focus, and correct button/link
  usage.

### 3. API services and Axios

- Keep HTTP request functions in `services/`; components and hooks
  should not contain raw Axios requests.
- Use the shared Axios instance from `@/lib/axios`.
- The public DummyJSON base URL is configured with
  `NEXT_PUBLIC_API_ECOMMERCE=https://dummyjson.com` in `.env.local`.
- Axios setup should use the exact matching variable name:

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ECOMMERCE,
});
```

- Never commit `.env.local` or secrets. Variables prefixed with
  `NEXT_PUBLIC_` are exposed to browser code and must not contain
  secrets.
- Check the actual request URL in the browser Network tab when an API
  request fails. If it calls `localhost:3000/products`, verify
  `baseURL` and restart the dev server after changing environment
  variables.
- DummyJSON is a practice/demo API. Do not describe its
  authentication, cart, or write operations as production-persistent
  behavior unless verified.

### 4. TanStack Query

- Keep query hooks in `hooks/queries/`.
- Hooks should call service functions and expose clearly named data
  and status fields.
- Use stable, descriptive query keys in lowercase,
  e.g. `["all-products"]`.
- Use `isPending` for initial pending state and `isError`/`error` for
  failures.
- Avoid naming variables with PascalCase. Prefer `products` over
  `Products`.
- For parameterized queries, include the parameters in the query key.
- Reuse cached queries instead of manually fetching the same data in
  multiple components.

Example:

```ts
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/products";

export function useAllProducts() {
  const {
    data: products,
    isPending: isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-products"],
    queryFn: getAllProducts,
  });

  return { products, isLoading, isError, error };
}
```

Match the return shape to how the consuming component uses it.
DummyJSON's `/products` endpoint returns an object containing
`products`, `total`, `skip`, and `limit`.

### 5. TypeScript

- Avoid `any`; define interfaces/types for API responses and domain
  models in `types/`.
- Type Axios responses when practical.
- Prefer accurate nullable/optional types rather than unsafe
  assertions.
- Keep types close to their domain if a single global `types/type.ts`
  starts becoming crowded, e.g. `types/product.ts`,
  `types/category.ts`, and `types/auth.ts`.
- Use the project's existing aliases and import style.

### 6. Loading, errors, and empty states

- Use skeletons for product grids, category cards, and other content
  whose final layout is known.
- Use small spinners for short actions such as submitting a form or
  adding to cart.
- Do not hide the entire page shell or navigation just because product
  data is loading.
- Include an error state and, where useful, an empty state.
- Keep skeleton dimensions close to the real content to avoid layout
  shifts.

### 7. Styling

- Use Tailwind CSS and existing UI components/design tokens.
- Follow the existing responsive breakpoints and color/theme
  conventions.
- Avoid unnecessary inline styles when Tailwind classes are
  sufficient.
- For motion, use small, deliberate transitions and avoid state
  changes that cause flicker or layout jumps.
- Preserve light/dark mode support.

### 8. Naming conventions

- React components: `PascalCase` (`Home`, `ProductCard`).
- Variables and functions: `camelCase` (`getAllProducts`,
  `isLoading`).
- Constants: follow the surrounding file's convention; use descriptive
  names.
- Query keys: lowercase descriptive arrays (`["all-products"]`).
- API service functions: verb + resource (`getAllProducts`,
  `getProductById`).
- Route and feature folders: lowercase names (`home`, `products`).

## Product and category image strategy

- Use product images supplied by DummyJSON for product cards.
- For subcategory cards, an image can be selected from a product whose
  `category` matches that subcategory's `slug`.
- The six main Vendra navigation groups are frontend-defined
  groupings, not necessarily API categories. Keep their custom
  grouping in constants and map each subcategory to its actual
  DummyJSON slug.
- If a product-derived image is unsuitable, allow a curated image
  override rather than complicating the API layer.
- Avoid making one request per category if one product-list request
  can supply the required images.

## SEO

- Use Next.js Metadata API for page titles, descriptions, canonical
  URLs, Open Graph, and social metadata where relevant.
- Keep metadata in route-level `metadata` exports or
  `generateMetadata` for dynamic routes.
- Do not put secrets or private information in metadata.
- Use descriptive headings, semantic HTML, meaningful image alt text,
  and crawlable links.
- Do not add `"use client"` to a route file solely for interactive UI
  if the interactive part can be isolated into a client component.

## Navbar and navigation

- Keep navigation data in `constants/navigationLinks.ts` and
  components in the existing navigation component files.
- Navigation types should describe the actual data shape, including
  child objects with `title` and `slug` when applicable.
- Keep mobile bottom navigation items inside the component if they
  depend on local callbacks such as opening a Sheet.
- When changing sticky/fixed header behavior, avoid swapping
  positioning modes in ways that cause layout jumps. Preserve a layout
  placeholder if the header becomes fixed.

## How to make changes

1.  Inspect the relevant files and their current exports before editing.
2.  Reuse the current architecture and naming patterns.
3.  Make the smallest complete change that solves the task.
4.  Keep types and error/loading states accurate.
5.  Avoid unrelated refactors or renaming folders/files without a clear
    need.
6.  After a change, explain which files changed and why.
7.  If running commands is possible, run the relevant
    lint/type-check/build command and report actual results. Never claim
    a check passed unless it was run.

## Communication preferences

- Explain code decisions in Egyptian Arabic when responding to the
  project owner.
- Prefer practical, ready-to-use TypeScript/TSX examples.
- Be clear when an assumption depends on a file or API shape that has
  not been inspected.
- Do not invent files, dependencies, endpoints, or project behavior.
  Ask for the relevant file only when essential.
