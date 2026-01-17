import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xplore Turkiye & Beyond | Groepsreizen en Maatwerk Reizen",
  description:
    "Ontdek de mooiste reizen naar Turkije. Groepsreizen, maatwerk reizen, self drives en citytrips. Persoonlijk reisadvies en begeleiding bij elke stap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
