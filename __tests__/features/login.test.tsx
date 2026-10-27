import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { signIn } from "next-auth/react";
import Login from "@/features/auth/login";

const mockReplace = jest.fn();

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

const mockSignIn = jest.mocked(signIn);

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.history.replaceState({}, "", "/login");
  });

  it("renders the login form", () => {
    render(<Login />);

    expect(screen.getByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toHaveValue("emilys");
    expect(screen.getByLabelText("Password")).toHaveValue("emilyspass");
    expect(screen.getByRole("link", { name: "Create one" })).toHaveAttribute(
      "href",
      "/register",
    );
  });

  it("shows validation errors", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "short" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByText("Username is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Password must be at least 8 characters"),
    ).toBeInTheDocument();
    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it("shows an error for invalid credentials", async () => {
    mockSignIn.mockResolvedValue({
      error: "CredentialsSignin",
      code: "credentials",
      status: 401,
      ok: false,
      url: null,
    });

    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent("Invalid username or password. Please try again.");
    expect(mockSignIn).toHaveBeenCalledWith("credentials", {
      username: "emilys",
      password: "emilyspass",
      redirect: false,
    });
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("redirects to a relative callback URL after signing in", async () => {
    mockSignIn.mockResolvedValue({
      error: undefined,
      code: "success",
      status: 200,
      ok: true,
      url: "/cart",
    });
    window.history.replaceState({}, "", "/login?callbackUrl=%2Fcart%3Fpage%3D2");

    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/cart?page=2");
    });
  });

  it("accepts an absolute same-origin callback URL", async () => {
    mockSignIn.mockResolvedValue({
      error: undefined,
      code: "success",
      status: 200,
      ok: true,
      url: "/account",
    });
    const callbackUrl = encodeURIComponent(`${window.location.origin}/account`);
    window.history.replaceState(
      {},
      "",
      `/login?callbackUrl=${callbackUrl}`,
    );

    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/account");
    });
  });

  it("ignores an external callback URL", async () => {
    mockSignIn.mockResolvedValue({
      error: undefined,
      code: "success",
      status: 200,
      ok: true,
      url: "/account",
    });
    window.history.replaceState(
      {},
      "",
      "/login?callbackUrl=https%3A%2F%2Fevil.example%2Faccount",
    );

    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/account");
    });
  });

  it("falls back to the account page without a callback URL", async () => {
    mockSignIn.mockResolvedValue({
      error: undefined,
      code: "success",
      status: 200,
      ok: true,
      url: "/account",
    });

    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/account");
    });
  });
});
