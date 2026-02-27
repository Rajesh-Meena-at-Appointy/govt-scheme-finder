import type { MetadataRoute } from "next";
import { getAllSchemes, getCategoriesIndex, getStatesIndex } from "@/lib/schemes";

/**
 * NOTE:
 * - Update `siteUrl` after deployment (Vercel/custom domain)
 * - Next will serve this at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const now = new Date();

  const base: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: siteUrl + "/admin/rules", lastModified: now, changeFrequency: "monthly", priority: 0.1 },
  ];

  const schemeUrls = getAllSchemes().map((s) => ({
    url: `${siteUrl}/scheme/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const stateUrls = getStatesIndex().map((st) => ({
    url: `${siteUrl}/state/${st}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const categoryUrls = getCategoriesIndex().map((c) => ({
    url: `${siteUrl}/category/${c}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...base, ...schemeUrls, ...stateUrls, ...categoryUrls];
}
