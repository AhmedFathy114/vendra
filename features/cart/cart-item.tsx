import Image from "next/image";
import Link from "next/link";
import { usd } from "@/lib/utils";
import type { CartProduct } from "@/types/cart";

function CartItem({ item }: { item: CartProduct }) {
  const hasDiscount = item.discountedTotal < item.total;

  return (
    <article className="flex gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <Link
        href={`/shop/products/${item.id}`}
        className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-muted sm:size-28"
      >
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="(min-width: 640px) 112px, 96px"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/shop/products/${item.id}`}
              className="line-clamp-2 font-semibold transition-colors hover:text-red-800 focus-visible:text-red-800 focus-visible:outline-none dark:hover:text-red-400 dark:focus-visible:text-red-400"
            >
              {item.title}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {usd.format(item.price)} each
            </p>
          </div>

          {hasDiscount && (
            <span className="shrink-0 rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
              -{Math.round(item.discountPercentage)}%
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            Qty {item.quantity}
          </span>

          <div className="text-right">
            <p className="text-base font-bold">
              {usd.format(item.discountedTotal)}
            </p>
            {hasDiscount && (
              <p className="text-xs text-muted-foreground line-through">
                {usd.format(item.total)}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
