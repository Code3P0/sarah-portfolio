import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the real domain in production so OG/Twitter
  // image URLs resolve absolutely; the fallback is a placeholder.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sarahgraves.com"),
  title: "Sarah Graves",
  description: "Guard at Texas. Building in sports, media, and AI.",
  openGraph: {
    type: "website",
    title: "Sarah Graves",
    description: "Guard at Texas. Building in sports, media, and AI.",
    images: [
      { url: "/images/sarah-graves-face-main.jpg", width: 1200, height: 630, alt: "Sarah Graves" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarah Graves",
    description: "Guard at Texas. Building in sports, media, and AI.",
    images: ["/images/sarah-graves-face-main.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {/* Without JS the IntersectionObserver never runs, so force scroll-reveal
            content visible instead of leaving sections blank. */}
        <noscript>
          <style>{`.reveal,.page-anim{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <Navigation />
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
