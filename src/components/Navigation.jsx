import { useEffect, useRef, useState } from 'react';
import { pages } from '../data/pages';
import Icon from './Icon';

const primary = ['overview', 'features', 'coding', 'voice', 'providers', 'pricing'];
export default function Navigation({ page }) {
  const [open, setOpen] = useState(false),
    [browse, setBrowse] = useState(false),
    [scrolled, setScrolled] = useState(false);
  const header = useRef(null);
  useEffect(() => {
    setOpen(false);
    setBrowse(false);
  }, [page.path]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  useEffect(() => {
    const scroll = () => setScrolled(scrollY > 24);
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  useEffect(() => {
    if (!open && !browse) return;
    const frame = requestAnimationFrame(() => {
      header.current?.querySelector(open ? '#main-navigation a' : '#browse-pages a')?.focus();
    });
    const close = (event) => {
      if (event.key === 'Escape') {
        const toggle = document.getElementById(open ? 'menu-toggle' : 'browse-toggle');
        setOpen(false);
        setBrowse(false);
        toggle?.focus();
      }
    };
    const outside = (event) => {
      if (!header.current?.contains(event.target)) {
        setOpen(false);
        setBrowse(false);
      }
    };
    const resize = () => {
      setOpen(false);
      setBrowse(false);
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', outside);
      window.removeEventListener('resize', resize);
    };
  }, [open, browse]);
  return (
    <header ref={header} className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="nav-inner">
        <a href="/" className="brand-home" aria-label="NYXR home">
          <img
            src="/logos/nyxr-brand-core.png"
            alt="NYXR orbital core logo"
            width="1280"
            height="1280"
            fetchPriority="high"
          />
        </a>
        <nav
          className={open ? 'nav-links is-open' : 'nav-links'}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {primary.map((id) => {
            const item = pages.find((p) => p.id === id);
            return (
              <a
                key={id}
                href={item.path}
                className={page.id === id ? 'active' : ''}
                aria-current={page.id === id ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {id === 'coding'
                  ? 'Coding'
                  : id === 'providers'
                    ? 'Providers'
                    : id === 'pricing'
                      ? 'Pricing'
                      : item.label}
                <span />
              </a>
            );
          })}
          <button
            id="browse-toggle"
            className={`browse-toggle ${!primary.includes(page.id) ? 'active' : ''}`}
            aria-expanded={browse}
            aria-controls="browse-pages"
            onClick={() => setBrowse(!browse)}
          >
            Explore <Icon name="chevron" size={12} />
          </button>
          <div className="mobile-page-links">
            {pages
              .filter((p) => !primary.includes(p.id) && p.id !== 'download')
              .map((item) => (
                <a
                  key={item.id}
                  href={item.path}
                  aria-current={page.id === item.id ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <Icon size={12} />
                </a>
              ))}
          </div>
        </nav>
        <a
          href="/download/"
          className={`nav-cta ${page.id === 'download' ? 'active' : ''}`}
          aria-current={page.id === 'download' ? 'page' : undefined}
        >
          Download <Icon name="download" size={15} />
        </a>
        <button
          className="menu-toggle icon-button"
          id="menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
      <div id="browse-pages" className="browse-pages" hidden={!browse}>
        <div className="browse-heading">
          <span>FIND YOUR PLACE</span>
          <span>NYXR / EXPLORE</span>
        </div>
        <nav aria-label="Explore NYXR pages">
          {['Workspace', 'Intelligence', 'Discover', 'Information'].map((group) => (
            <div key={group}>
              <h2>{group}</h2>
              {pages
                .filter((p) => p.group === group)
                .map((item) => (
                  <a
                    key={item.id}
                    href={item.path}
                    aria-current={page.id === item.id ? 'page' : undefined}
                    onClick={() => setBrowse(false)}
                  >
                    {item.label}
                    <Icon size={12} />
                  </a>
                ))}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
