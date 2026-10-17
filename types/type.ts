export type NavigationLink = {
  title: string;
  slug: string;
};

export type NavigationItem = {
  title: string;
  slug?: string;
  children?: NavigationLink[];
  image?: string;
};

export type CategoryItem = {
  id: string;
  title: string;
  image: string;
  href: string;
};

export type ProductDimensions = {
  width: number;
  height: number;
  depth: number;
};

export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type ProductMeta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string;
  stock?: number;
  availabilityStatus?: "In Stock" | "Low Stock" | "Out of Stock" | string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type FooterLink = {
  label: string;
  href?: string;
};
