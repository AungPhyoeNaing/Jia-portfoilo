import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowDownRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ProjectCover } from '@/components/project-cover';
import { projects } from '@/data/projects';
import { siteTitle, siteUrl } from '@/lib/site';

type ProjectPage = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPage): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  const title = `${project.name} / ${project.category}`;
  const image = { url: '/images/social.jpg', width: 1200, height: 630, alt: siteTitle };
  return {
    title,
    description: project.overview,
    alternates: siteUrl ? { canonical: `/work/${project.slug}` } : undefined,
    openGraph: {
      type: 'article', title, description: project.overview, siteName: siteTitle,
      images: [image], ...(siteUrl ? { url: `/work/${project.slug}` } : {}),
    },
    twitter: { card: 'summary_large_image', title, description: project.overview, images: [image] },
  };
}

export default async function CaseStudy({ params }: ProjectPage) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const study = project.caseStudy;
  const label = String(index + 1).padStart(2, '0');

  return (
    <main id="main-content" tabIndex={-1} className={`case-main case-${study.layout}`}>
      <div className="container">
        <Link className="case-back mono" href="/#work"><ArrowLeft size={16} /> Selected work</Link>
        <header className="case-header">
          <div>
            <p className="section-index mono"><i /> {label} / {project.concept ? 'Concept study' : 'Case study'} / {project.year}</p>
            <h1 className={project.name.length >= 10 ? 'case-title-long' : undefined}>{project.name}<em>.</em></h1>
          </div>
          <div className="case-lead"><p className="case-tagline">{project.tagline}</p><p>{project.overview}</p></div>
          {study.layout === 'split' && <div className="case-split-art"><ProjectCover project={project} detail /></div>}
        </header>
        {study.layout === 'wide' && <div className="case-wide-art"><ProjectCover project={project} detail /></div>}

        <dl className="case-facts">
          <div><dt>Category</dt><dd>{project.category}</dd></div>
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Technologies</dt><dd>{project.technologies.join(' / ')}</dd></div>
        </dl>
        {(project.liveDemo || project.sourceCode) && <div className="case-externals">
          {project.liveDemo && <a className="button button-primary" href={project.liveDemo}>Live demo<ArrowUpRight size={16} /></a>}
          {project.sourceCode && <a className="button button-secondary" href={project.sourceCode}>Source code<ArrowUpRight size={16} /></a>}
        </div>}

        <section className="case-section">
          <h2>The <em>idea.</em></h2>
          <div className="case-prose">
            <div><h3>Goal</h3><p>{study.objectives}</p></div>
            <div><h3>The challenge</h3><p>{study.problem}</p></div>
            <div><h3>Layout choices</h3><p>{study.exploration}</p></div>
          </div>
        </section>
        <section className="case-section">
          <h2>Look and <em>feel.</em></h2>
          <div className="case-prose">
            <div><h3>Color palette</h3><p>{study.identity}</p></div>
            <ul className="case-palette">{study.palette.map((color) => (
              <li key={color.hex}><div style={{ background: color.hex }} /><span>{color.name}</span><code>{color.hex}</code></li>
            ))}</ul>
            <div><h3>Fonts</h3><p>{study.typography}</p></div>
          </div>
        </section>
        <section className="case-section">
          <h2>The <em>build.</em></h2>
          <div className="case-prose">
            <div><h3>What’s in the preview</h3><p>{study.interface}</p></div>
            <div><h3>On smaller screens</h3><p>{study.responsive}</p></div>
            <div><h3>How I built it</h3><p>{study.implementation}</p></div>
            <div><h3>What I learned</h3><p>{study.lessons}</p></div>
          </div>
        </section>
        <Link className="case-next" href={`/work/${next.slug}`}>
          <span className="section-index mono"><i /> Next case study</span>
          <span className="case-next-name">{next.name}<em>.</em></span>
          <span className="case-next-arrow"><ArrowDownRight /></span>
        </Link>
      </div>
    </main>
  );
}
