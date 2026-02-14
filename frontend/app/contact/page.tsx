import { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import { generateSEOMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact | Xplore Turkiye & Beyond",
  description: "Neem contact op met Xplore Turkiye voor vragen over reizen naar Turkije, prijsopgave of een reis op maat.",
  path: "/contact",
  image: "/og-contact.jpg", // Will fall back to /og-default.jpg if not available
});

export default function ContactPage() {
  return <ContactSection showHero={true} />;
}
