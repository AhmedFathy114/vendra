import { api } from "@/lib/axios";
import { ProductsResponse } from "@/types/type";

export async function getAllProducts(): Promise<ProductsResponse> {
  const response = await api.get<ProductsResponse>("/products");
  const data = response.data;
  return data;
}

export async function getBestProducts(
  sortBy: string,
  order: "asc" | "desc" = "desc",
): Promise<ProductsResponse> {
  const response = await api.get<ProductsResponse>("/products", {
    params: { sortBy, order },
  });
  const data = response.data;
  return data;
}

export async function getCategoryProducts(category: string) {
  const response = await api.get<ProductsResponse>(
    `/products/category/${category}`,
  );

  const data = response.data;
  return data;
}
