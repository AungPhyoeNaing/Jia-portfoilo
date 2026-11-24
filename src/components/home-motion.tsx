'use client';

import { useEffect } from 'react';

export function HomeMotion({ smoothScroll }: { smoothScroll: boolean }) {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inRange = smoothScroll && matchMedia('(pointer: fine)').matches;
    let cleanup: (() => void) | undefined;
    let revision = 0;

    async function setup(current: number) {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (revision !== current) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        const words = gsap.utils.toArray<HTMLElement>('[data-statement-word]');
        if (words.length) {
          gsap.fromTo(words, { opacity: 0.68 }, {
            opacity: 1, ease: 'none', stagger: 0.16,
            scrollTrigger: { trigger: '.statement-title', start: 'top 86%', end: 'bottom 61%', scrub: 0.55 },
          });
        }
        const frame = document.querySelector('.hero-art-media');
        if (frame && matchMedia('(min-width: 761px)').matches) {
          gsap.to(frame, {
            yPercent: 5, ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
          });
        }
        gsap.utils.toArray<HTMLElement>('[data-exhibit]').forEach((element) => {
          gsap.fromTo(element, { '--reveal': '10%' }, {
            '--reveal': '0%', duration: 0.95, ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          });
        });
        gsap.to('.process-section', {
          '--process-glow': 1, ease: 'none',
          scrollTrigger: { trigger: '.process-section', start: 'top 85%', end: 'bottom 55%', scrub: 0.65 },
        });
      });
      cleanup = () => context.revert();

      if (smoothScroll && matchMedia('(pointer: fine)').matches) {
        const { default: Lenis } = await import('lenis');
        if (revision !== current) return;
        const lenis = new Lenis();
        const tick = (seconds: number) => lenis.raf(seconds * 1000);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
        cleanup = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
          context.revert();
        };
      }
    }

    function update() {
      revision++;
      cleanup?.();
      cleanup = undefined;
      if (inRange && !motion.matches) void setup(revision);
    }
    if (!motion.matches) {
      try {
        if (!sessionStorage.getItem('jia-entrance')) {
          document.querySelector('.hero')?.classList.add('hero-intro');
          sessionStorage.setItem('jia-entrance', 'seen');
        }
      } catch { /* The page remains fully visible without storage. */ }
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting) || inRange) return;
      inRange = true;
      observer.disconnect();
      update();
    }, { threshold: 0.01 });
    if (inRange) update();
    else document.querySelectorAll('.statement-title, .work-heading, .process-heading').forEach((element) => observer.observe(element));
    motion.addEventListener('change', update);
    return () => {
      revision++;
      cleanup?.();
      observer.disconnect();
      motion.removeEventListener('change', update);
    };
  }, [smoothScroll]);

  return null;
}
