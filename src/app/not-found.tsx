import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight, Sparkle } from 'lucide-react';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="lost-page">
      <div className="container">
        <p className="section-index mono"><Sparkle size={17} /> 404</p>
        <h1 className="display-title">A missing <em>piece.</em></h1>
        <p>That link may be out of date.</p>
        <Link className="button button-primary" href="/">Return to the portfolio <ArrowUpRight size={17} /></Link>
      </div>
    </main>
  );
}
