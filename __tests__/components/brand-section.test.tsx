import { render, screen } from "@testing-library/react";
import { BrandSection } from "@/components/AppLayout/brand-section";

describe("BrandSection", () => {
  it("renders the Vendra link", () => {
    render(<BrandSection />);

    const link = screen.getByRole("link", { name: "Vendra home" });

    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveTextContent("Vendra");
  });
});
