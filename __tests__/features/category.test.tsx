import { render, screen } from "@testing-library/react";
import Category from "@/features/category/category";

jest.mock("@/features/category/SubCategorySection", () => ({
  __esModule: true,
  default: ({ subCategory }: { subCategory: { title: string } }) => (
    <section aria-label={subCategory.title}>Subcategory section</section>
  ),
}));

jest.mock("@/components/Loaders/LoadingModel", () => ({
  __esModule: true,
  default: () => null,
}));

describe("Category", () => {
  it("renders the category and its subcategories", () => {
    render(<Category category="electronics" />);

    expect(
      screen.getByRole("heading", { name: "Electronics" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Smartphones/ }),
    ).toHaveAttribute("href", "/shop/electronics/smartphones");
    expect(
      screen.getByRole("link", { name: /Laptops/ }),
    ).toHaveAttribute("href", "/shop/electronics/laptops");
    expect(screen.getAllByText("Subcategory section")).toHaveLength(4);
  });

  it("renders the not-found state for an unknown category", () => {
    render(<Category category="unknown" />);

    expect(
      screen.getByRole("heading", { name: "Category not found" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
