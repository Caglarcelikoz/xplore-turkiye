import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

const showComingSoon = process.env.NEXT_PUBLIC_SHOW_COMING_SOON === 'true';

export const metadata: Metadata = {
  title: showComingSoon
    ? "Xplore Turkiye & Beyond | Binnenkort beschikbaar"
    : "Xplore Turkiye & Beyond | Groepsreizen en Maatwerk Reizen",
  description: showComingSoon
    ? "We werken hard aan een geweldige reiservaring voor jou. Blijf op de hoogte!"
    : "Ontdek de mooiste reizen naar Turkije. Groepsreizen, maatwerk reizen, self drives en citytrips. Persoonlijk reisadvies en begeleiding bij elke stap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={inter.className} suppressHydrationWarning>
        {!showComingSoon && <Header />}
        <main className="min-h-screen">{children}</main>
        {!showComingSoon && <Footer />}
      </body>
    </html>
  );
}
