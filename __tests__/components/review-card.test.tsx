import { render, screen } from "@testing-library/react";
import ReviewCard from "@/components/cards/ReviewCard";
import type { ProductReview } from "@/types/type";

const review: ProductReview = {
  rating: 4,
  comment: "Great product",
  date: "2026-01-15T12:00:00.000Z",
  reviewerName: "Mona Ali",
  reviewerEmail: "mona@example.com",
};

describe("ReviewCard", () => {
  it("renders the reviewer, date, rating, and comment", () => {
    render(<ReviewCard review={review} />);

    expect(screen.getByText("Mona Ali")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
    expect(screen.getByText("Jan 15, 2026")).toBeInTheDocument();
    expect(
      screen.getByLabelText("4.0 out of 5 stars"),
    ).toBeInTheDocument();
    expect(screen.getByText("Great product")).toBeInTheDocument();
  });
});
