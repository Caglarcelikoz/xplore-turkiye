import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | XPLORE TÜRKIYE | Selectair Willebroek Travel",
  description:
    "Disclaimer van XPLORE TÜRKIYE – algemene informatie, aansprakelijkheid, externe links en intellectuele eigendomsrechten.",
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
