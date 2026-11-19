"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

export function ActiveSiteHeader() {
  const pathname = usePathname();
  return <SiteHeader active={pathname === "/chat" ? "chat" : "inventory"} />;
}

export function SiteHeader({ active = "inventory" }: { active?: "inventory" | "chat" }) {
  return (
    <>
      <a href="#main-content" className="sr-only fixed left-4 top-4 z-50 rounded-[1.5rem] bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md focus:not-sr-only focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        Skip to content
      </a>
      <header className="site-chrome sticky top-0 z-30 shrink-0 border-b border-border/70">
        <div className="mx-auto flex min-h-[4.5rem] w-full max-w-[90rem] items-center justify-between gap-2 px-3 sm:gap-4 sm:px-8 lg:px-12">
          <Link href="/" aria-label="Nubcar home" className="group flex items-center gap-2.5 rounded-[1.25rem] text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="grid size-9 place-items-center rounded-[1rem] bg-primary/10 transition-colors duration-200 group-hover:bg-primary/15">
              <Image src="/cat.svg" alt="" width={24} height={24} aria-hidden="true" />
            </span>
            <span className="text-[1.08rem] font-semibold tracking-[-0.045em] max-[400px]:hidden">
              Nubcar
            </span>
          </Link>
          <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-2">
            <Link href="/" aria-current={active === "inventory" ? "page" : undefined} className={`${buttonVariants({ variant: active === "inventory" ? "secondary" : "ghost", size: "lg" })} min-h-10 px-2.5 text-sm max-[360px]:px-1 sm:px-3.5 sm:text-base ${active === "inventory" ? "font-semibold" : "font-medium text-muted-foreground"}`}>
              Browse
            </Link>
            <Link href="/chat" aria-current={active === "chat" ? "page" : undefined} className={`${buttonVariants({ variant: active === "chat" ? "secondary" : "ghost", size: "lg" })} min-h-10 px-2.5 text-sm max-[360px]:px-1 sm:px-3.5 sm:text-base ${active === "chat" ? "font-semibold" : "font-medium text-muted-foreground"}`}>
              Ask a question
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
    </>
  );
}
