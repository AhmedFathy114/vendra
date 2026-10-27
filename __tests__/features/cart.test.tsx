import { fireEvent, render, screen } from "@testing-library/react";
import Cart from "@/features/cart/cart";
import { useUserCart } from "@/hooks/queries/useUserCart";
import { cartFixture } from "@/test-utils/fixtures";

jest.mock("@/hooks/queries/useUserCart", () => ({
  useUserCart: jest.fn(),
}));

const mockUseUserCart = jest.mocked(useUserCart);

function mockCartState(overrides: Partial<ReturnType<typeof useUserCart>> = {}) {
  mockUseUserCart.mockReturnValue({
    cart: cartFixture,
    carts: [cartFixture],
    total: 1,
    isLoading: false,
    isError: false,
    error: null,
    isFetching: false,
    refetch: jest.fn(),
    ...overrides,
  } as ReturnType<typeof useUserCart>);
}

describe("Cart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCartState();
  });

  it("asks signed-out users to sign in", () => {
    render(<Cart userId={null} />);

    expect(
      screen.getByRole("heading", { name: "Sign in to view your cart" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "/login?callbackUrl=/cart",
    );
    expect(mockUseUserCart).toHaveBeenCalledWith(null);
  });

  it("renders the loading skeleton", () => {
    mockCartState({ cart: undefined, carts: [], total: 0, isLoading: true });

    render(<Cart userId={1} />);

    expect(
      screen.getByRole("status", { name: "Loading cart" }),
    ).toBeInTheDocument();
  });

  it("renders the error state and retries", () => {
    const refetch = jest.fn();
    mockCartState({
      cart: undefined,
      carts: [],
      total: 0,
      isError: true,
      error: new Error("Network failed"),
      refetch,
    });

    render(<Cart userId={1} />);

    expect(
      screen.getByRole("heading", { name: "Couldn't load your cart" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Network failed")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(refetch).toHaveBeenCalled();
  });

  it("renders the empty state", () => {
    mockCartState({
      cart: { ...cartFixture, products: [], totalProducts: 0, totalQuantity: 0 },
      carts: [],
      total: 0,
    });

    render(<Cart userId={1} />);

    expect(
      screen.getByRole("heading", { name: "Your cart is empty" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start shopping" })).toHaveAttribute(
      "href",
      "/shop/collection/best-seller",
    );
  });

  it("renders cart items and the order summary", () => {
    render(<Cart userId={1} />);

    expect(
      screen.getByRole("heading", { name: "Shopping cart" }),
    ).toBeInTheDocument();
    expect(screen.getByText("1 products")).toBeInTheDocument();
    expect(screen.getByText("2 items")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Test Product" }),
    ).toHaveLength(2);
    expect(
      screen.getByRole("heading", { name: "Order summary" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Continue shopping" }),
    ).toHaveAttribute("href", "/shop/collection/best-seller");
    expect(mockUseUserCart).toHaveBeenCalledWith(1);
  });

  it("shows the retrying state", () => {
    mockCartState({
      cart: undefined,
      carts: [],
      total: 0,
      isError: true,
      error: new Error("Network failed"),
      isFetching: true,
    });

    render(<Cart userId={1} />);

    expect(
      screen.getByRole("button", { name: "Retrying..." }),
    ).toBeDisabled();
  });
});
