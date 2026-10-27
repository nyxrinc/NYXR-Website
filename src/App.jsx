import { useEffect, useRef, useState } from 'react';
import Navigation from './components/Navigation';
import Icon from './components/Icon';
import { Button, Eyebrow } from './components/Primitives';
import Hero from './sections/Hero';
import { HomeCapabilities, LearningShowcase, HomeSignature } from './sections/HomeStory';
import {
  Introduction,
  ChatSection,
  CodingSection,
  ComputerSection,
  VoiceSection,
  ProviderSection,
  HudSection,
  SkillsSection,
  CoreSection,
  FeatureGrid,
} from './sections/ProductStory';
import { InteractiveDemo, ThemeSection, MotionSection } from './sections/Interactive';
import { Gallery, Lightbox } from './components/Gallery';
import useMotion from './animations/useMotion';
import { trapDialogFocus } from './components/modalFocus';
import { pages, pageByPath } from './data/pages';
import usePage from './navigation/usePage';
import Download from './pages/Download';
import { CompanionFeatures, CompanionGuide } from './components/PhoneCompanion';
import { ExhibitionGuide } from './components/ExhibitionRelease';
import Student from './pages/Student';
import Phone, { PhoneShowcase } from './pages/Phone';
import Updates from './pages/Updates';
import Pricing from './pages/Pricing';
import LegalPage, { contactEmail, contactHref } from './pages/Legal';

const resourceCopy = {
  documentation: {
    title: 'A quick guide to NYXR',
    content: (
      <>
        <p>
          NYXR is a Windows desktop application. This website showcases the product; it does not
          control your computer or run a connected version of the assistant.
        </p>
        <h3>Find your place</h3>
        <p>
          Use Chat for conversations and Projects for the file explorer, editor and coding
          assistant. The Command Center puts the animated NYXR core at the center, surrounded by
          your work and system panels. NEXUS is the new default for fresh installations; existing
          users keep their chosen theme.
        </p>
        <h3>Keep the flow</h3>
        <ul>
          <li>F11 toggles hands-free. While enabled, hold F8 to speak.</li>
          <li>F9 stops speaking. F10 toggles macro voice.</li>
          <li>Ctrl+P opens the file switcher in the coding workspace.</li>
          <li>Ctrl+Shift+P opens the command palette.</li>
          <li>F6 starts macro recording; F5 stops it.</li>
        </ul>
        <h3>Write for me / beta 3</h3>
        <p>
          In beta 3, the F11 dropdown adds Assistant, Write for me and Macro voice. In Write for me,
          choose Select textbox, click a field, then hold F8 to dictate. With grammar correction on,
          scores below 9/10 are rewritten; 9/10 or higher stays verbatim. Text is inserted and
          verified without submitting it. The speech service transcribes your audio; dictation
          cleanup uses your selected AI. Review Voice context and privacy settings. Write for me is
          included in the beta 3 installer.
        </p>
        <h3>Connect deliberately</h3>
        <p>
          Use guided setup to open the existing AI Providers settings, or choose local Ollama. Bring
          your own provider keys or use an installed local model; NYXR does not supply inference
          credits. Availability, models, account limits and cost depend on the service. Local Ollama
          use is an explicit choice unless local fallback is enabled.
        </p>
        <h3>Optional setup, at your pace</h3>
        <p>
          You can skip NYXR account, Chrome and voice setup, then resume guided setup from Settings
          or the command palette. Optional NYXR accounts are being developed with Firebase;
          availability depends on the configured release and verified account service. A provider
          account is separate from an NYXR account.
        </p>
        <h3>Listening and speaking, separately</h3>
        <p>
          Guided setup includes a short app tour and a saved checklist. For listening, find your
          microphone, run the two-second local signal check, then select your speech-to-text engine
          in Voice settings. For speaking, choose a voice and use Test current voice. Check Windows
          output and volume if you cannot hear it. Nothing records or plays just because you open
          the tutorial. Skip a step or skip everything, and return from Home’s Tutorial &amp; setup
          checklist button whenever you want.
        </p>
        <h3>Connect Chrome for browser tasks</h3>
        <p>
          Open Chrome setup in the desktop app to install/connect the NYXR Chrome extension and its
          Native Messaging host on your computer. Browser tasks may read tab URLs, titles and page
          content; content needed for your request may be sent to your selected AI provider. See the{' '}
          <a href="/privacy/">Privacy Policy</a> before connecting.
        </p>
        <ExhibitionGuide />
        <CompanionGuide />
        <h3>Connect Ashna AI</h3>
        <p>
          Open Settings → AI Providers → Ashna AI in the desktop app. Enter your API key, save it
          securely, then refresh models. Allow account-quota models if you want to use your Ashna
          credits; automatic cloud fallback has its own enable switch. Keys are never entered into
          this website.
        </p>
        <p>
          NYXR is still in development. Visit the <a href="/download/">Download page</a> for its
          current release status.
        </p>
      </>
    ),
  },
  provenance: {
    title: 'Real interface. Authored showcase.',
    content: (
      <>
        <p>
          The screenshots and product film show the actual NYXR 4.0 Qt application. A dedicated
          showcase session was created without accessing the user’s conversations or credentials.
        </p>
        <p>
          The Orbit project and conversations were written for these captures. UI navigation and
          animated N Core frames were recorded from the running application. No provider inference,
          successful automation, or microphone activity is depicted as a live result.
        </p>
        <p>
          Images were cropped and encoded locally as WebP. The product film is a 20-second WebM
          sequence of native Qt UI frames. The website’s orbital artwork, explanatory diagrams,
          background workspace illustration and scripted timeline are presentation elements, clearly
          separate from app captures.
        </p>
        <p>
          Theme previews use six actual NYXR themes. The Matrix rain over the Hacker preview is a
          website animation.
        </p>
      </>
    ),
  },
  about: {
    title: 'NYXR / version 4.0',
    content: (
      <>
        <p>
          Your AI operating environment. A desktop workspace bringing conversation, coding, computer
          control, voice, projects, skills, macros and intelligent provider routing together.
        </p>
        <p>
          This website is a product showcase based on the existing NYXR source and real application
          captures. It is not an online instance of NYXR. Visit the Download page for beta
          availability.
        </p>
      </>
    ),
  },
};

function ResourceDialog({ resource, close }) {
  const ref = useRef(null);
  const opener = useRef(null);
  useEffect(() => {
    if (resource) {
      opener.current = document.activeElement;
      ref.current.showModal();
    } else if (ref.current.open) {
      ref.current.close();
      opener.current?.focus();
    }
  }, [resource]);
  const content = resourceCopy[resource];
  return (
    <dialog
      className="resource-dialog"
      ref={ref}
      aria-labelledby="resource-title"
      onKeyDown={trapDialogFocus}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
    >
      <div className="resource-heading">
        <Eyebrow>
          {resource === 'download' ? 'NYXR / RELEASE UPDATE' : 'NYXR / FIELD NOTES'}
        </Eyebrow>
        <button className="icon-button" aria-label="Close information" onClick={close}>
          <Icon name="close" />
        </button>
      </div>
      {content && (
        <>
          <h2 id="resource-title">{content.title}</h2>
          <div className="resource-content">{content.content}</div>
          {resource === 'download' && (
            <Button className="release-dialog-dismiss" onClick={close} icon="check">
              Got it
            </Button>
          )}
        </>
      )}
    </dialog>
  );
}

export default function App() {
  const path = usePage();
  const page = pageByPath[path] || {
    id: 'not-found',
    path,
    label: 'Page not found',
    description: 'Find your way back to NYXR.',
  };
  const [shot, setShot] = useState(null),
    [resource, setResource] = useState(null),
    [loading, setLoading] = useState(!matchMedia('(prefers-reduced-motion: reduce)').matches),
    [motion, setMotion] = useState(true);
  useMotion();
  useEffect(() => {
    setShot(null);
    setResource(null);
    document.title =
      page.id === 'overview' ? 'NYXR — Your AI Operating Environment' : `${page.label} — NYXR`;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = new URL(page.path || path, canonical.href).href;
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ])
      document.querySelector(selector)?.setAttribute('content', page.description);
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]'])
      document.querySelector(selector)?.setAttribute('content', document.title);
    window.scrollTo({ top: 0, behavior: 'instant' });
    const frame = requestAnimationFrame(() => {
      document.getElementById('main')?.focus({ preventScroll: true });
      if (location.hash) {
        try {
          document
            .getElementById(decodeURIComponent(location.hash.slice(1)))
            ?.scrollIntoView({ behavior: 'instant', block: 'start' });
        } catch {
          /* malformed URL fragment */
        }
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [path]);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 380);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off';
  }, [motion]);
  useEffect(() => {
    if (!shot && !resource) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = old;
    };
  }, [shot, resource]);
  return (
    <>
      {loading && (
        <div className="boot-screen" aria-hidden="true">
          <span>N</span>
          <small>INITIALIZING NYXR</small>
          <i />
        </div>
      )}
      <div id="top" />
      <Navigation page={page} />
      <main id="main" tabIndex={-1} className={page.id === 'overview' ? 'home-main' : 'route-main'}>
        <div key={path} className="page-content">
          {page.id !== 'overview' && (
            <div className="page-breadcrumb container">
              <a href="/">Home</a>
              <span>/</span>
              <span>{page.label}</span>
            </div>
          )}
          {![
            'overview',
            'download',
            'phone',
            'updates',
            'pricing',
            'not-found',
            'documentation',
            'privacy',
            'terms',
            'contact',
            'provenance',
            'about',
          ].includes(page.id) && <h1 className="sr-only">{page.label}</h1>}
          <PageContent page={page} openShot={setShot} />
          {!['download', 'not-found', 'privacy', 'terms', 'contact'].includes(page.id) && (
            <PageDirectory current={page.id} />
          )}
        </div>
      </main>
      <footer className="site-footer container">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand-home footer-brand-logo" href="/" aria-label="NYXR home">
              <img
                src="/logos/nyxr-brand-core.png"
                alt="NYXR orbital core logo"
                width="1280"
                height="1280"
                loading="lazy"
              />
            </a>
            <p>Your AI operating environment.</p>
            <span>DESIGNED FOR THE WAY YOU WORK.</span>
            <a className="footer-contact" href={contactHref}>
              {contactEmail}
            </a>
          </div>
          <div className="footer-column">
            <h3>Environment</h3>
            {pages
              .filter((p) => p.group === 'Workspace' || p.id === 'features')
              .map((p) => (
                <a key={p.id} href={p.path}>
                  {p.label}
                </a>
              ))}
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            {pages
              .filter(
                (p) =>
                  p.group === 'Intelligence' ||
                  ['demo', 'in-motion', 'gallery', 'download', 'updates', 'pricing'].includes(p.id),
              )
              .map((p) => (
                <a key={p.id} href={p.path}>
                  {p.label}
                </a>
              ))}
          </div>
          <div className="footer-column">
            <h3>Information & contact</h3>
            {pages
              .filter((p) => p.group === 'Information')
              .map((p) => (
                <a key={p.id} href={p.path}>
                  {p.label}
                </a>
              ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>NYXR 4.0 / WINDOWS DESKTOP ENVIRONMENT</span>
          <button
            className="motion-toggle"
            aria-pressed={!motion}
            onClick={() => setMotion(!motion)}
          >
            <span className={motion ? 'motion-indicator on' : 'motion-indicator'} />
            {motion ? 'Pause decorative motion' : 'Resume decorative motion'}
          </button>
          <a href="#top">
            BACK TO TOP <Icon name="arrow" size={13} style={{ transform: 'rotate(-90deg)' }} />
          </a>
        </div>
      </footer>
      <Lightbox selected={shot} onClose={() => setShot(null)} onSelect={setShot} />
      <ResourceDialog resource={resource} close={() => setResource(null)} />
    </>
  );
}

function PageContent({ page, openShot }) {
  switch (page.id) {
    case 'students':
      return <Student />;
    case 'slideshows':
      return <Student slidesOnly />;
    case 'overview':
      return (
        <>
          <Hero openShot={openShot} />
          <HomeCapabilities />
          <LearningShowcase />
          <PhoneShowcase />
          <HomeSignature />
        </>
      );
    case 'pricing':
      return <Pricing />;
    case 'features':
      return (
        <>
          <Introduction />
          <FeatureGrid />
          <CompanionFeatures />
        </>
      );
    case 'chat':
      return <ChatSection openShot={openShot} />;
    case 'coding':
      return <CodingSection openShot={openShot} />;
    case 'demo':
      return <InteractiveDemo />;
    case 'computer':
      return <ComputerSection />;
    case 'voice':
      return <VoiceSection openShot={openShot} />;
    case 'providers':
      return <ProviderSection />;
    case 'hud':
      return <HudSection openShot={openShot} />;
    case 'skills':
      return <SkillsSection openShot={openShot} mode="skills" />;
    case 'macros':
      return <SkillsSection openShot={openShot} mode="macros" />;
    case 'personalization':
      return <ThemeSection openShot={openShot} />;
    case 'intelligence':
      return <CoreSection />;
    case 'in-motion':
      return <MotionSection />;
    case 'gallery':
      return <Gallery openShot={openShot} />;
    case 'download':
      return <Download />;
    case 'phone':
      return <Phone />;
    case 'updates':
      return <Updates />;
    case 'privacy':
    case 'terms':
    case 'contact':
      return <LegalPage page={page.id} />;
    case 'documentation':
    case 'provenance':
    case 'about': {
      const content = resourceCopy[page.id];
      return (
        <article className="information-page container">
          <Eyebrow>NYXR / FIELD NOTES</Eyebrow>
          <h1>{content.title}</h1>
          <div className="resource-content">{content.content}</div>
        </article>
      );
    }
    default:
      return (
        <section className="information-page container">
          <Eyebrow>404 / ANOTHER DIRECTION</Eyebrow>
          <h1>This page isn’t here.</h1>
          <p>There’s plenty to explore inside NYXR.</p>
          <Button href="/">Go home</Button>
        </section>
      );
  }
}

function PageDirectory({ current }) {
  const choices =
    current === 'overview'
      ? ['coding', 'voice', 'phone', 'macros', 'personalization', 'gallery']
      : ['features', 'demo', 'download'].filter((id) => id !== current);
  return (
    <section className="page-directory container" aria-labelledby="page-directory-title">
      <div className="page-directory-heading">
        <Eyebrow>KEEP EXPLORING</Eyebrow>
        <h2 id="page-directory-title">Find your next possibility.</h2>
      </div>
      <div className="page-link-grid">
        {choices.map((id) => {
          const item = pages.find((p) => p.id === id);
          return (
            <a href={item.path} key={id} className="page-link-card">
              <div>
                <span>{item.group.toUpperCase()}</span>
                <Icon size={17} />
              </div>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
}
