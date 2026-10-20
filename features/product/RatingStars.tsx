import { Star } from "lucide-react";

function RatingStars({ rating }: { rating: number }) {
  return (
    <span
      className="flex items-center gap-0.5"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`size-3.5 ${
            index < Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default RatingStars;
