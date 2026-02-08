import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import {
  tripTypes,
  contactInfo as defaultContactInfo,
} from "@/lib/data/constants";
import { getGlobal } from "@/lib/strapi/queries";
import CookiePreferencesButton from "@/components/layout/CookiePreferencesButton";
import NewsletterSignup from "@/components/layout/NewsletterSignup";

export default async function Footer() {
  const global = await getGlobal();

  // Always use canonical phone/email from constants; address from CMS or fallback
  const cmsContact = global?.attributes?.contactInfo;
  const contactInfo = {
    phone: defaultContactInfo.phone,
    email: defaultContactInfo.email,
    address: cmsContact?.address ?? defaultContactInfo.address,
  };

  const socialLinks = global?.attributes?.socialLinks || {
    instagram: "https://www.instagram.com/xplore.turkiye/",
    facebook: "https://www.facebook.com/xploreturkiyebe",
  };
  return (
    <footer className="border-t border-primary/20 bg-primary-dark text-white">
      <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              Xplore Turkiye & Beyond
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4">
              Wij gidsen je door het authentieke Turkije
            </p>
            <div className="flex space-x-4">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Reizen */}
          {/* <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Onze Reizen
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              {tripTypes.map((type) => (
                <li key={type.id}>
                  <Link
                    href={`/reizen/${type.id}`}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {type.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Meer Informatie
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/over-ons"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Over Ons
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <CookiePreferencesButton />
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Contact
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-center space-x-2 text-white/80">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2 text-white/80">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-white transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start space-x-2 text-white/80">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>
                  XPLORE TÜRKIYE
                  <br />
                  {contactInfo.address}
                </span>
              </li>
              <li className="text-white/60 text-xs italic mt-2">
                XPLORE TÜRKIYE is een gespecialiseerd merk binnen Selectair
                Willebroek Travel.
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-white/20">
          <div className="max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>

        {/* Logo */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <Link href="/">
            <Image
              src="/logo-white.png"
              alt="Xplore Turkiye & Beyond"
              width={320}
              height={60}
              className="h-auto w-[220px] sm:w-[260px] md:w-[280px] lg:w-[320px]"
            />
          </Link>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20 text-center text-xs sm:text-sm text-white/60 px-4">
          <p>
            © {new Date().getFullYear()} Xplore Turkiye & Beyond. Alle rechten
            voorbehouden.
          </p>
          <p className="mt-2">
            Website ontwikkeld door{" "}
            <a
              href="https://www.cshinedigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors underline"
            >
              C-Shine Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
