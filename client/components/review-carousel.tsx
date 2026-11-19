"use client";

import { useState } from "react";
import type { CarReview } from "@/lib/cars";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StarRating } from "@/components/star-rating";

export function ReviewCarousel({ reviews }: { reviews: CarReview[] }) {
  const [active, setActive] = useState(0);
  const review = reviews[active];

  if (!review) return null;

  function move(direction: -1 | 1) {
    setActive((current) => (current + direction + reviews.length) % reviews.length);
  }

  return (
    <section aria-label="Owner reviews">
      <Card className="grid gap-8 bg-secondary p-6 sm:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
        <div>
          <h2 className="max-w-md text-3xl font-semibold leading-[1.05] tracking-[-0.055em] text-secondary-foreground text-balance sm:text-4xl">
            Owner reviews
          </h2>
          <div className="mt-7 flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon-lg"
              aria-label="Previous owner review"
              onClick={() => move(-1)}
              className="size-11 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10"
            >
              <span aria-hidden="true">←</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-lg"
              aria-label="Next owner review"
              onClick={() => move(1)}
              className="size-11 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10"
            >
              <span aria-hidden="true">→</span>
            </Button>
            <span className="ml-2 text-xs tabular-nums text-secondary-foreground/90" aria-live="polite">
              {String(active + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
            </span>
          </div>
        </div>
        <figure aria-live="polite" aria-atomic="true" className="min-w-0 border-t border-secondary-foreground/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <blockquote className="max-w-3xl wrap-anywhere text-xl leading-relaxed tracking-[-0.025em] text-secondary-foreground sm:text-2xl">
            “{review.content}”
          </blockquote>
          <figcaption className="mt-7 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="font-semibold text-secondary-foreground">{review.author}</span>
            <StarRating rating={review.rating} />
          </figcaption>
        </figure>
      </Card>
    </section>
  );
}
