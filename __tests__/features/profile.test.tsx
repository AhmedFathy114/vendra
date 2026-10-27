import { fireEvent, render, screen } from "@testing-library/react";
import { signOut } from "next-auth/react";
import Profile from "@/features/profile/profile";
import { useUserProfile } from "@/hooks/queries/useUserProfile";
import { profileFixture } from "@/test-utils/fixtures";

jest.mock("@/hooks/queries/useUserProfile", () => ({
  useUserProfile: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

jest.mock("@/components/Loaders/LoadingModel", () => ({
  __esModule: true,
  default: () => null,
}));

const mockUseUserProfile = jest.mocked(useUserProfile);
const mockSignOut = jest.mocked(signOut);

function mockProfileState(
  overrides: Partial<ReturnType<typeof useUserProfile>> = {},
) {
  mockUseUserProfile.mockReturnValue({
    profile: profileFixture,
    isLoading: false,
    isError: false,
    error: null,
    isFetching: false,
    refetch: jest.fn(),
    ...overrides,
  } as ReturnType<typeof useUserProfile>);
}

describe("Profile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockProfileState();
  });

  it("renders the profile details", () => {
    render(<Profile />);

    expect(screen.getByRole("heading", { name: "Profile" })).toBeInTheDocument();
    expect(screen.getAllByText("Emily Johnson").length).toBeGreaterThan(0);
    expect(screen.getAllByText("@emilys").length).toBeGreaterThan(0);
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "emily@example.com" })).toHaveAttribute(
      "href",
      "mailto:emily@example.com",
    );
    expect(screen.getByRole("link", { name: "+20 120 300 9255" })).toHaveAttribute(
      "href",
      "tel:+20 120 300 9255",
    );
    expect(
      screen.getByRole("heading", { name: "Personal information" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Address" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Work & education" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Cairo University")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("168 cm")).toBeInTheDocument();
    expect(screen.getByText("62.4 kg")).toBeInTheDocument();
  });

  it("logs out the user", () => {
    render(<Profile />);

    fireEvent.click(screen.getByRole("button", { name: "Log out" }));

    expect(mockSignOut).toHaveBeenCalledWith({ callbackUrl: "/login" });
  });

  it("renders the loading skeleton", () => {
    mockProfileState({ profile: undefined, isLoading: true });

    render(<Profile />);

    expect(
      screen.getByRole("status", { name: "Loading profile" }),
    ).toBeInTheDocument();
  });

  it("renders the error state and retries", () => {
    const refetch = jest.fn();
    mockProfileState({
      profile: undefined,
      isError: true,
      error: new Error("Network failed"),
      refetch,
    });

    render(<Profile />);

    expect(
      screen.getByRole("heading", { name: "Couldn't load your profile" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Network failed")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(refetch).toHaveBeenCalled();
  });
});
