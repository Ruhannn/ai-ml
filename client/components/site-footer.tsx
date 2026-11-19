import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <div>
          <Link href="/" className="font-semibold tracking-[-0.04em] text-foreground">
            Nubcar
          </Link>
          <p className="mt-1.5 text-base text-muted-foreground">Car listings, specs, and owner reviews.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-base text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">Browse cars</Link>
          <Link href="/chat" className="transition-colors hover:text-foreground">Ask a question</Link>
        </nav>
      </div>
    </footer>
  );
}
