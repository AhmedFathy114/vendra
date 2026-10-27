import { api } from "@/lib/axios";
import { Product, ProductsResponse } from "@/types/type";

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

export async function getCategoryProducts(
  category: string,
  limit = 20,
  skip = 0,
) {
  const response = await api.get<ProductsResponse>(
    `/products/category/${category}`,
    {
      params: {
        limit,
        skip,
      },
    },
  );

  const data = response.data;
  return data;
}

export async function getSingleProduct(productId: number): Promise<Product> {
  const response = await api.get(`/products/${productId}`);
  const data = response.data;
  return data;
}

export async function getSearchProduct(
  title: string,
  limit = 20,
  skip = 0,
): Promise<ProductsResponse> {
  const response = await api.get(`/products/search?q=${title}`, {
    params: {
      limit,
      skip,
    },
  });
  const data = response.data;
  return data;
}
