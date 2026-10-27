import { fireEvent, render, screen } from "@testing-library/react";
import { ModeToggle } from "@/components/theme/mode-toggle";

const mockSetTheme = jest.fn();

jest.mock("next-themes", () => ({
  useTheme: () => ({ setTheme: mockSetTheme }),
}));

describe("ModeToggle", () => {
  it("opens the theme menu", () => {
    render(<ModeToggle />);

    fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));

    expect(screen.getByRole("menuitem", { name: "Light" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Dark" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "System" })).toBeInTheDocument();
  });

  it("changes the theme", () => {
    render(<ModeToggle />);

    fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Dark" }));

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});
