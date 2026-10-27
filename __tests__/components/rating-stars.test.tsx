import { render, screen } from "@testing-library/react";
import RatingStars from "@/features/product/RatingStars";

describe("RatingStars", () => {
  it("shows the rating and five stars", () => {
    const { container } = render(<RatingStars rating={4.3} />);

    expect(
      screen.getByLabelText("4.3 out of 5 stars"),
    ).toBeInTheDocument();
    expect(container.querySelectorAll("svg")).toHaveLength(5);
  });
});
