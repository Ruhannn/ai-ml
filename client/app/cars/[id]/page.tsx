import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarImage } from "@/components/car-image";
import { StarRating } from "@/components/star-rating";
import { SiteFooter } from "@/components/site-footer";
import { ReviewSummary } from "@/components/review-summary";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice, getCar } from "@/lib/cars";

export default function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<DetailLoading />}>
      <CarDetails params={params} />
    </Suspense>
  );
}

function DetailLoading() {
  return (
    <div className="min-h-[calc(100dvh-4.5rem)] bg-background text-foreground">
      <main id="main-content" className="mx-auto w-full max-w-[90rem] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mb-7 h-4 w-24 animate-pulse rounded bg-muted motion-reduce:animate-none" />
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="aspect-[4/3] animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
          <div className="space-y-4">
            <div className="h-4 w-36 animate-pulse rounded bg-muted motion-reduce:animate-none" />
            <div className="h-12 w-3/4 animate-pulse rounded bg-muted motion-reduce:animate-none" />
            <div className="h-6 w-28 animate-pulse rounded bg-muted motion-reduce:animate-none" />
            <div className="h-20 w-full animate-pulse rounded bg-muted motion-reduce:animate-none" />
          </div>
        </div>
      </main>
    </div>
  );
}

async function CarDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let car;
  try {
    car = await getCar(id);
  } catch {
    return (
      <div className="min-h-[calc(100dvh-4.5rem)] bg-background text-foreground">
        <main id="main-content" className="mx-auto w-full max-w-[90rem] px-5 py-24 sm:px-8 lg:px-12">
          <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Car unavailable</h1>
          <p className="mt-3 text-muted-foreground">We couldn’t load this listing. Please try again later.</p>
          <Link href="/" className="mt-7 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
            Back to cars
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!car) notFound();

  const features = car.features
    .split(";")
    .map((feature) => feature.trim())
    .filter(Boolean);
  const averageRating = car.reviews?.length
    ? car.reviews.reduce((total, review) => total + review.rating, 0) / car.reviews.length
    : null;

  return (
    <div className="min-h-[calc(100dvh-4.5rem)] bg-background text-foreground">
      <main id="main-content" className="mx-auto w-full max-w-[90rem] px-5 pb-24 pt-8 sm:px-8 sm:pb-32 lg:px-12">
        <Link
          href="/"
          className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          <span aria-hidden="true">←</span> All cars
        </Link>

        <div className="grid gap-9 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-16">
          <CarImage
            src={car.imageUrl}
            alt={car.name}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            imageClassName="object-cover"
            className="aspect-[4/3] overflow-hidden rounded-lg bg-muted shadow-md"
          />
          <div className="lg:py-8">
            <p className="text-sm font-medium text-muted-foreground">
              {car.year} · {car.bodyType} · {car.fuelType}
            </p>
            <h1 className="mt-4 max-w-2xl wrap-anywhere text-5xl font-semibold leading-[0.98] tracking-[-0.065em] text-balance sm:text-6xl">
              {car.name}
            </h1>
            <p className="mt-6 text-3xl font-semibold tracking-[-0.045em] tabular-nums sm:text-4xl">{formatPrice(car.price)}</p>
            <p className="mt-4 max-w-prose wrap-anywhere text-base leading-7 text-muted-foreground">
              {car.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="#reviews" className={`${buttonVariants({ size: "lg" })} min-h-12 px-6 text-sm`}>
                Owner reviews
              </Link>
              <Link href="/chat" className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
                Ask about this car
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-x-6">
              <div className="border-t border-border/80 py-4">
                <dt className="text-sm text-muted-foreground">Year</dt>
                <dd className="mt-1.5 text-base font-semibold tabular-nums">{car.year}</dd>
              </div>
              <div className="border-t border-border/80 py-4">
                <dt className="text-sm text-muted-foreground">Fuel type</dt>
                <dd className="mt-1.5 text-base font-semibold">{car.fuelType}</dd>
              </div>
              <div className="border-t border-border/80 py-4">
                <dt className="text-sm text-muted-foreground">Body style</dt>
                <dd className="mt-1.5 text-base font-semibold">{car.bodyType}</dd>
              </div>
              {averageRating !== null && (
                <div className="border-t border-border/80 py-4">
                  <dt className="text-sm text-muted-foreground">Owner rating</dt>
                  <dd className="mt-1 flex items-center">
                    <StarRating rating={averageRating} />
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <section
          id="reviews"
          className="mt-24 scroll-mt-28 border-t border-border/80 pt-12 sm:mt-32 sm:pt-16"
          aria-labelledby="reviews-heading"
        >
          <div className="mb-8">
            <h2 id="reviews-heading" className="text-3xl font-semibold tracking-[-0.055em] sm:text-5xl">
              Owner reviews
            </h2>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-muted-foreground">
              <span>{car.reviews?.length ?? 0} reviews</span>
              {averageRating !== null && (
                <span className="inline-flex items-center gap-1.5 font-medium tabular-nums text-foreground">
                  <StarRating rating={averageRating} />
                </span>
              )}
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-16">
            <div>
              {car.reviews?.length ? (
                <div className="divide-y divide-border/80 border-y border-border/80">
                  {car.reviews.map((review) => (
                    <article key={review.id} className="py-6 first:pt-5">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-base font-semibold">{review.author}</h3>
                        <p className="flex items-center">
                          <StarRating rating={review.rating} />
                        </p>
                      </div>
                      <p className="mt-3 max-w-3xl wrap-anywhere text-base leading-7 text-muted-foreground">
                        {review.content}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="border-y border-border/80 py-6 text-base text-muted-foreground">
                  There are no owner reviews yet.
                </p>
              )}
            </div>
            {/* TODO: */}
            <ReviewSummary carId={car.id} reviewCount={car.reviews?.length ?? 0} />
          </div>
        </section>

        <section className="mt-24 border-t border-border/80 pt-12 sm:mt-32 sm:pt-16" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-3xl font-semibold tracking-[-0.055em] sm:text-5xl">
            Specs and features
          </h2>
          {features.length > 0 ? (
            <ul className="mt-8 divide-y divide-border/80 border-y border-border/80 sm:grid sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {features.map((feature) => (
                <li key={feature} className="min-w-0 wrap-anywhere py-4 text-base leading-7 sm:px-5 sm:first:pl-0">
                  {feature}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-base text-muted-foreground">No feature details are listed.</p>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
