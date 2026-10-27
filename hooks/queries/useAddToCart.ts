"use client";

import { createCart, getUserCarts, updateCart } from "@/services/cart";
import type { Cart, CartProduct, UserCartsResponse } from "@/types/cart";
import type { Product } from "@/types/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddToCartProduct = Pick<
  Product,
  "id" | "title" | "price" | "discountPercentage" | "thumbnail"
>;

type AddToCartInput = {
  product: AddToCartProduct;
  quantity: number;
};

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

function createCartProduct(
  product: AddToCartProduct,
  quantity: number,
): CartProduct {
  const total = roundMoney(product.price * quantity);

  return {
    ...product,
    quantity,
    total,
    discountedTotal: roundMoney(
      total * (1 - product.discountPercentage / 100),
    ),
  };
}

function recalculateCart(cart: Cart, products: CartProduct[]): Cart {
  return {
    ...cart,
    products,
    total: roundMoney(products.reduce((sum, product) => sum + product.total, 0)),
    discountedTotal: roundMoney(
      products.reduce((sum, product) => sum + product.discountedTotal, 0),
    ),
    totalProducts: products.length,
    totalQuantity: products.reduce(
      (sum, product) => sum + product.quantity,
      0,
    ),
  };
}

function addProductToCart(
  cart: Cart,
  product: AddToCartProduct,
  quantity: number,
): Cart {
  const existing = cart.products.find((item) => item.id === product.id);

  if (!existing) {
    return recalculateCart(cart, [
      ...cart.products,
      createCartProduct(product, quantity),
    ]);
  }

  const nextQuantity = existing.quantity + quantity;
  const nextTotal = roundMoney(existing.price * nextQuantity);
  const nextDiscountedTotal = roundMoney(
    nextTotal * (1 - existing.discountPercentage / 100),
  );

  return recalculateCart(
    cart,
    cart.products.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: nextQuantity,
            total: nextTotal,
            discountedTotal: nextDiscountedTotal,
          }
        : item,
    ),
  );
}

export function useAddToCart(userId: number | null) {
  const queryClient = useQueryClient();

  const {
    mutateAsync: addToCart,
    isPending: isAdding,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ product, quantity }: AddToCartInput) => {
      if (!userId) {
        throw new Error("Please sign in to add products to your cart.");
      }

      const queryKey = ["user-cart", userId];
      const cartData =
        queryClient.getQueryData<UserCartsResponse>(queryKey) ??
        (await queryClient.fetchQuery({
          queryKey,
          queryFn: () => getUserCarts(userId),
        }));

      if (!cartData) {
        throw new Error("Could not load your cart.");
      }

      const cart = cartData.carts.at(0);
      const products = [{ id: product.id, quantity }];

      return cart
        ? updateCart(cart.id, products)
        : createCart(userId, products);
    },
    onSuccess: (updatedCart, { product, quantity }) => {
      if (!userId) return;

      queryClient.setQueryData<UserCartsResponse>(
        ["user-cart", userId],
        (current) => {
          const currentCart = current?.carts.at(0);

          if (!current || !currentCart) {
            return {
              carts: [updatedCart],
              total: 1,
              skip: 0,
              limit: 1,
            };
          }

          const nextCart = addProductToCart(currentCart, product, quantity);

          return {
            ...current,
            carts: current.carts.map((cart) =>
              cart.id === nextCart.id ? nextCart : cart,
            ),
          };
        },
      );
    },
  });

  return { addToCart, isAdding, isError, error };
}
