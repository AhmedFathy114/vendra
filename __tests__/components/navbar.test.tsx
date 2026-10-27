import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/AppLayout/navbar";
import { useUserCart } from "@/hooks/queries/useUserCart";
import { cartFixture } from "@/test-utils/fixtures";

jest.mock("@/components/theme/mode-toggle", () => ({
  ModeToggle: () => <button type="button">Toggle theme</button>,
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/hooks/queries/useUserCart", () => ({
  useUserCart: jest.fn(),
}));

const mockUseSession = useSession as jest.Mock;
const mockUseUserCart = useUserCart as jest.Mock;

describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSession.mockReturnValue({
      data: { user: { id: "1" } },
      status: "authenticated",
    });
    mockUseUserCart.mockReturnValue({
      cart: { ...cartFixture, totalQuantity: 0 },
    });
  });

  it("renders the primary and mobile navigation links", () => {
    render(<Navbar />);

    const primary = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    const mobile = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });

    expect(
      within(primary).getByRole("link", { name: "Electronics" }),
    ).toHaveAttribute("href", "/shop/electronics");
    expect(within(mobile).getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      within(mobile).getByRole("link", { name: "Account" }),
    ).toHaveAttribute("href", "/account");
    expect(within(mobile).getByRole("link", { name: "Cart" })).toHaveAttribute(
      "href",
      "/cart",
    );
  });

  it("opens the mobile menu and expands a submenu", async () => {
    render(<Navbar />);

    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );

    const dialog = await screen.findByRole("dialog");
    const mainNavigation = within(dialog).getByRole("navigation", {
      name: "Main navigation",
    });

    expect(
      within(mainNavigation).queryByRole("link", { name: "Smartphones" }),
    ).not.toBeInTheDocument();

    fireEvent.click(
      within(mainNavigation).getByRole("button", {
        name: "Toggle Electronics submenu",
      }),
    );

    expect(
      within(mainNavigation).getByRole("link", { name: "Smartphones" }),
    ).toHaveAttribute("href", "/shop/electronics/smartphones");
  });

  it("opens the menu from the categories button and closes it", async () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: "Open categories" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("shows the real cart quantity", () => {
    mockUseUserCart.mockReturnValue({
      cart: { ...cartFixture, totalQuantity: 3 },
    });

    render(<Navbar />);

    expect(
      screen.getByRole("link", { name: "Cart, 3 items" }),
    ).toHaveAttribute("href", "/cart");
    expect(
      within(
        screen.getByRole("navigation", { name: "Mobile navigation" }),
      ).getByText("3"),
    ).toBeInTheDocument();
    expect(mockUseUserCart).toHaveBeenCalledWith(1);
  });

  it("does not load a cart without a session", () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });

    render(<Navbar />);

    expect(mockUseUserCart).toHaveBeenCalledWith(null);
    expect(
      screen.queryByRole("link", { name: "Cart, 0 items" }),
    ).not.toBeInTheDocument();
  });
});
