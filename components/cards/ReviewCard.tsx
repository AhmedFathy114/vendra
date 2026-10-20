import RatingStars from "@/features/product/RatingStars";
import { reviewDateFormatter } from "@/lib/utils";
import { ProductReview } from "@/types/type";

function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold uppercase text-foreground">
          {review.reviewerName.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {review.reviewerName}
          </p>
          <p className="text-xs text-muted-foreground">
            {reviewDateFormatter.format(new Date(review.date))}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <RatingStars rating={review.rating} />
      </div>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {review.comment}
      </p>
    </article>
  );
}

export default ReviewCard;
