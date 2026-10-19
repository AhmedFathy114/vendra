import { api } from "@/lib/axios";
import { ProductsResponse } from "@/types/type";

export async function getAllProducts(): Promise<ProductsResponse> {
  const response = await api.get<ProductsResponse>("/products");
  const data = response.data;
  return data;
}

export async function getCollections(
  sortBy: string,
  order: string = "desc",
  limit = 20,
  skip = 0,
): Promise<ProductsResponse> {
  const response = await api.get<ProductsResponse>("/products", {
    params: { sortBy, order, limit, skip },
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
