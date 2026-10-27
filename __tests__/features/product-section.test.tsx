import { fireEvent, render, screen } from "@testing-library/react";
import ProductSection from "@/features/shared/ProductSection";
import { productFixture } from "@/test-utils/fixtures";

const soldOutProduct = {
  ...productFixture,
  id: 2,
  title: "Sold Out Product",
  price: 50,
  stock: 0,
  availabilityStatus: "Out of Stock",
};

const cheapProduct = {
  ...productFixture,
  id: 3,
  title: "Cheap Product",
  price: 20,
  discountPercentage: 0,
  rating: 3,
};

const products = [productFixture, soldOutProduct, cheapProduct];

function productLinks() {
  return screen
    .getAllByRole("link")
    .filter((link) => link.getAttribute("href")?.startsWith("/shop/products/"));
}

describe("ProductSection", () => {
  it("renders products with the section title", () => {
    render(
      <ProductSection
        title="test-products"
        data={products}
        isError={false}
        isLoading={false}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "test products" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Test Product" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Sold Out Product" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Cheap Product" }),
    ).toBeInTheDocument();
  });

  it("sorts products by price", () => {
    render(
      <ProductSection
        title="products"
        data={products}
        isError={false}
        isLoading={false}
      />,
    );

    fireEvent.change(screen.getByLabelText("Sort products"), {
      target: { value: "price-asc" },
    });

    expect(productLinks().map((link) => link.getAttribute("href"))).toEqual([
      "/shop/products/3",
      "/shop/products/2",
      "/shop/products/1",
    ]);
  });

  it("filters products by availability", () => {
    render(
      <ProductSection
        title="products"
        data={products}
        isError={false}
        isLoading={false}
      />,
    );

    fireEvent.change(screen.getByLabelText("Filter by availability"), {
      target: { value: "out-of-stock" },
    });

    expect(
      screen.getByRole("link", { name: "Sold Out Product" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Test Product" }),
    ).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Filter by availability"), {
      target: { value: "in-stock" },
    });

    expect(
      screen.getByRole("link", { name: "Test Product" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Cheap Product" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Sold Out Product" }),
    ).not.toBeInTheDocument();
  });

  it("resets filters", () => {
    render(
      <ProductSection
        title="products"
        data={products}
        isError={false}
        isLoading={false}
      />,
    );

    fireEvent.change(screen.getByLabelText("Filter by availability"), {
      target: { value: "out-of-stock" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    expect(productLinks()).toHaveLength(3);
  });

  it("shows the error state", () => {
    render(
      <ProductSection
        title="products"
        data={[]}
        isError
        isLoading={false}
      />,
    );

    expect(
      screen.getByText("Couldn't load products. Please try again later."),
    ).toBeInTheDocument();
  });

  it("shows the empty state", () => {
    render(
      <ProductSection
        title="products"
        data={[]}
        isError={false}
        isLoading={false}
      />,
    );

    expect(screen.getByText("No products found in products.")).toBeInTheDocument();
  });
});
