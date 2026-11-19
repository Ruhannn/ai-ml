import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { QueryProvider } from "@/components/query-provider";
import { ActiveSiteHeader, SiteHeader } from "@/components/site-header";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Nubcar — cars, specs, and owner reviews",
    template: "%s | Nubcar",
  },
  description: "Browse cars, check specs, read owner reviews, and ask questions before a test drive.",
  openGraph: {
    title: "Nubcar — cars, specs, and owner reviews",
    description: "Browse cars, check specs, read owner reviews, and ask questions before a test drive.",
    siteName: "Nubcar",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${newsreader.variable} antialiased`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <Suspense fallback={<SiteHeader />}>
              <ActiveSiteHeader />
            </Suspense>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
