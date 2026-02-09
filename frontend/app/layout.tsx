import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/layout/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
  preload: true,
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
  adjustFontFallback: true,
});

const showComingSoon = process.env.NEXT_PUBLIC_SHOW_COMING_SOON === 'true';

export const metadata: Metadata = {
  title: showComingSoon
    ? "Xplore Turkiye & Beyond | Binnenkort beschikbaar"
    : "Xplore Turkiye & Beyond | Groepsreizen en Maatwerk Reizen",
  description: showComingSoon
    ? "We werken hard aan een geweldige reiservaring voor jou. Blijf op de hoogte!"
    : "Ontdek de mooiste reizen naar Turkije. Groepsreizen, maatwerk reizen, self drives en citytrips. Persoonlijk reisadvies en begeleiding bij elke stap.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#294d54",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-heading antialiased" suppressHydrationWarning>
        {!showComingSoon && <Header />}
        <main className="min-h-screen">{children}</main>
        {!showComingSoon && <Footer />}
        {!showComingSoon && <CookieConsent />}
      </body>
    </html>
  );
}
