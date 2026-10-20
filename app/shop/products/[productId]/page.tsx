import Product from "@/features/product/Product";
import { getQueryClient } from "@/lib/get-query-client";
import { prefetchProduct } from "@/services/prefetche/prefetchProduct";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

async function Page({ params }: { params: Promise<{ productId: string }> }) {
  const { productId: productIdParam } = await params;
  const productId = Number(productIdParam);

  if (!Number.isInteger(productId) || productId <= 0) notFound();

  const queryClient = getQueryClient();

  await prefetchProduct(queryClient, productId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Product productId={productId} />
    </HydrationBoundary>
  );
}

export default Page;
