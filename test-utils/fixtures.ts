import type { RegisterResponse, UserProfile } from "@/types/auth";
import type { Cart } from "@/types/cart";
import type { Product } from "@/types/type";

export const productFixture: Product = {
  id: 1,
  title: "Test Product",
  description: "A product used for testing.",
  category: "mens-shirts",
  price: 100,
  discountPercentage: 20,
  rating: 4.5,
  tags: ["test", "shirt"],
  brand: "Acme",
  sku: "TEST-001",
  weight: 1,
  dimensions: {
    width: 10,
    height: 10,
    depth: 10,
  },
  warrantyInformation: "1 year warranty",
  shippingInformation: "Ships in 2 days",
  reviews: [
    {
      rating: 5,
      comment: "Very good product.",
      date: "2026-01-02T00:00:00.000Z",
      reviewerName: "Jane Doe",
      reviewerEmail: "jane@example.com",
    },
  ],
  returnPolicy: "30 day return policy",
  minimumOrderQuantity: 1,
  meta: {
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    barcode: "123456789",
    qrCode: "https://example.com/qr.png",
  },
  images: [
    "https://cdn.dummyjson.com/product-images/test-product/1.webp",
    "https://cdn.dummyjson.com/product-images/test-product/2.webp",
  ],
  thumbnail: "https://cdn.dummyjson.com/product-images/test-product/1.webp",
  stock: 10,
  availabilityStatus: "In Stock",
};

export const cartFixture: Cart = {
  id: 1,
  products: [
    {
      id: 1,
      title: "Test Product",
      price: 100,
      quantity: 2,
      total: 200,
      discountPercentage: 20,
      discountedTotal: 160,
      thumbnail: "https://cdn.dummyjson.com/product-images/test-product/1.webp",
    },
  ],
  total: 200,
  discountedTotal: 160,
  userId: 1,
  totalProducts: 1,
  totalQuantity: 2,
};

export const profileFixture: UserProfile = {
  id: 1,
  username: "emilys",
  email: "emily@example.com",
  firstName: "Emily",
  lastName: "Johnson",
  age: 30,
  gender: "female",
  birthDate: "1996-01-15T00:00:00.000Z",
  image: "https://cdn.dummyjson.com/avatars/1.webp",
  phone: "+20 120 300 9255",
  address: {
    address: "12 Nile Street",
    city: "Cairo",
    state: "Cairo",
    stateCode: "C",
    postalCode: "11511",
    country: "Egypt",
  },
  role: "admin",
  company: {
    department: "Engineering",
    name: "Vendra",
    title: "Frontend Developer",
    address: {
      address: "5 Tahrir Square",
      city: "Cairo",
      state: "Cairo",
      stateCode: "C",
      postalCode: "11511",
      country: "Egypt",
    },
  },
  university: "Cairo University",
  height: 168.4,
  weight: 62.35,
  bloodGroup: "O+",
  eyeColor: "brown",
  hair: {
    color: "black",
    type: "straight",
  },
};

export const registerResponseFixture: RegisterResponse = {
  id: 101,
  firstName: "Emily",
  lastName: "Johnson",
  username: "emilys",
  email: "emily@example.com",
  role: "user",
};
