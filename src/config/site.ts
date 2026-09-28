function optional(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

const phone = optional(process.env.NEXT_PUBLIC_CONTACT_PHONE);

export const siteConfig = {
  name: "TRIBRIZS",
  url: (optional(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://tribrizs.com").replace(/\/$/, ""),
  description:
    "Get personalized assistance with international flights and travel planning. Contact TRIBRIZS to explore flight options and travel services.",
  tagline: "International flight assistance and travel planning",
  contact: {
    /** Display format, e.g. "+1 (555) 010-2030". Null until a real number is configured. */
    phone,
    /** tel: href derived from the display number. */
    phoneHref: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null,
    email: optional(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    hours: optional(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
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
