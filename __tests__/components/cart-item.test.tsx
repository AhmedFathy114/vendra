import { render, screen } from "@testing-library/react";
import CartItem from "@/features/cart/cart-item";
import type { CartProduct } from "@/types/cart";

const item: CartProduct = {
  id: 1,
  title: "Test Product",
  price: 50,
  quantity: 2,
  total: 100,
  discountPercentage: 10,
  discountedTotal: 90,
  thumbnail: "https://cdn.dummyjson.com/product-images/test-product.webp",
};

describe("CartItem", () => {
  it("renders the item details and discounted total", () => {
    render(<CartItem item={item} />);

    const links = screen.getAllByRole("link", { name: item.title });

    expect(links).toHaveLength(2);
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", `/shop/products/${item.id}`);
    });
    expect(screen.getByText("Qty 2")).toBeInTheDocument();
    expect(screen.getByText("$50.00 each")).toBeInTheDocument();
    expect(screen.getByText("-10%")).toBeInTheDocument();
    expect(screen.getByText("$90.00")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("hides the discount badge when there is no discount", () => {
    render(
      <CartItem
        item={{
          ...item,
          discountPercentage: 0,
          total: 100,
          discountedTotal: 100,
        }}
      />,
    );

    expect(screen.queryByText("-0%")).not.toBeInTheDocument();
    expect(screen.getAllByText("$100.00")).toHaveLength(1);
  });
});
