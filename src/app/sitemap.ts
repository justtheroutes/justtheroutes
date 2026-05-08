import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://justtheroutes.com",
      lastModified: new Date(),
    },

    {
      url:
        "https://justtheroutes.com/login",
      lastModified: new Date(),
    },
  ];
}