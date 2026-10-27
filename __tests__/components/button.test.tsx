import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders its label and handles clicks", () => {
    const handleClick = jest.fn();

    render(
      <Button type="button" onClick={handleClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save" });

    fireEvent.click(button);

    expect(button).toHaveClass("bg-primary");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the outline variant", () => {
    render(<Button variant="outline">Cancel</Button>);

    expect(screen.getByRole("button", { name: "Cancel" })).toHaveClass(
      "border-border",
    );
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();

    render(
      <Button type="button" disabled onClick={handleClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save" });

    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
