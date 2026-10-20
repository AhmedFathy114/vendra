import Image from "next/image";
import { useState } from "react";
import type { Product as ProductType } from "@/types/type";

function ProductGallery({ product }: { product: ProductType }) {
  const images = Array.from(
    new Set([product.thumbnail, ...product.images].filter(Boolean)),
  );
  const [activeImage, setActiveImage] = useState(images[0]);

  const discount = Math.round(product.discountPercentage ?? 0);
  
  const isOutOfStock =
    product.availabilityStatus === "Out of Stock" || product.stock === 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-muted/30">
        <Image
          src={activeImage}
          alt={product.title}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-6 sm:p-10"
        />

        <div className="pointer-events-none absolute inset-s-4 top-4 flex flex-col items-start gap-2">
          {isOutOfStock ? (
            <span className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
              Out of stock
            </span>
          ) : (
            discount > 0 && (
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                -{discount}%
              </span>
            )
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(image)}
              aria-label={`View image ${index + 1}`}
              aria-pressed={activeImage === image}
              className={`relative aspect-square overflow-hidden rounded-xl border bg-muted/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeImage === image
                  ? "border-foreground ring-2 ring-foreground/15"
                  : "border-border hover:border-foreground/40"
              }`}
            >
              <Image
                src={image}
                alt={`${product.title} thumbnail ${index + 1}`}
                fill
                sizes="120px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
