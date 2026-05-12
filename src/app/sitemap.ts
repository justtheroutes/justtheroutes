import { MetadataRoute } from "next";

import {
  getAllDestinations,
} from "@/services/destination-service";

import {
  getAllBlogs,
} from "@/services/blog-service";

import {
  getAllExperiences,
} from "@/services/experience-service";

import {
  getAllProducts,
} from "@/services/heritage-service";

export default async function sitemap():
Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    "https://justtheroutes.com";

  const destinations =
    await getAllDestinations();

  const blogs =
    await getAllBlogs();

    const experiences =
  await getAllExperiences();

const products =
  await getAllProducts();

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/destinations",
    "/journal",
    "/cabs",
    "/experiences",
    "/heritage-shop",
    "/stays",
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

    const experiencePages =
  experiences.map(
    (experience: any) => ({
      url:
        `${baseUrl}/experiences/${experience.slug}`,

      lastModified:
        new Date(),

      changeFrequency:
        "weekly" as const,

      priority: 0.8,
    })
  );

  const heritagePages =
  products.map(
    (product: any) => ({
      url:
        `${baseUrl}/heritage-shop/${product.slug}`,

      lastModified:
        new Date(),

      changeFrequency:
        "weekly" as const,

      priority: 0.8,
    })
  );

  return [

  ...staticPages,

  ...destinationPages,

  ...blogPages,

  ...experiencePages,

  ...heritagePages,

];
}