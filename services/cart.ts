import { api } from "@/lib/axios";
import type { Cart, CartProductInput, UserCartsResponse } from "@/types/cart";

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

function normalizeCart(cart: Cart): Cart {
  const products = cart.products.map((product) => ({
    ...product,
    discountedTotal: roundMoney(
      product.discountedTotal ??
        product.total * (1 - product.discountPercentage / 100),
    ),
  }));

  return {
    ...cart,
    products,
    total: roundMoney(
      products.reduce((sum, product) => sum + product.total, 0),
    ),
    discountedTotal: roundMoney(
      products.reduce((sum, product) => sum + product.discountedTotal, 0),
    ),
    totalProducts: products.length,
    totalQuantity: products.reduce((sum, product) => sum + product.quantity, 0),
  };
}

export async function getCartById(cartId: number): Promise<Cart> {
  const response = await api.get<Cart>(`/carts/${cartId}`);
  return normalizeCart(response.data);
}

export async function getUserCarts(userId: number): Promise<UserCartsResponse> {
  const response = await api.get<UserCartsResponse>(`/carts/user/${userId}`);

  return {
    ...response.data,
    carts: response.data.carts.map(normalizeCart),
  };
}

export async function updateCart(
  cartId: number,
  products: CartProductInput[],
): Promise<Cart> {
  const response = await api.put<Cart>(`/carts/${cartId}`, {
    merge: true,
    products,
  });

  return normalizeCart(response.data);
}

export async function createCart(
  userId: number,
  products: CartProductInput[],
): Promise<Cart> {
  const response = await api.post<Cart>("/carts/add", {
    userId,
    products,
  });

  return normalizeCart(response.data);
}
