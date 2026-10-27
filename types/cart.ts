export type CartProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
};

export type Cart = {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};

export type CartProductInput = {
  id: number;
  quantity: number;
};

export type UserCartsResponse = {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
};
