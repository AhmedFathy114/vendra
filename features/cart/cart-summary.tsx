import Link from "next/link";
import { usd } from "@/lib/utils";
import type { Cart } from "@/types/cart";

function CartSummary({ cart }: { cart: Cart }) {
  const discount = Math.max(0, cart.total - cart.discountedTotal);

  return (
    <aside className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
      <h2 className="text-lg font-semibold tracking-tight">Order summary</h2>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium">{usd.format(cart.total)}</dd>
        </div>

        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Discount</dt>
          <dd className="font-medium text-emerald-600 dark:text-emerald-400">
            -{usd.format(discount)}
          </dd>
        </div>

        <div className="flex justify-between gap-4 border-t border-border pt-3">
          <dt className="text-base font-semibold">Total</dt>
          <dd className="text-lg font-bold">
            {usd.format(cart.discountedTotal)}
          </dd>
        </div>
      </dl>

      <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-muted/50 p-3 text-center">
        <div>
          <p className="text-xs text-muted-foreground">Products</p>
          <p className="mt-0.5 font-semibold">{cart.totalProducts}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Items</p>
          <p className="mt-0.5 font-semibold">{cart.totalQuantity}</p>
        </div>
      </div>

      <Link
        href="/shop/collection/best-seller"
        className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        Continue shopping
      </Link>

      <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
        Checkout is not enabled in this demo.
      </p>
    </aside>
  );
}

export default CartSummary;
