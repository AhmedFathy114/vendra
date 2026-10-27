import { fireEvent, render, screen } from "@testing-library/react";
import ProductGallery from "@/features/product/ProductGallery";
import { productFixture } from "@/test-utils/fixtures";

describe("ProductGallery", () => {
  it("renders the main image and switches thumbnails", () => {
    render(<ProductGallery product={productFixture} />);

    const firstImage = screen.getByRole("button", { name: "View image 1" });
    const secondImage = screen.getByRole("button", { name: "View image 2" });

    expect(firstImage).toHaveAttribute("aria-pressed", "true");
    expect(secondImage).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();

    fireEvent.click(secondImage);

    expect(firstImage).toHaveAttribute("aria-pressed", "false");
    expect(secondImage).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByAltText("Test Product").getAttribute("src")).toContain(
      "2.webp",
    );
  });

  it("shows the discount badge for a product on sale", () => {
    render(<ProductGallery product={productFixture} />);

    expect(screen.getByText("-20%")).toBeInTheDocument();
  });

  it("shows the out-of-stock badge instead of the discount", () => {
    render(
      <ProductGallery
        product={{
          ...productFixture,
          stock: 0,
          availabilityStatus: "Out of Stock",
        }}
      />,
    );

    expect(screen.getByText("Out of stock")).toBeInTheDocument();
    expect(screen.queryByText("-20%")).not.toBeInTheDocument();
  });
});
