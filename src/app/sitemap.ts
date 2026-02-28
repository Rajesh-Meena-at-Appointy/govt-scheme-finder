import type { MetadataRoute } from "next";
import { getAllSchemes, getCategoriesIndex, getStatesIndex } from "@/lib/schemes";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'te', name: 'Telugu' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'or', name: 'Odia' },
  { code: 'as', name: 'Assamese' },
];

/**
 * NOTE:
 * - Update `siteUrl` after deployment (Vercel/custom domain)
 * - Next will serve this at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const now = new Date();

  // Base pages with all language alternatives
  const basePages = [
    { url: siteUrl, lastModified: now, changeFrequency: "daily" as const, priority: 1 },
    { url: siteUrl + "/about", lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: siteUrl + "/contact", lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: siteUrl + "/privacy-policy", lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: siteUrl + "/terms", lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: siteUrl + "/submit", lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: siteUrl + "/categories", lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: siteUrl + "/states", lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  // Generate scheme URLs for all languages
  const schemeUrls = getAllSchemes().flatMap((s) => {
    return languages.map((lang) => ({
      url: `${siteUrl}/scheme/${s.slug}?lang=${lang.code}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  });

  // Generate state URLs for all languages
  const stateUrls = getStatesIndex().flatMap((st) => {
    return languages.map((lang) => ({
      url: `${siteUrl}/state/${st}?lang=${lang.code}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  });

  // Generate category URLs for all languages
  const categoryUrls = getCategoriesIndex().flatMap((c) => {
    return languages.map((lang) => ({
      url: `${siteUrl}/category/${c}?lang=${lang.code}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  });

  return [...basePages, ...schemeUrls, ...stateUrls, ...categoryUrls];
}
