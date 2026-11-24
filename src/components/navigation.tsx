'use client';

import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { type PointerEvent, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { themeKey } from '@/lib/theme';
import { Wordmark } from './wordmark';

const links = [
  ['work', 'Work'], ['about', 'About'], ['process', 'Process'], ['contact', 'Contact'],
] as const;

function subscribeToTheme(update: () => void) {
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  function followSystem() {
    try {
      if (localStorage.getItem(themeKey)) return;
    } catch { /* System changes remain available without storage. */ }
    document.documentElement.dataset.theme = system.matches ? 'dark' : 'light';
  }
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  system.addEventListener('change', followSystem);
  return () => {
    observer.disconnect();
    system.removeEventListener('change', followSystem);
  };
}

function toggleTheme() {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(themeKey, theme); } catch { /* Keep the current in-memory choice. */ }
}

function followPointer(event: PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType !== 'mouse' || !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  element.style.setProperty('--pull-x', `${(event.clientX - rect.left - rect.width / 2) * 0.1}px`);
  element.style.setProperty('--pull-y', `${(event.clientY - rect.top - rect.height / 2) * 0.15}px`);
}

export function Navigation() {
  const pathname = usePathname();
  const home = pathname === '/';
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const menuOpen = menuFor === pathname;
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const dark = useSyncExternalStore(subscribeToTheme, () => document.documentElement.dataset.theme === 'dark', () => false);

  useEffect(() => {
    const sections = links.map(([id]) => document.getElementById(id)).filter((item) => item !== null);
    let frame = 0;
    function update() {
      frame = 0;
      setScrolled(window.scrollY > 32);
      const line = Math.min(320, window.innerHeight * 0.35);
      setActive(sections.findLast((item) => item.getBoundingClientRect().top <= line)?.id ?? '');
    }
    function queue() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    queue();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    firstLink.current?.focus();
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setMenuFor(null);
      menuButton.current?.focus();
    }
    const desktop = window.matchMedia('(min-width: 761px)');
    function closeOnDesktop() {
      if (desktop.matches) setMenuFor(null);
    }
    document.addEventListener('keydown', closeOnEscape);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <header className={`header-wrap${scrolled ? ' header-scrolled' : ''}`}>
      <div className="navigation glass glass-pearl">
        <a className="brand" href={home ? '#top' : '/'} aria-label="Jia home" onClick={() => setMenuFor(null)}>
          <Wordmark />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([id, label]) => (
            <a key={id} href={`${home ? '' : '/'}#${id}`} aria-current={home && active === id ? 'location' : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button type="button" className="theme-toggle icon-button" onClick={toggleTheme} aria-label="Dark mode" aria-pressed={dark} title="Toggle theme">
            <Sun className="theme-sun" size={17} />
            <Moon className="theme-moon" size={16} />
          </button>
          <a className="nav-contact" href={home ? '#contact' : '/#contact'} onPointerMove={followPointer}
            onPointerLeave={({ currentTarget }) => {
              currentTarget.style.removeProperty('--pull-x');
              currentTarget.style.removeProperty('--pull-y');
            }}>
            Let’s talk <ArrowUpRight size={14} />
          </a>
          <button type="button" ref={menuButton} className="menu-toggle icon-button" onClick={() => setMenuFor(menuOpen ? null : pathname)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls={menuOpen ? 'mobile-navigation' : undefined}>
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav glass glass-pearl" aria-label="Main navigation">
          {links.map(([id, label], index) => (
            <a key={id} ref={index === 0 ? firstLink : undefined} href={`${home ? '' : '/'}#${id}`}
              aria-current={home && active === id ? 'location' : undefined}
              onClick={() => {
                setMenuFor(null);
                document.getElementById(id)?.focus({ preventScroll: true });
              }}>
              {label}<ArrowUpRight size={20} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
