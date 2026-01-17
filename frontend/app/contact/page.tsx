import { getGlobal } from "@/lib/strapi/queries";
import ContactPageContent from "@/components/sections/ContactPageContent";
import { contactInfo } from "@/lib/data/constants";

export default async function ContactPage() {
  const global = await getGlobal();

  console.log("global", global);

  // Fallback to constants if Strapi data is not available
  const contactInfoData = global?.attributes?.contactInfo || {
    id: 0,
    phone: contactInfo.phone,
    email: contactInfo.email,
    address: contactInfo.address,
  };

  // Parse opening hours from Strapi if available, otherwise use defaults
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
