import { MetadataRoute } from "next";

import {
  getAllDestinations,
} from "@/services/destination-service";

import {
  getAllBlogs,
} from "@/services/blog-service";

export default async function sitemap():
Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    "https://justtheroutes.com";

  const destinations =
    await getAllDestinations();

  const blogs =
    await getAllBlogs();

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/destinations",
    "/journal",
  ];

  const staticPages =
    staticRoutes.map((route) => ({
      url:
        `${baseUrl}${route}`,

      lastModified:
        new Date(),

      changeFrequency:
        "weekly" as const,

      priority:
        route === ""
          ? 1
          : 0.8,
    }));

  const destinationPages =
    destinations.map(
      (destination: any) => ({
        url:
          `${baseUrl}/destinations/${destination.slug}`,

        lastModified:
          new Date(),

        changeFrequency:
          "weekly" as const,

        priority: 0.9,
      })
    );

  const blogPages =
    blogs.map((post: any) => ({
      url:
        `${baseUrl}/journal/${post.slug}`,

      lastModified:
        new Date(),

      changeFrequency:
        "monthly" as const,

      priority: 0.7,
    }));

  return [
    ...staticPages,

    ...destinationPages,

    ...blogPages,
  ];
}