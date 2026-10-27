import { fireEvent, render, screen, within } from "@testing-library/react";
import Pagination from "@/features/shared/Pagination";

describe("Pagination", () => {
  it("highlights the current page and changes pages", () => {
    const onPageChange = jest.fn();

    render(
      <Pagination
        page={2}
        total={50}
        limit={10}
        onPageChange={onPageChange}
      />,
    );

    const navigation = screen.getByRole("navigation", {
      name: "Pagination",
    });

    expect(navigation).toHaveTextContent("Page 2 of 5");
    expect(
      within(navigation).getByRole("button", { name: "Page 2" }),
    ).toHaveAttribute("aria-current", "page");

    fireEvent.click(
      within(navigation).getByRole("button", { name: "Next page" }),
    );

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables the previous button on the first page", () => {
    const onPageChange = jest.fn();

    render(
      <Pagination
        page={1}
        total={50}
        limit={10}
        onPageChange={onPageChange}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Page 5" }));

    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  it("renders nothing when there is only one page", () => {
    const { container } = render(
      <Pagination
        page={1}
        total={10}
        limit={10}
        onPageChange={jest.fn()}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("disables every button when disabled", () => {
    render(
      <Pagination
        page={3}
        total={50}
        limit={10}
        onPageChange={jest.fn()}
        disabled
      />,
    );

    screen.getAllByRole("button").forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
