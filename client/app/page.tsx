import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { AdviceAccordion } from "@/components/advice-accordion";
import { CarImage } from "@/components/car-image";
import { HomeMotion } from "@/components/home-motion";
import { ReviewCarousel } from "@/components/review-carousel";
import { SiteFooter } from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice, getCars } from "@/lib/cars";

export default async function Page() {
  await connection();

  let cars;
  try {
    cars = await getCars();
  } catch {
    return (
      <div className="min-h-[calc(100dvh-4.5rem)] bg-background text-foreground">
        <main id="main-content" className="mx-auto w-full max-w-[90rem] px-5 py-24 sm:px-8 lg:px-12">
          <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-balance sm:text-6xl">Inventory unavailable</h1>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
            Try again in a moment, or ask us a question about a car.
          </p>
          <Link href="/chat" className={`${buttonVariants({ size: "lg" })} mt-8 px-6 py-5 text-sm`}>
            Ask a question
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const reviews = cars.flatMap((car) => car.reviews ?? []);
  const featuredCar = cars[1] ?? cars[0];

  return (
    <div className="min-h-[calc(100dvh-4.5rem)] overflow-x-hidden bg-background text-foreground">
      <main id="main-content" data-home-page className="w-full max-w-full overflow-x-hidden">
        <HomeMotion />

        <section className="relative isolate mx-auto grid w-full max-w-[90rem] gap-10 px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14 lg:px-12 lg:pb-36 lg:pt-24">
          <div className="page-grain absolute inset-0 -z-10" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-24 top-12 -z-10 size-80 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
              <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
              Cars, specs, owner reviews
            </p>
            <h1 className="max-w-5xl text-[clamp(3.25rem,6.3vw,6.6rem)] font-semibold leading-[0.99] tracking-[-0.075em] text-balance">
              Find your next{" "}
              {featuredCar?.imageUrl ? (
                <Image
                  src={featuredCar.imageUrl}
                  alt=""
                  width={136}
                  height={72}
                  unoptimized
                  priority
                  aria-hidden="true"
                  className="inline-block h-[0.56em] w-[1.08em] -translate-y-[0.04em] rounded-md object-cover align-middle"
                />
              ) : null}{" "}
              car.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Browse car prices and specs, read owner reviews, and ask questions before a test drive.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="#collection" className={`${buttonVariants({ size: "lg" })} min-h-12 px-6 text-sm`}>
                Explore the collection
              </Link>
              <Link href="/chat" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring">
                Ask a question <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
              </Link>
            </div>
          </div>

          {featuredCar ? (
            <Link
              href={`/cars/${featuredCar.id}`}
              className="group min-w-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <CarImage
                src={featuredCar.imageUrl}
                alt={featuredCar.name}
                sizes="(min-width: 1024px) 55vw, 100vw"
                priority
                reveal
                imageClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                className="aspect-[16/11] w-full rounded-lg bg-muted shadow-md sm:aspect-[16/10]"
              />
              <div className="flex items-center justify-between gap-4 px-1 pt-5">
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold tracking-[-0.025em]">{featuredCar.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{featuredCar.year} · {featuredCar.bodyType} · {featuredCar.fuelType}</p>
                </div>
                <span className="shrink-0 text-sm font-semibold tabular-nums">{formatPrice(featuredCar.price)}</span>
              </div>
            </Link>
          ) : (
            <div className="flex min-h-80 flex-col justify-between rounded-lg border border-border bg-secondary p-8 sm:min-h-[28rem] sm:p-10">
              <span className="h-px w-9 bg-primary/60" aria-hidden="true" />
              <div>
                <p className="max-w-md text-3xl font-semibold leading-tight tracking-[-0.05em] text-secondary-foreground sm:text-4xl">
                  Tell us what you need in a car.
                </p>
                <Link href="/chat" className="mt-6 w-fit text-base font-semibold text-secondary-foreground underline underline-offset-4">
                  Ask a question
                </Link>
              </div>
            </div>
          )}
        </section>

        <section
          id="collection"
          aria-labelledby="inventory-heading"
          className="mx-auto w-full max-w-[90rem] scroll-mt-28 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12 lg:pb-40"
        >
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-border/80 pb-5 sm:mb-12 sm:pb-7">
            <div>
              <h2 id="inventory-heading" className="text-3xl font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
                Cars in the collection
              </h2>
            </div>
            <p className="pb-1 text-base tabular-nums text-muted-foreground">
              {cars.length} {cars.length === 1 ? "car" : "cars"}
            </p>
          </div>

          {cars.length > 0 ? (
            <div className="grid grid-flow-dense grid-cols-12 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
              {cars.map((car, index) => {
                const tabletLastRow = cars.length % 2 === 1 && index === cars.length - 1;
                const desktopRemainder = cars.length % 3;
                const desktopLastRow = desktopRemainder > 0 && index >= cars.length - desktopRemainder;
                const desktopSpan = desktopRemainder === 1 ? "lg:col-span-12" : "lg:col-span-6";

                return (
                  <Link
                    key={car.id}
                    href={`/cars/${car.id}`}
                    className={`group col-span-12 min-w-0 rounded-lg outline-none transition-transform duration-200 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:col-span-6 lg:col-span-4 ${
                      tabletLastRow ? "sm:col-span-12" : ""
                    } ${desktopLastRow ? desktopSpan : ""}`}
                  >
                    <Card className="h-full gap-0 overflow-hidden py-0 transition-[border-color,box-shadow] duration-200 hover:border-primary/25 hover:shadow-md">
                      <CarImage
                        src={car.imageUrl}
                        alt={car.name}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        reveal
                        imageClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        className={`aspect-[16/10] w-full bg-muted ${desktopLastRow && desktopRemainder === 1 ? "lg:aspect-[2.2/1]" : ""}`}
                      />
                      <CardHeader className="flex min-h-44 flex-1 flex-col gap-3 p-4 sm:min-h-48 sm:p-5">
                        <CardTitle className="line-clamp-2 min-h-14 min-w-0 text-xl font-semibold leading-7 tracking-tight">
                          {car.name}
                        </CardTitle>
                        <p className="flex flex-wrap items-center gap-x-2 text-sm leading-6 text-muted-foreground sm:text-base">
                          {car.year} <span aria-hidden="true">·</span> {car.bodyType} <span aria-hidden="true">·</span> {car.fuelType}
                        </p>
                        <div className="mt-auto flex items-center justify-between gap-4 border-t border-border/70 pt-4">
                          <span className="text-sm font-medium text-muted-foreground sm:text-base">Price</span>
                          <span className="shrink-0 text-lg font-semibold tracking-tight tabular-nums sm:text-xl">
                            {formatPrice(car.price)}
                          </span>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg bg-secondary px-6 py-10 sm:px-10">
              <p className="text-lg font-medium text-secondary-foreground">No cars are listed.</p>
              <p className="mt-2 text-base leading-7 text-secondary-foreground/90">Ask about a car you’re considering.</p>
              <Link href="/chat" className="mt-5 inline-flex text-sm font-semibold text-secondary-foreground underline underline-offset-4">Ask a question</Link>
            </div>
          )}
        </section>

        <section className="mx-auto w-full max-w-[90rem] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12 lg:pb-40" aria-labelledby="approach-heading">
          <div className="mb-9 max-w-2xl sm:mb-12">
            <h2 id="approach-heading" className="text-3xl font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
              What you can check
            </h2>
          </div>
          <AdviceAccordion cars={cars} />
        </section>

        {reviews.length > 0 && (
          <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
            <ReviewCarousel reviews={reviews} />
          </div>
        )}

        <section className="mx-auto w-full max-w-[90rem] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
          <div className="relative isolate overflow-hidden rounded-lg bg-primary px-6 py-10 text-primary-foreground sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="page-grain absolute inset-0 -z-10" aria-hidden="true" />
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-semibold leading-[1.04] tracking-[-0.06em] text-balance sm:text-5xl">
                  Have a question about a car?
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-primary-foreground/85">
                  Ask about its specs, owner reviews, or what to check on a test drive.
                </p>
              </div>
              <Link href="/chat" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-[1.5rem] bg-background px-6 text-sm font-semibold text-foreground outline-none transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-4 focus-visible:ring-offset-primary">
                Ask a question <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
