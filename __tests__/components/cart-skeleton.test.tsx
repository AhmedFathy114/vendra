import { render, screen } from "@testing-library/react";
import CartSkeleton from "@/features/cart/cart-skeleton";

describe("CartSkeleton", () => {
  it("renders the loading status", () => {
    render(<CartSkeleton />);

    const status = screen.getByRole("status", { name: "Loading cart" });

    expect(status).toBeInTheDocument();
    expect(screen.getByText("Loading cart")).toBeInTheDocument();
  });
});
