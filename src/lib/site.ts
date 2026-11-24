import { profile } from '@/data/profile';

export const siteTitle = 'Jia — The Art of Digital Feeling';
export const siteDescription = 'Jia is an independent frontend designer. Explore Tomo + Nomo and Trends of TUM.';

function canonicalOrigin() {
  if (!process.env.SITE_URL) return undefined;
  const url = new URL(process.env.SITE_URL);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('SITE_URL must use http or https.');
  }
  return new URL(url.origin);
}

export const siteUrl = canonicalOrigin();
export const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  ...(siteUrl ? { url: siteUrl.href } : {}),
};
