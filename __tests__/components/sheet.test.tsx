import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

describe("Sheet", () => {
  it("opens and closes the panel", async () => {
    render(
      <Sheet>
        <SheetTrigger>Open menu</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <p>Sheet body</p>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.queryByText("Sheet body")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Sheet body")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});
