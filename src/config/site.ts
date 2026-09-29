function optional(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

const defaultPhone = "+1 (877) 370-5969";
const phone = optional(process.env.NEXT_PUBLIC_CONTACT_PHONE) ?? defaultPhone;
const defaultEmail = "support@tribrizs.com";
const email = optional(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? defaultEmail;
const defaultGtagId = "AW-18481256480";
const gtagId = optional(process.env.NEXT_PUBLIC_GTAG_ID) ?? defaultGtagId;

export const siteConfig = {
  name: "TRIBRIZS",
  gtagId,
  url: (optional(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://tribrizs.com").replace(/\/$/, ""),
  description:
    "Get personalized assistance with international flights and travel planning. Contact TRIBRIZS to explore flight options and travel services.",
  tagline: "International flight assistance and travel planning",
  contact: {
    /** Display format, e.g. "+1 (877) 370-5969" */
    phone,
    /** tel: href derived from the display number. */
    phoneHref: phone
      ? `tel:${phone.replace(/[^\d+]/g, "").startsWith("+") ? phone.replace(/[^\d+]/g, "") : `+${phone.replace(/[^\d]/g, "")}`}`
      : null,
    email,
    hours: optional(process.env.NEXT_PUBLIC_BUSINESS_HOURS) ?? "24/7 Phone Assistance",
  },
  company: {
    legalName: "Travolie.com, LLC",
    attention: "Privacy Compliance Team",
    country: "United States",
  },
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Airlines", href: "/airlines" },
  { label: "Contact Us", href: "/contact" },
] as const;

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

/** "Talk to an agent" goes straight to a call when a number is configured. */
export const agentHref = siteConfig.contact.phoneHref ?? "/contact";
