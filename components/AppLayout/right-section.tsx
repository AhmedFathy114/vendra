"use client";

import { Search, ShoppingBag, UserRound } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme/mode-toggle";

function IconAction({
  label,
  count,
  children,
}: {
  label: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={label === "Account" ? "/account" : "/cart"}
      aria-label={count === undefined ? label : `${label}, ${count} items`}
      className="relative inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
      {count !== undefined && (
        <span className="absolute right-0 top-0 flex size-4.5 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold leading-none text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

export function SearchField({ className = "" }: { className?: string }) {
  return (
    <form
      action="/shop/products/search"
      role="search"
      className={`relative ${className}`}
    >
      <label className="sr-only" htmlFor="site-search">
        Search products
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id="site-search"
        name="title"
        type="search"
        placeholder="I'm looking for..."
        className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
      />
    </form>
  );
}

export function ActionsSection({ cartCount }: { cartCount: number }) {
  return (
    <div
      className="flex shrink-0 items-center gap-2"
      data-navbar-section="store-actions"
    >
      <SearchField className="w-52 xl:w-60" />
      <IconAction label="Account">
        <UserRound className="size-5.5 cursor-pointer hover:text-red-700" />
      </IconAction>
      <IconAction label="Cart" count={cartCount > 0 ? cartCount : undefined}>
        <ShoppingBag className="size-5.5 cursor-pointer hover:text-red-700" />
      </IconAction>
      <ModeToggle />
    </div>
  );
}
