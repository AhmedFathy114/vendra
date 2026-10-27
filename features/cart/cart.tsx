"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserCart } from "@/hooks/queries/useUserCart";
import {
  CircleAlert,
  RefreshCw,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import CartItem from "./cart-item";
import CartSkeleton from "./cart-skeleton";
import CartSummary from "./cart-summary";

type CartProps = {
  userId: number | null;
};

type CartMessageProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
};

function CartMessage({
  icon: Icon,
  title,
  description,
  children,
}: CartMessageProps) {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-md items-center px-4 py-10 sm:px-6">
      <div className="w-full rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <Icon className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}

const primaryLinkClassName =
  "mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

function CartError({
  error,
  isRetrying,
  onRetry,
}: {
  error: Error | null;
  isRetrying: boolean;
  onRetry: () => void;
}) {
  return (
    <CartMessage
      icon={CircleAlert}
      title="Couldn't load your cart"
      description="We couldn't retrieve the items in your cart. Please try again."
    >
      {error instanceof Error && (
        <p className="mt-3 wrap-break-word text-xs text-destructive">
          {error.message}
        </p>
      )}
      <Button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        className="mt-6 h-11 w-full rounded-xl px-4"
      >
        <RefreshCw
          className={isRetrying ? "size-4 animate-spin" : "size-4"}
          aria-hidden="true"
        />
        {isRetrying ? "Retrying..." : "Try again"}
      </Button>
    </CartMessage>
  );
}

function Cart({ userId }: CartProps) {
  const { cart, isLoading, isError, error, isFetching, refetch } =
    useUserCart(userId);

  if (!userId) {
    return (
      <CartMessage
        icon={ShoppingBag}
        title="Sign in to view your cart"
        description="Your cart is linked to your account. Sign in to see the items you've saved."
      >
        <Link
          href="/login?callbackUrl=/cart"
          className={primaryLinkClassName}
        >
          Sign in
        </Link>
      </CartMessage>
    );
  }

  if (isLoading) return <CartSkeleton />;

  if (isError) {
    return (
      <CartError
        error={error instanceof Error ? error : null}
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }

  if (!cart || cart.products.length === 0) {
    return (
      <CartMessage
        icon={ShoppingBag}
        title="Your cart is empty"
        description="Looks like you haven't added anything to your cart yet."
      >
        <Link
          href="/shop/collection/best-seller"
          className={primaryLinkClassName}
        >
          Start shopping
        </Link>
      </CartMessage>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            My account
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Shopping cart
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Review the items in your cart before you continue shopping.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            {cart.totalProducts} products
          </span>
          <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            {cart.totalQuantity} items
          </span>
        </div>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-3">
          {cart.products.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <CartSummary cart={cart} />
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Cart changes are not saved permanently in this demo.
      </p>
    </section>
  );
}

export default Cart;
