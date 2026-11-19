import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function StarRating({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) {
  const safeRating = Number.isFinite(rating) ? Math.min(5, Math.max(0, rating)) : 0;
  const filledStars = Math.round(safeRating);

  return (
    <span
      className="inline-flex shrink-0 items-center gap-0.5"
      role="img"
      aria-label={`${safeRating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < filledStars;

        return (
          <HugeiconsIcon
            key={index}
            icon={StarIcon}
            size={size}
            strokeWidth={1.8}
            className={filled ? "fill-primary text-primary" : "fill-transparent text-muted-foreground/55"}
          />
        );
      })}
    </span>
  );
}
