"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ChevronRight,
  LoaderCircle,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Tag,
  Truck,
} from "lucide-react";
import { useAddToCart } from "@/hooks/queries/useAddToCart";
import { useSingleProduct } from "@/hooks/queries/useSingleProduct";
import { primaryLinks } from "@/lib/Links";
import type { Product as ProductType } from "@/types/type";
import { usd } from "@/lib/utils";
import ReviewCard from "@/components/cards/ReviewCard";
import ProductGallery from "./ProductGallery";
import ProductSkeleton from "./ProductSkeleton";
import LoadingModel from "@/components/Loaders/LoadingModel";

function ProductDetails({
  product,
  userId,
}: {
  product: ProductType;
  userId: number | null;
}) {
  const router = useRouter();
  const { addToCart, isAdding } = useAddToCart(userId);
  const discount = Math.round(product.discountPercentage ?? 0);
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - discount / 100)
    : product.price;

  const isOutOfStock =
    product.availabilityStatus === "Out of Stock" || product.stock === 0;
  const isLowStock =
    !isOutOfStock && product.stock !== undefined && product.stock <= 5;

  const stockLabel = isOutOfStock
    ? "Out of stock"
    : isLowStock
      ? `Only ${product.stock} left`
      : "In stock";

  const stockClass = isOutOfStock
    ? "bg-red-600/10 text-red-600"
    : isLowStock
      ? "bg-amber-500/10 text-amber-600"
      : "bg-emerald-500/10 text-emerald-600";

  const categoryLabel = product.category.replaceAll("-", " ");
  const categoryGroup = primaryLinks.find((group) =>
    group.children?.some(
      (child) => child.slug.split("/").at(-1) === product.category,
    ),
  );
  const categoryLink = categoryGroup?.children?.find(
    (child) => child.slug.split("/").at(-1) === product.category,
  );

  const minimumOrder = Math.max(1, product.minimumOrderQuantity || 1);
  const maxQuantity =
    product.stock && product.stock > 0
      ? Math.max(product.stock, minimumOrder)
      : 99;

  const [quantity, setQuantity] = useState(minimumOrder);
  const [added, setAdded] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    if (!added) return;

    const timer = window.setTimeout(() => setAdded(false), 2000);
    return () => window.clearTimeout(timer);
  }, [added]);

  async function handleAddToCart() {
    setAddError(null);
    setAdded(false);

    if (!userId) {
      router.push(`/login?callbackUrl=/shop/products/${product.id}`);
      return;
    }

    try {
      await addToCart({
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          discountPercentage: product.discountPercentage,
          thumbnail: product.thumbnail,
        },
        quantity,
      });
      setAdded(true);
    } catch {
      setAddError("Could not add this product to your cart. Please try again.");
    }
  }

  const assurances = [
    {
      icon: ShieldCheck,
      label: "Warranty",
      value: product.warrantyInformation,
    },
    {
      icon: Truck,
      label: "Shipping",
      value: product.shippingInformation,
    },
    {
      icon: RotateCcw,
      label: "Returns",
      value: product.returnPolicy,
    },
    {
      icon: Package,
      label: "Minimum order",
      value: `${product.minimumOrderQuantity} item(s)`,
    },
  ];

  const specs = [
    { label: "Brand", value: product.brand || "—" },
    { label: "Category", value: categoryLabel },
    { label: "SKU", value: product.sku },
    { label: "Stock", value: `${product.stock ?? 0}` },
    { label: "Weight", value: `${product.weight}` },
    {
      label: "Dimensions",
      value: `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`,
    },
    { label: "Minimum order", value: `${product.minimumOrderQuantity}` },
    { label: "Barcode", value: product.meta.barcode },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mx-auto w-full max-w-360 px-4 py-6 sm:px-6 sm:py-8 lg:px-10"
    >
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Home
            </Link>
          </li>

          {categoryGroup && (
            <>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li>
                <Link
                  href={categoryGroup.slug ?? "/"}
                  className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {categoryGroup.title}
                </Link>
              </li>
            </>
          )}

          {categoryLink && (
            <>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li>
                <Link
                  href={categoryLink.slug}
                  className="capitalize transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {categoryLink.title}
                </Link>
              </li>
            </>
          )}

          <li aria-hidden="true">
            <ChevronRight className="size-3.5" />
          </li>
          <li className="min-w-0">
            <span className="line-clamp-1 font-medium text-foreground">
              {product.title}
            </span>
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 xl:gap-14">
        <ProductGallery product={product} />

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {product.brand && (
              <>
                <span>{product.brand}</span>
                <span aria-hidden="true">•</span>
              </>
            )}
            <span className="capitalize">{categoryLabel}</span>
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl xl:text-5xl">
            {product.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm font-semibold text-foreground">
              <Star
                className="size-4 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              {product.rating.toFixed(1)}
            </span>

            <span className="text-sm text-muted-foreground">
              {product.reviews.length} reviews
            </span>

            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${stockClass}`}
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-current"
              />
              {stockLabel}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-end gap-3">
            <span className="text-3xl font-bold text-foreground sm:text-4xl">
              {usd.format(finalPrice)}
            </span>

            {hasDiscount && (
              <span className="text-lg text-muted-foreground line-through">
                {usd.format(product.price)}
              </span>
            )}

            {hasDiscount && (
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                Save {discount}%
              </span>
            )}
          </div>

          <p className="mt-6 text-sm leading-7 text-muted-foreground sm:text-base">
            {product.description}
          </p>

          {product.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <li key={tag}>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                    <Tag className="size-3" aria-hidden="true" />
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {assurances.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex gap-3 flex-row">
            <div className="flex h-12 items-center justify-between rounded-xl border border-border bg-background px-1 sm:w-36">
              <button
                type="button"
                onClick={() => setQuantity((value) => value - 1)}
                disabled={isOutOfStock || quantity <= minimumOrder}
                aria-label="Decrease quantity"
                className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="size-4" aria-hidden="true" />
              </button>

              <span className="min-w-8 text-center text-sm font-semibold text-foreground">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                disabled={isOutOfStock || quantity >= maxQuantity}
                aria-label="Increase quantity"
                className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="size-4" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock || isAdding}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              {isAdding ? (
                <LoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <ShoppingBag className="size-4" aria-hidden="true" />
              )}
              <span aria-live="polite">
                {isOutOfStock
                  ? "Out of stock"
                  : isAdding
                    ? "Adding..."
                    : added
                      ? "Added to cart"
                      : userId
                        ? "Add to cart"
                        : "Sign in to add"}
              </span>
            </button>
          </div>

          {addError && (
            <p role="alert" className="mt-3 text-sm text-destructive">
              {addError}
            </p>
          )}

          <p className="mt-3 text-xs text-muted-foreground">
            Minimum order: {product.minimumOrderQuantity} item(s)
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-8 border-t border-border pt-10 lg:grid-cols-[0.9fr_1.1fr]">
        <section aria-labelledby="details-heading">
          <h2
            id="details-heading"
            className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            Product details
          </h2>

          <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between gap-3 border-b border-border/70 pb-2"
              >
                <dt className="shrink-0 text-sm text-muted-foreground">
                  {spec.label}
                </dt>
                <dd className="wrap-break-word text-right text-sm font-medium capitalize text-foreground">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="reviews-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2
                id="reviews-heading"
                className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
              >
                Customer reviews
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.reviews.length} verified reviews
              </p>
            </div>

            <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-semibold text-foreground">
              <Star
                className="size-4 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              {product.rating.toFixed(1)} / 5
            </span>
          </div>

          {product.reviews.length > 0 ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {product.reviews.map((review, index) => (
                <ReviewCard
                  key={`${review.reviewerEmail}-${review.date}-${index}`}
                  review={review}
                />
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-10 text-center text-sm text-muted-foreground">
              No reviews yet.
            </p>
          )}
        </section>
      </div>
    </motion.section>
  );
}

export default function Product({
  productId,
  userId,
}: {
  productId: number;
  userId: number | null;
}) {
  const { product, isLoading, isError } = useSingleProduct(productId);

  if (!Number.isInteger(productId) || productId <= 0) notFound();
  if (isError) notFound();
  if (isLoading) return <ProductSkeleton />;
  if (!product) notFound();

  return (
    <>
      <LoadingModel
        duration={800}
        key={product.id}
        message={`Loading ${product.title}`}
      />
      <ProductDetails product={product} userId={userId} />
    </>
  );
}
