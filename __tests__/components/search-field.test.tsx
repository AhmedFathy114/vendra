import { render, screen } from "@testing-library/react";
import { SearchField } from "@/components/AppLayout/right-section";

describe("SearchField", () => {
  it("renders the search form and input", () => {
    render(<SearchField className="w-52" />);

    const form = screen.getByRole("search");

    expect(form).toHaveAttribute("action", "/shop/products/search");
    expect(form).toHaveClass("w-52");
    expect(
      screen.getByRole("searchbox", { name: "Search products" }),
    ).toHaveAttribute("name", "title");
    expect(
      screen.getByPlaceholderText("I'm looking for..."),
    ).toBeInTheDocument();
  });
});
