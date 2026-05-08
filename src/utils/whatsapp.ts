import { siteConfig } from "@/config/site";

export function getWhatsappLink(
  customMessage?: string
) {
  const message =
    customMessage ||
    siteConfig.whatsappMessage;

  return `https://wa.me/${
    siteConfig.contact.whatsapp
  }?text=${encodeURIComponent(message)}`;
}