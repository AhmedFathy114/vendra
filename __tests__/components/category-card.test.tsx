import { render, screen } from "@testing-library/react";
import CategoryCard from "@/components/cards/categoryCard";
import type { NavigationItem } from "@/types/type";

const category: NavigationItem = {
  title: "Electronics",
  slug: "/shop/electronics",
  image: "https://cdn.dummyjson.com/product-images/electronics.webp",
};

describe("CategoryCard", () => {
  it("renders the category link, image, and title", () => {
    render(<CategoryCard category={category} y={24} />);

    const link = screen.getByRole("link", { name: /Electronics/ });

    expect(link).toHaveAttribute("href", "/shop/electronics");
    expect(screen.getByAltText("Electronics")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Electronics" })).toBeInTheDocument();
  });

  it("falls back to the home link when no slug is provided", () => {
    render(<CategoryCard category={{ ...category, slug: undefined }} y={24} />);

    expect(screen.getByRole("link", { name: /Electronics/ })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
