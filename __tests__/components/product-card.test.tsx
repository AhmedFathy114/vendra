import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/cards/ProductCard";
import type { Product } from "@/types/type";

const product: Product = {
  id: 1,
  title: "Test Product",
  description: "A product used for testing.",
  category: "mens-shirts",
  price: 100,
  discountPercentage: 20,
  rating: 4.5,
  tags: ["test"],
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
  reviews: [],
  returnPolicy: "30 day return policy",
  minimumOrderQuantity: 1,
  meta: {
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    barcode: "123456789",
    qrCode: "https://example.com/qr.png",
  },
  images: ["https://cdn.dummyjson.com/product-images/test-product.webp"],
  thumbnail: "https://cdn.dummyjson.com/product-images/test-product.webp",
  stock: 10,
  availabilityStatus: "In Stock",
};

describe("ProductCard", () => {
  it("renders product details and the discounted price", () => {
    render(<ProductCard product={product} />);

    expect(
      screen.getByRole("link", { name: product.title }),
    ).toHaveAttribute("href", `/shop/products/${product.id}`);
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("-20%")).toBeInTheDocument();
    expect(screen.getByText("$80.00")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
    expect(screen.getByText("Shop now")).toBeInTheDocument();
  });

  it("shows the new badge and low stock message", () => {
    render(
      <ProductCard
        product={{
          ...product,
          stock: 4,
          availabilityStatus: "Low Stock",
        }}
        isNew
      />,
    );

    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Only 4 left")).toBeInTheDocument();
  });

  it("shows the sold out state for out-of-stock products", () => {
    render(
      <ProductCard
        product={{
          ...product,
          stock: 0,
          availabilityStatus: "Out of Stock",
        }}
        isNew
      />,
    );

    expect(screen.getByText("Out of stock")).toBeInTheDocument();
    expect(screen.getByText("Sold out")).toBeInTheDocument();
    expect(screen.queryByText("-20%")).not.toBeInTheDocument();
    expect(screen.queryByText("New")).not.toBeInTheDocument();
  });
});
