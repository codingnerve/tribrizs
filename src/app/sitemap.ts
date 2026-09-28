import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/site";
import { airlines } from "@/data/airlines";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/airlines"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "yearly", priority: 0.8 },
    ...airlines.map((airline) => ({
      url: absoluteUrl(`/airlines/${airline.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: absoluteUrl("/privacy"), lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
