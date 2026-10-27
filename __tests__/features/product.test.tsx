import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import Product from "@/features/product/Product";
import { useAddToCart } from "@/hooks/queries/useAddToCart";
import { useSingleProduct } from "@/hooks/queries/useSingleProduct";
import { productFixture } from "@/test-utils/fixtures";

const mockPush = jest.fn();
const mockNotFound = jest.fn();
const mockAddToCart = jest.fn();

jest.mock("@/hooks/queries/useSingleProduct", () => ({
  useSingleProduct: jest.fn(),
}));

jest.mock("@/hooks/queries/useAddToCart", () => ({
  useAddToCart: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  notFound: () => mockNotFound(),
}));

const mockUseSingleProduct = jest.mocked(useSingleProduct);
const mockUseAddToCart = jest.mocked(useAddToCart);

function mockProductState(product = productFixture) {
  mockUseSingleProduct.mockReturnValue({
    product,
    isLoading: false,
    isError: false,
  });
}

function mockCartState(isAdding = false) {
  mockUseAddToCart.mockReturnValue({
    addToCart: mockAddToCart,
    isAdding,
    isError: false,
    error: null,
  } as unknown as ReturnType<typeof useAddToCart>);
}

describe("Product", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockProductState();
    mockCartState();
    mockAddToCart.mockResolvedValue(undefined);
  });

  it("renders the product details", () => {
    render(<Product productId={1} userId={1} />);

    expect(
      screen.getByRole("heading", { name: "Test Product" }),
    ).toBeInTheDocument();
    expect(screen.getByText("In stock")).toBeInTheDocument();
    expect(screen.getByText("$80.00")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
    expect(screen.getByText("Save 20%")).toBeInTheDocument();
    expect(screen.getByText("A product used for testing.")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to cart" })).toBeEnabled();
    expect(mockUseSingleProduct).toHaveBeenCalledWith(1);
    expect(mockUseAddToCart).toHaveBeenCalledWith(1);
  });

  it("adds the selected quantity to the cart", async () => {
    render(<Product productId={1} userId={1} />);

    fireEvent.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith({
        product: {
          id: productFixture.id,
          title: productFixture.title,
          price: productFixture.price,
          discountPercentage: productFixture.discountPercentage,
          thumbnail: productFixture.thumbnail,
        },
        quantity: 2,
      });
    });
    expect(await screen.findByText("Added to cart")).toBeInTheDocument();
  });

  it("sends signed-out users to login", () => {
    render(<Product productId={1} userId={null} />);

    fireEvent.click(screen.getByRole("button", { name: "Sign in to add" }));

    expect(mockPush).toHaveBeenCalledWith(
      "/login?callbackUrl=/shop/products/1",
    );
    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  it("disables adding an out-of-stock product", () => {
    mockProductState({
      ...productFixture,
      stock: 0,
      availabilityStatus: "Out of Stock",
    });

    render(<Product productId={1} userId={1} />);

    expect(screen.getAllByText("Out of stock").length).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: "Out of stock" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Increase quantity" }),
    ).toBeDisabled();
  });

  it("shows low stock", () => {
    mockProductState({
      ...productFixture,
      stock: 4,
      availabilityStatus: "Low Stock",
    });

    render(<Product productId={1} userId={1} />);

    expect(screen.getByText("Only 4 left")).toBeInTheDocument();
  });

  it("shows an error when adding to the cart fails", async () => {
    mockAddToCart.mockRejectedValue(new Error("failed"));

    render(<Product productId={1} userId={1} />);
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Could not add this product to your cart. Please try again.",
    );
  });

  it("starts at the minimum order quantity", () => {
    mockProductState({ ...productFixture, minimumOrderQuantity: 3 });

    render(<Product productId={1} userId={1} />);

    const quantityControl = screen.getByRole("button", {
      name: "Decrease quantity",
    }).parentElement;

    expect(within(quantityControl as HTMLElement).getByText("3")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Decrease quantity" }),
    ).toBeDisabled();
  });

  it("shows the adding state", () => {
    mockCartState(true);

    render(<Product productId={1} userId={1} />);

    expect(screen.getByRole("button", { name: "Adding..." })).toBeDisabled();
  });
});
