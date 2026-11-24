import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return ['/', ...projects.map(({ slug }) => `/work/${slug}`)].map((path) => ({ url: new URL(path, siteUrl).href }));
}
