"use client";

import { useAllProducts } from "@/hooks/queries/useAllProducts";
import { HeroSlider } from "../carousal/HeroSlider";
import { HeroCategory } from "./HeroCategory";

function Home() {
  const { Products } = useAllProducts();
  console.log(Products);
  return (
    <>
      <HeroSlider />
      <HeroCategory />
    </>
  );
}

export default Home;
