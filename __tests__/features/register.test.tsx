import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Register from "@/features/auth/register";
import { useRegister } from "@/hooks/queries/useRegister";
import { registerResponseFixture } from "@/test-utils/fixtures";

jest.mock("@/hooks/queries/useRegister", () => ({
  useRegister: jest.fn(),
}));

const mockUseRegister = jest.mocked(useRegister);
const mockRegisterUser = jest.fn();

function mockRegisterState(
  overrides: Partial<ReturnType<typeof useRegister>> = {},
) {
  mockUseRegister.mockReturnValue({
    registeredUser: undefined,
    registerUser: mockRegisterUser,
    isRegistering: false,
    isError: false,
    error: null,
    ...overrides,
  } as ReturnType<typeof useRegister>);
}

function fillForm() {
  fireEvent.change(screen.getByLabelText("First name"), {
    target: { value: "Emily" },
  });
  fireEvent.change(screen.getByLabelText("Last name"), {
    target: { value: "Johnson" },
  });
  fireEvent.change(screen.getByLabelText("Username"), {
    target: { value: "emilys" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "emily@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Confirm password"), {
    target: { value: "password123" },
  });
}

describe("Register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRegisterState();
  });

  it("renders the registration form", () => {
    render(<Register />);

    expect(
      screen.getByRole("heading", { name: "Create account" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "/login",
    );
  });

  it("shows required field errors", async () => {
    render(<Register />);

    fireEvent.click(screen.getByRole("button", { name: "Create account" }));

    expect(await screen.findByText("First name is required")).toBeInTheDocument();
    expect(await screen.findByText("Last name is required")).toBeInTheDocument();
    expect(await screen.findByText("Username is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Please confirm your password"),
    ).toBeInTheDocument();
    expect(mockRegisterUser).not.toHaveBeenCalled();
  });

  it("rejects mismatched passwords", async () => {
    render(<Register />);
    fillForm();
    fireEvent.change(screen.getByLabelText("Confirm password"), {
      target: { value: "different123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create account" }));

    expect(await screen.findByText("Passwords do not match")).toBeInTheDocument();
    expect(mockRegisterUser).not.toHaveBeenCalled();
  });

  it("submits the registration data", async () => {
    mockRegisterUser.mockResolvedValue(registerResponseFixture);

    render(<Register />);
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "Create account" }));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith({
        firstName: "Emily",
        lastName: "Johnson",
        username: "emilys",
        email: "emily@example.com",
        password: "password123",
      });
    });
  });

  it("shows an error when registration fails", async () => {
    mockRegisterUser.mockRejectedValue(new Error("registration failed"));

    render(<Register />);
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "Create account" }));

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent("Could not create your account. Please try again.");
  });

  it("disables the submit button while registering", () => {
    mockRegisterState({ isRegistering: true });

    render(<Register />);

    expect(
      screen.getByRole("button", { name: "Creating account..." }),
    ).toBeDisabled();
  });

  it("shows the success state", () => {
    mockRegisterState({ registeredUser: registerResponseFixture });

    render(<Register />);

    expect(
      screen.getByRole("heading", { name: "Account created" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Thanks, Emily/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go to sign in" })).toHaveAttribute(
      "href",
      "/login",
    );
  });
});
