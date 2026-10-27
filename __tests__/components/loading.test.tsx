import { render, screen } from "@testing-library/react";
import Loading from "@/components/Loaders/Loading";

describe("Loading", () => {
  it("renders the brand and tagline", () => {
    render(<Loading />);

    expect(screen.getByText("VEN")).toBeInTheDocument();
    expect(screen.getByText("DRA")).toBeInTheDocument();
    expect(screen.getByText("Your style, your world")).toBeInTheDocument();
  });

  it("applies the exiting state", () => {
    const { container } = render(<Loading isExiting />);

    expect(container.firstChild).toHaveClass("opacity-0");
  });
});
