"use client";

import { useAllProducts } from "@/hooks/queries/useAllProducts";
import { HeroSlider } from "./HeroSlider";
import { HeroCategory } from "./HeroCategory";
import ReusableSection from "@/components/shared/ReusableSection";
import ProductCard from "@/components/cards/ProductCard";
import { Product } from "@/types/type";
import { useBestProduct } from "@/hooks/queries/useBestProduct";
import { useCategoryProduct } from "@/hooks/queries/useCategoryProduct";
import LoadingModel from "@/components/Loaders/LoadingModel";

function Home() {
  const { Products } = useAllProducts();
  const { bestProduct } = useBestProduct();
  const { categoryProducts: smartPhones } = useCategoryProduct("smartphones");
  const { categoryProducts: menShirts } = useCategoryProduct("mens-shirts");
  const { categoryProducts: womenDresses } =
    useCategoryProduct("womens-dresses");
  const { categoryProducts: furniture } = useCategoryProduct("furniture");
  const newArrivals = [...(Products?.products ?? [])]
    .sort(
      (a, b) =>
        new Date(b.meta.createdAt).getTime() -
        new Date(a.meta.createdAt).getTime(),
    )
    .slice(0, 10);

  return (
    <>
      <LoadingModel message="Loading Home Page"/>
      <HeroSlider />
      <HeroCategory />

      <ReusableSection<Product>
        title="new arrivals"
        viewAllHref="/collection/new-arrival"
        render={(product) => <ProductCard product={product} key={product.id} />}
        data={newArrivals}
        getKey={(product) => product.id}
      />

      <ReusableSection<Product>
        title="Best Seller"
        viewAllHref="/collection/best-seller"
        render={(product) => <ProductCard product={product} key={product.id} />}
        data={bestProduct?.products.slice(0, 10) ?? []}
        getKey={(product) => product.id}
      />

      <ReusableSection<Product>
        title="smart phones"
        viewAllHref="/shop/smartphones"
        render={(product) => <ProductCard product={product} key={product.id} />}
        data={smartPhones?.products.slice(0, 10) ?? []}
        getKey={(product) => product.id}
      />

      <ReusableSection<Product>
        title="mens shirts"
        viewAllHref="/shop/mens-shirts"
        render={(product) => <ProductCard product={product} key={product.id} />}
        data={menShirts?.products.slice(0, 10) ?? []}
        getKey={(product) => product.id}
      />

      <ReusableSection<Product>
        title="womens dresses"
        viewAllHref="/shop/womens-dresses"
        render={(product) => <ProductCard product={product} key={product.id} />}
        data={womenDresses?.products.slice(0, 30) ?? []}
        getKey={(product) => product.id}
      />

      <ReusableSection<Product>
        title="furniture"
        viewAllHref="/shop/furniture"
        render={(product) => <ProductCard product={product} key={product.id} />}
        data={furniture?.products.slice(0, 30) ?? []}
        getKey={(product) => product.id}
      />
    </>
  );
}

export default Home;
