import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Navigation } from '@/components/navigation';
import { initializeTheme } from '@/lib/theme';
import { siteDescription, siteTitle, siteUrl } from '@/lib/site';
import './globals.css';

const display = localFont({
  src: [
    { path: './fonts/cormorant.woff2', weight: '400 600', style: 'normal' },
    { path: './fonts/cormorant-italic.woff2', weight: '400 600', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
});
const sans = localFont({
  src: './fonts/manrope.woff2',
  weight: '400 800',
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: siteUrl ?? new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: { default: siteTitle, template: '%s — Jia' },
  description: siteDescription,
  icons: { icon: '/icon.svg' },
  openGraph: {
    type: 'website',
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [{ url: '/images/social.jpg', width: 1200, height: 630, alt: 'Jia — The Art of Digital Feeling, beside a pale green glass sculpture' }],
    ...(siteUrl ? { url: siteUrl.href } : {}),
  },
  twitter: { card: 'summary_large_image', title: siteTitle, description: siteDescription, images: ['/images/social.jpg'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: initializeTheme }} /></head>
      <body className="antialiased">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
