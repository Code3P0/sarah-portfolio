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
  title: "Sarah Graves",
  description: "Texas Women's Basketball player building at the intersection of sports, media, and technology.",
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
