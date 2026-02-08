import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacyverklaring | XPLORE TÜRKIYE",
  description:
    "Privacyverklaring van XPLORE TÜRKIYE – hoe wij omgaan met persoonsgegevens op onze website, nieuwsbrief en contactformulieren.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
