import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { url: "/", priority: 1, changeFrequency: "weekly" as const },
    { url: "/oferta", priority: 0.9, changeFrequency: "monthly" as const },
    {
      url: "/odbiory-mieszkan-krakow",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    { url: "/kontakt", priority: 0.7, changeFrequency: "yearly" as const },
    {
      url: "/polityka-prywatnosci",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
  ];

  return routes.map((route) => ({
    url: `${site.url}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
