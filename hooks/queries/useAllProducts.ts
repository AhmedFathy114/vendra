import { getAllProducts } from "@/services/products";
import { useQuery } from "@tanstack/react-query";

export function useAllProducts() {
  const { data: Products, isPending: isLoading } = useQuery({
    queryKey: ["All-products"],
    queryFn: getAllProducts,
  });

  return { Products, isLoading };
}
