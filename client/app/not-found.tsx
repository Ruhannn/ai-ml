import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100dvh-4.5rem)] bg-background text-foreground">
      <main id="main-content" className="mx-auto w-full max-w-[90rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-balance sm:text-6xl">Page not found</h1>
        <p className="mt-5 max-w-lg leading-7 text-muted-foreground">We couldn’t find that page. Browse the car collection instead.</p>
        <Link href="/" className="mt-7 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
          Back to the collection
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
