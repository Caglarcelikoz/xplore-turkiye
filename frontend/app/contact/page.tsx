import { staticGlobal } from "@/lib/data/static-content";
import ContactPageContent from "@/components/sections/ContactPageContent";

export default function ContactPage() {
  // Use static global data
  const global = staticGlobal;
  const contactInfoData = global.attributes.contactInfo!;

  // Parse opening hours from static data
  const openingHours = contactInfoData.openingHours
    ? Array.isArray(contactInfoData.openingHours)
      ? contactInfoData.openingHours
      : []
    : undefined;

  return (
    <ContactPageContent
      contactInfo={contactInfoData}
      openingHours={openingHours}
    />
  );
}
