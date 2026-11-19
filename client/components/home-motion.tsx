"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>("[data-home-page]");
    if (!root) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      root.querySelectorAll<HTMLElement>("[data-scroll-image]").forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 0.82, opacity: 0.4 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top 95%",
              end: "bottom 78%",
              scrub: true,
            },
          },
        );
      });
    });

    return () => media.revert();
  });

  return null;
}
