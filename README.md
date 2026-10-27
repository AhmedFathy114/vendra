<div align="center">

<img src="./app/icon.jpg" alt="Vendra Logo" width="120" />

# 🛍️ Vendra

### Curated essentials. Modern shopping.

A fast, responsive e-commerce storefront built with Next.js, TypeScript, Tailwind CSS, and TanStack Query.

[![LIVE DEMO](https://img.shields.io/badge/LIVE_DEMO-CLICK_HERE-2ea44f?style=for-the-badge)](https://vendra-kappa.vercel.app/)

</div>

## 🛠️ Built With

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-5_beta-000000?style=for-the-badge)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-000000?style=for-the-badge&logo=framer&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide-FF7A59?style=for-the-badge&logo=lucide&logoColor=white)
![Base UI](https://img.shields.io/badge/Base_UI-1.9-000000?style=for-the-badge)
![next-themes](https://img.shields.io/badge/next--themes-0.4-000000?style=for-the-badge)

</div>

---

## ✨ Features

- ⚡ **Fast & Smooth** — Server-rendered pages, prefetched data, and client-side caching keep browsing fast.
- 🏠 **Dynamic Home Page** — A cinematic hero slider, grouped category cards, and curated product sections.
- 🗂️ **Categories & Subcategories** — Browse the six main Vendra groups and their mapped product categories.
- 🔎 **Smart Search** — Search products with pagination and responsive product cards.
- 🧭 **Collections** — Explore best sellers and new arrivals with dedicated collection pages.
- 🛍️ **Product Details** — Image gallery, discounts, ratings, reviews, stock status, specifications, and delivery information.
- 🛒 **Working Cart** — Add products using the selected quantity and review a full order summary.
- 🔐 **Authentication** — Username/password sign-in with NextAuth, inline validation, and safe callback redirects.
- 📝 **Registration** — A validated registration form connected to the DummyJSON users endpoint.
- 👤 **User Profile** — View personal, address, and work details, with a one-click logout.
- 🌓 **Light & Dark Mode** — Theme switching powered by `next-themes`.
- 📱 **Fully Responsive** — Layouts adapt from mobile and tablet to desktop.
- ♿ **Accessible UI** — Semantic elements, keyboard focus states, labels, and accessible navigation.
- 🔍 **SEO Ready** — Route metadata, dynamic page titles, descriptions, and static category params.
- 💀 **Loading & Error States** — Skeletons, spinners, empty states, and retry actions.
- 🔄 **Server-State Management** — TanStack Query with SSR prefetching, hydration, and cache updates.
- 🎨 **Reusable Components** — Shared cards, sections, loaders, layout, and shadcn/Base UI primitives.
- 🚀 **Vercel Ready** — Deployed and optimized for the Next.js App Router.

---

## 🎥 The Experience

Vendra is built around a simple idea:

> Discover something you love, explore it, and make it yours.

The storefront provides dedicated experiences for:

- 🏠 Home
- 🗂️ Categories
- 🏷️ Subcategories
- 🧭 Collections
- 🔎 Search
- 🛍️ Product Details
- 🛒 Shopping Cart
- 👤 User Account
- 🔐 Sign In
- 📝 Create Account

---

## 🔐 Authentication

Authentication is handled with **NextAuth.js (Auth.js) credentials** backed by the DummyJSON API.

The application supports:

- 📝 Registration form with client-side validation
- 🔑 Username & password login
- 🚪 Logout
- 🔐 Server-side JWT sessions
- 🔄 Access-token refresh through the DummyJSON refresh endpoint
- 👤 User session data including name, email, avatar, and access token
- ↩️ Safe `callbackUrl` redirects after login
- 🛡️ Sensitive profile fields excluded from the UI

### Demo credentials

| Username | Password    |
| -------- | ----------- |
| `emilys` | `emilyspass` |

### Auth flow

```text
Login form
    │
    ▼
signIn("credentials")
    │
    ▼
NextAuth Credentials Provider
    │
    ▼
DummyJSON /auth/login
    │
    ▼
JWT session (access + refresh tokens)
    │
    ▼
session.user + protected pages
```

---

## 👤 User Profile

Each authenticated user has a profile connected to their DummyJSON account.

Users can view:

- Full name and username
- Email and phone number
- Avatar
- Role and birth date
- Home address
- Company and work details

Sensitive fields such as passwords, bank details, SSN, crypto data, and device metadata are intentionally not displayed.

The profile page also provides a **logout** button using NextAuth's `signOut`.

---

## 🛒 Shopping Cart

The cart is tied to the authenticated user and loaded from:

```text
GET /carts/user/{userId}
```

Products can be added directly from the product page:

- The selected quantity is respected.
- The product's minimum order quantity is used as the starting quantity.
- Out-of-stock products cannot be added.
- Unauthenticated users are redirected to login with a `callbackUrl`.
- Existing carts are updated with `PUT /carts/{cartId}` and `merge: true`.
- New carts are created with `POST /carts/add`.
- The React Query cache is updated immediately after a successful add.

The cart page includes:

- Product cards with thumbnails and quantities
- Subtotal, discount, and total
- Product and item counts
- Empty, loading, error, and signed-out states
- A clear note that checkout is disabled in this demo

> **Demo note:** DummyJSON is a mock API. Cart writes succeed but are not persisted, so additions reset after a refresh or in a new tab. Registration also does not create a permanent account.

---

## 🗄️ Data & Backend

Vendra is a frontend-focused e-commerce demo. Product, category, user, and cart data comes from the **DummyJSON** API.

| Area            | Endpoints                                                             |
| --------------- | --------------------------------------------------------------------- |
| Products        | `/products`, `/products/search`, `/products/category/{category}`      |
| Single product  | `/products/{id}`                                                      |
| Authentication  | `/auth/login`, `/auth/me`, `/auth/refresh`                            |
| Registration    | `/users/add`                                                          |
| Cart            | `/carts/user/{userId}`, `/carts/{id}`, `/carts/add`                   |

### Environment

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_ECOMMERCE=https://dummyjson.com
AUTH_SECRET=your-generated-secret
```

Generate an auth secret with:

```bash
npx auth secret
```

### Data flow

```text
                    ┌─────────────────┐
                    │   DummyJSON API │
                    │ Products / Users│
                    │   Carts / Auth  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Axios Services │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ TanStack Query  │
                    │ Hooks / Prefetch│
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Next.js App    │
                    │     Router      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Vendra UI     │
                    └─────────────────┘


                    ┌─────────────────┐
                    │     NextAuth    │
                    │ Credentials/JWT │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Session User   │
                    │ Profile / Cart  │
                    └─────────────────┘
```

---

## 🧩 Application Architecture

```text
📦 vendra
├── 📂 app
│   ├── 📂 account                  # Profile page
│   ├── 📂 cart                     # Shopping cart page
│   ├── 📂 login                    # Sign-in page
│   ├── 📂 register                 # Registration page
│   └── 📂 shop
│       ├── 📂 [category]           # Category page
│       ├── 📂 [category]/[subCategory]
│       ├── 📂 collection/[collection]
│       └── 📂 products
│           ├── 📂 [productId]      # Product details
│           └── 📂 search           # Search results
│
├── 📂 components
│   ├── 📂 AppLayout                # Navbar, footer, page shell
│   ├── 📂 cards                    # Product, category, review cards
│   ├── 📂 Loaders                  # Spinners and loading overlays
│   ├── 📂 shared                   # Shared sections and app shell
│   ├── 📂 theme                    # Theme toggle
│   └── 📂 ui                       # shadcn / Base UI primitives
│
├── 📂 features
│   ├── 📂 auth                     # Login and register features
│   ├── 📂 cart                     # Cart, items, summary, skeleton
│   ├── 📂 category                 # Category experience
│   ├── 📂 collection               # Collection experience
│   ├── 📂 home                     # Home composition and hero
│   ├── 📂 product                  # Product details and gallery
│   ├── 📂 profile                  # Profile view
│   ├── 📂 shared                   # Search, pagination, product sections
│   └── 📂 subCategory              # Subcategory products
│
├── 📂 hooks
│   ├── 📂 queries                  # TanStack Query hooks
│   └── 📄 usePagination.ts
│
├── 📂 lib                          # Axios, auth, links, utils, query client
├── 📂 Providers                    # App-level providers
├── 📂 public                       # Static assets
├── 📂 services                     # API services and SSR prefetchers
├── 📂 styles                       # Global styles
└── 📂 types                        # Shared, auth, and cart types
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_ECOMMERCE=https://dummyjson.com
AUTH_SECRET=your-generated-secret
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm run start
```

### Available scripts

| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the development server    |
| `npm run build` | Create a production build       |
| `npm run start` | Start the production server     |
| `npm run lint`  | Run ESLint                      |

---

## 🎨 UI & Design

Vendra uses a clean, modern storefront design with a focus on product discovery.

**Design highlights**

- 🌑 Cinematic hero imagery and video
- 🟢 Green commerce accent color
- 🎞️ Large product imagery
- ✨ Smooth, purposeful motion
- 🧩 Reusable UI primitives
- 🎠 Swiper-powered hero carousel
- 💀 Skeleton loading states
- 📱 Mobile-first responsive layouts
- 🌓 Light and dark themes
- 🔎 Clear visual hierarchy

### Responsive design

The application is designed to work across different screen sizes:

- 🖥️ Desktop
- 💻 Laptop
- 📱 Mobile
- 📲 Tablet

Navigation, product grids, category cards, carousels, the cart, and the profile page all adapt to the available space.

---

## 🔍 SEO

- Metadata API for page titles, descriptions, and canonical content
- Dynamic metadata for products, categories, subcategories, and collections
- Static params for the main category routes
- Semantic headings and crawlable links
- Meaningful image alt text
- Fast server-rendered pages with hydrated client data

---

## 🧠 Main Concepts Used

This project demonstrates practical usage of:

- ⚛️ React component architecture
- 🟦 TypeScript
- ⚡ Next.js App Router
- 🖥️ React Server Components
- 🎨 Tailwind CSS
- 🔄 TanStack Query
- 🚀 SSR prefetching and hydration
- 🌐 REST APIs
- 📡 Axios
- 🔐 NextAuth.js credentials and JWT sessions
- 📝 React Hook Form
- 🎠 Swiper
- ✨ Motion
- 🎨 Base UI and shadcn patterns
- 🌓 next-themes
- 🧭 Next.js routing and metadata
- 📱 Responsive and accessible UI

---

## 🌐 Live Demo

Experience Vendra online:

<div align="center">

[![Open Vendra](https://img.shields.io/badge/🛍️_OPEN_VENDRA-2ea44f?style=for-the-badge)](https://vendra-kappa.vercel.app/)

</div>

---

## 📌 Project Highlights

Vendra brings together a complete modern storefront experience.

The project combines:

- **Next.js + TypeScript** — for a fast, typed application layer
- **Tailwind CSS + Base UI** — for a polished, responsive interface
- **TanStack Query + Axios** — for API communication, caching, and SSR hydration
- **NextAuth.js + DummyJSON** — for a complete demo authentication flow
- **React Hook Form** — for accessible, validated forms
- **Swiper + Motion** — for engaging, cinematic interactions

The result is a complete e-commerce frontend with product discovery, search, authentication, profiles, and a working cart experience.

> **Demo limitations:** checkout, payments, and persistent cart/user data are not enabled. DummyJSON is a mock API used for demonstration purposes.

---

## ⭐ If You Like It

If you found Vendra useful or interesting, consider giving the repository a ⭐ on GitHub.

<div align="center">

**🛍️ Vendra**

*Curated essentials. Modern shopping.*

</div>
