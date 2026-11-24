import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowDownRight, ArrowUp, ArrowUpRight, Download, Sparkle } from 'lucide-react';
import { ContactActions } from '@/components/contact-actions';
import { HomeMotion } from '@/components/home-motion';
import { Process } from '@/components/process';
import { ProjectCover } from '@/components/project-cover';
import { Sculpture } from '@/components/sculpture';
import { Wordmark } from '@/components/wordmark';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import { socials } from '@/data/socials';
import { person, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  alternates: siteUrl ? { canonical: '/' } : undefined,
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }} />
      <HomeMotion smoothScroll={profile.smoothScroll} />
      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-inner container">
            <div className="hero-copy">
              <p className="hero-label mono"><span />{profile.title}</p>
              <h1 id="hero-title"><span className="hero-line"><span>Design</span></span><span className="hero-line"><em>with feeling.</em></span></h1>
              <p className="hero-description">{profile.introduction}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">Discover my work <ArrowDownRight size={17} /></a>
                <a className="button button-text" href="#contact">Get in touch <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <figure className="hero-art">
              <div className="hero-art-media">
                <Sculpture>
                  <Image className="hero-day" src="/images/sculpture.webp" alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1440px) 56vw, 820px" loading="eager" fetchPriority="high" />
                  <Image className="hero-night" src="/images/sculpture-night.webp" alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1440px) 56vw, 820px" loading="eager" fetchPriority="high" />
                </Sculpture>
              </div>
              <span className="art-coordinate" aria-hidden="true"><Sparkle size={13} /> MATERIAL STUDY 01</span>
              <figcaption className="hero-caption mono"><span>FIG. 01</span><i /> Continuum, a study in glass</figcaption>
            </figure>
            <div className="hero-index mono">
              <a href="#statement"><span className="scroll-icon"><ArrowDown size={15} /></span>Scroll to explore</a>
              <span className="hero-index-title">JIA <i /> THE ART OF DIGITAL FEELING</span>
              <a className="hero-index-count" href="#work">PORTFOLIO INDEX <span>01—{String(projects.length).padStart(2, '0')}</span></a>
            </div>
          </div>
        </section>

        <section id="statement" className="statement" aria-labelledby="statement-title">
          <div className="container statement-inner">
            <Sparkle className="statement-star" size={30} strokeWidth={1} aria-hidden="true" />
            <h2 className="statement-title" id="statement-title">
              <span data-statement-word>I believe the best digital</span>{' '}
              <span data-statement-word>experiences aren’t just seen.</span>{' '}
              <em data-statement-word>They’re felt.</em>
            </h2>
          </div>
        </section>

        <section className="selected-work container" id="work" tabIndex={-1} aria-labelledby="work-title">
          <header className="work-heading">
            <div>
              <p className="section-index mono"><i /> Portfolio index</p>
              <h2 className="display-title" id="work-title">Selected <em>Work.</em></h2>
            </div>
            <p>A look at what I designed and built for the web.</p>
          </header>
          <div className="exhibits">
            {projects.map((project, index) => (
              <article key={project.slug} className={`exhibit exhibit-${index + 1}`}>
                <div className="exhibit-art" data-exhibit>
                  <ProjectCover project={project} />
                  <span className="exhibit-open glass glass-crystal" aria-hidden="true"><ArrowUpRight size={23} /></span>
                </div>
                <div className="exhibit-details">
                  <p className="exhibit-index mono">{String(index + 1).padStart(2, '0')} / {project.year}</p>
                  <h3><Link className="exhibit-title-link" href={`/work/${project.slug}`} prefetch={false}>{project.name}</Link></h3>
                  <p className="exhibit-meta">{project.category}{project.concept && <> <span>Concept study</span></>}</p>
                  <p className="exhibit-tagline">{project.tagline}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about" id="about" tabIndex={-1} aria-labelledby="about-title">
          <div className="container about-grid">
            <figure className="about-figure">
              <div className="about-image">
                <Image src={profile.portrait?.src ?? '/images/material-study.webp'} alt={profile.portrait?.alt ?? 'Fern fronds refracted through curved, ribbed green glass'} fill sizes="(max-width: 760px) 90vw, 500px" />
                <Wordmark className="about-signature" />
              </div>
              <figcaption className="mono"><span>{profile.portrait ? 'PORTRAIT' : 'FIG. 02'}</span>{profile.portrait ? profile.name : 'Botanical glass study'}</figcaption>
            </figure>
            <div className="about-copy">
              <p className="section-index mono"><i /> About Jia</p>
              <h2 className="display-title" id="about-title">The person<br />behind the <em>pixels.</em></h2>
              {profile.biography.map((paragraph) => <p key={paragraph} className="body-copy">{paragraph}</p>)}
              <p className="about-philosophy">{profile.philosophy}</p>
              {profile.resume && <a className="button button-secondary" href={profile.resume} download>Download résumé <Download size={17} /></a>}
            </div>
          </div>
        </section>

        <section className="container toolkit" aria-labelledby="toolkit-title">
          <h2 id="toolkit-title" className="display-title">Creative <em>toolkit.</em></h2>
          <div className="toolkit-index">
            {skills.map((skill) => (
              <details key={skill.name}>
                <summary>{skill.name}<span aria-hidden="true"><ArrowDownRight size={18} /></span></summary>
                <p>{skill.description}</p>
                {skill.tools?.length ? <p className="mono">{skill.tools.join(' / ')}</p> : null}
              </details>
            ))}
          </div>
        </section>

        <section className="process-section" id="process" tabIndex={-1} aria-labelledby="process-title">
          <div className="container process-grid">
            <div className="process-heading">
              <p className="section-index mono"><i /> Four stages</p>
              <h2 className="display-title" id="process-title">From imagination to <em>interaction.</em></h2>
            </div>
            <Process />
          </div>
        </section>

        <section className="contact-section" id="contact" tabIndex={-1} aria-labelledby="contact-title">
          <div className="contact-scene" aria-hidden="true">
            <Image src="/images/sculpture-night.webp" alt="" fill sizes="(max-width: 760px) 65vw, 640px" />
          </div>
          <div className="container contact-inner">
            <p className="section-index mono"><i /> Get in touch</p>
            <h2 id="contact-title" className="display-title">Let’s create something<br className="contact-break" /> <em>worth feeling.</em></h2>
            {profile.availability && <p className="contact-availability">{profile.availability}</p>}
            {profile.email ? <ContactActions email={profile.email} /> : <p className="contact-note">Contact details coming soon.</p>}
            {!!socials.length && <div className="socials">{socials.map((social) => <a key={social.url} href={social.url}>{social.label}<ArrowUpRight size={15} /></a>)}</div>}
          </div>
        </section>
      </main>
      <footer className="footer-shell">
        <div className="container footer">
            <a href="#top" aria-label="Jia, back to top"><Wordmark /></a>
            <span className="mono">The art of digital feeling</span>
            <a href="#top" className="back-top mono">Back to top <ArrowUp size={15} /></a>
        </div>
      </footer>
    </>
  );
}
