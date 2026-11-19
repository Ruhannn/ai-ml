"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type AdviceImage = {
  name: string;
  imageUrl: string | null;
};

const steps = [
  {
    title: "Check the listing",
    description: "See the year, body style, fuel type, price, and features listed for each car.",
  },
  {
    title: "Read owner reviews",
    description: "See written reviews and star ratings on each car’s detail page.",
  },
  {
    title: "Ask a question",
    description: "Compare cars in chat or prepare questions for a test drive.",
  },
];

export function AdviceAccordion({ cars }: { cars: AdviceImage[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex min-h-[24rem] flex-col gap-3 md:h-[29rem] md:flex-row">
      {steps.map((step, index) => {
        const car = cars[index % Math.max(cars.length, 1)];
        const expanded = active === index;
        const photoOnDesktop = Boolean(car?.imageUrl && cars.length >= steps.length);
        const showImage = Boolean(car?.imageUrl && (expanded || photoOnDesktop));

        return (
          <Button
            key={step.title}
            type="button"
            variant="outline"
            aria-expanded={expanded}
            aria-label={`${step.title}${expanded ? ", expanded" : ", collapsed"}`}
            onClick={() => setActive(index)}
            className={`group relative isolate flex h-auto min-h-24 w-full overflow-hidden rounded-[1.5rem] border p-6 text-left whitespace-normal transition-[flex,background-color,border-color,box-shadow] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 md:min-h-0 md:p-7 ${
              expanded
                ? `border-primary/40 bg-card shadow-md md:flex-[3.2] ${
                    car?.imageUrl ? "bg-transparent hover:bg-transparent hover:text-white" : ""
                  }`
                : `border-border/70 bg-card shadow-sm hover:border-primary/30 hover:bg-muted/60 md:flex-1 ${
                    photoOnDesktop ? "md:bg-transparent md:hover:bg-transparent md:hover:text-white" : ""
                  }`
            }`}
          >
            {showImage && car?.imageUrl && (
              <Image
                src={car.imageUrl}
                alt={car.name}
                fill
                unoptimized
                sizes="(min-width: 768px) 45vw, 100vw"
                className={`absolute inset-0 -z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                  expanded ? "" : "hidden md:block"
                }`}
              />
            )}
            {showImage && car?.imageUrl && (
              <span
                className={`absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/10 ${
                  expanded ? "" : "hidden md:block"
                }`}
                aria-hidden="true"
              />
            )}
            <span className={`flex w-full flex-col justify-between gap-8 ${expanded && car?.imageUrl ? "text-white" : "text-foreground"}`}>
              <span className={`h-px w-9 ${
                expanded && car?.imageUrl
                  ? "bg-white/60"
                  : photoOnDesktop
                    ? "bg-primary/45 md:bg-white/60"
                    : "bg-primary/45"
              }`} aria-hidden="true" />
              <span className="flex items-end justify-between gap-4">
                <span className="min-w-0">
                  <span className={`block text-2xl font-semibold leading-tight tracking-tight sm:text-3xl ${
                    showImage && cars.length >= steps.length ? "md:text-white" : ""
                  }`}>
                    {step.title}
                  </span>
                  {expanded && (
                    <span className={`mt-4 block max-w-md text-base leading-7 ${
                      car?.imageUrl ? "text-white/95" : "text-muted-foreground"
                    }`}>
                      {step.description}
                    </span>
                  )}
                </span>
                <span aria-hidden="true" className={`mb-1 grid size-10 shrink-0 place-items-center rounded-md border border-current/30 text-xl transition-transform duration-300 group-hover:translate-x-1 ${
                  showImage && cars.length >= steps.length ? "md:text-white" : ""
                }`}>
                  →
                </span>
              </span>
            </span>
          </Button>
        );
      })}
    </div>
  );
}
