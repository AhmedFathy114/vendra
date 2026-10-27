import { render, screen } from "@testing-library/react";
import CartSummary from "@/features/cart/cart-summary";
import { cartFixture } from "@/test-utils/fixtures";

describe("CartSummary", () => {
  it("renders totals and product counts", () => {
    render(<CartSummary cart={cartFixture} />);

    expect(screen.getByRole("heading", { name: "Order summary" })).toBeInTheDocument();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("$200.00")).toBeInTheDocument();
    expect(screen.getByText("-$40.00")).toBeInTheDocument();
    expect(screen.getByText("$160.00")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Items")).toBeInTheDocument();
  });

  it("links back to the best seller collection", () => {
    render(<CartSummary cart={cartFixture} />);

    expect(
      screen.getByRole("link", { name: "Continue shopping" }),
    ).toHaveAttribute("href", "/shop/collection/best-seller");
    expect(
      screen.getByText("Checkout is not enabled in this demo."),
    ).toBeInTheDocument();
  });
});
