"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/type";
import { motion } from "motion/react";
import { usd } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  isNew?: boolean;
};

const LOW_STOCK_LIMIT = 5;

export default function ProductCard({
  product,
  isNew = false,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const href = `/shop/products/${product.id}`;
  const discount = Math.round(product.discountPercentage ?? 0);
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - discount / 100)
    : product.price;
  const label = (product.brand ?? product.category ?? "").replaceAll("-", " ");

  const isOutOfStock =
    product.availabilityStatus === "Out of Stock" || product.stock === 0;
  const isLowStock =
    !isOutOfStock &&
    product.stock !== undefined &&
    product.stock <= LOW_STOCK_LIMIT;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring"
    >
      <button
        type="button"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isFavorite}
        onClick={() => setIsFavorite((prev) => !prev)}
        className="absolute inset-e-3 top-3 z-20 flex size-9 cursor-pointer items-center justify-center rounded-full bg-background/90 shadow-sm transition hover:scale-110"
      >
        <Heart
          size={18}
          className={
            isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
          }
        />
      </button>

      <div className="pointer-events-none absolute inset-s-3 top-3 z-10 flex flex-col items-start gap-1">
        {isOutOfStock ? (
          <span className="rounded-full bg-foreground px-2.5 py-1 text-xs font-semibold text-background">
            Out of stock
          </span>
        ) : (
          <>
            {hasDiscount && (
              <span className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
                -{discount}%
              </span>
            )}
            {isNew && (
              <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
                New
              </span>
            )}
          </>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-muted/30">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 45vw"
          className={`object-contain p-4 transition-transform duration-500 group-hover:scale-105 ${
            isOutOfStock ? "opacity-50 grayscale" : ""
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </span>

          <span className="flex shrink-0 items-center gap-1 text-sm">
            <Star
              size={15}
              className="fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            <span className="sr-only">Rating:</span>
            {product.rating?.toFixed(1)}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-foreground transition-colors group-hover:text-red-600 sm:min-h-12 sm:text-base">
          <Link
            href={href}
            className="after:absolute after:inset-0 after:z-10 focus-visible:outline-none"
          >
            {product.title}
          </Link>
        </h3>

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-1">
          <span
            className={`text-base font-bold sm:text-lg ${
              isOutOfStock ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            {usd.format(finalPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {usd.format(product.price)}
            </span>
          )}
        </div>

        {isLowStock && (
          <p className="text-xs font-medium text-red-600">
            Only {product.stock} left
          </p>
        )}

        <span
          aria-hidden="true"
          className={`mt-1 flex h-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
            isOutOfStock
              ? "bg-muted text-muted-foreground"
              : "bg-foreground text-background group-hover:bg-red-600 group-hover:text-white"
          }`}
        >
          {isOutOfStock ? "Sold out" : "Shop now"}
        </span>
      </div>
    </motion.article>
  );
}
