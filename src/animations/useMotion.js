import { useEffect } from 'react';

export default function useMotion() {
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const items = new Set();
    const motionAllowed = () => !media.matches && document.documentElement.dataset.motion !== 'off';

    // React owns className. Keep reveal state separate so updating a theme,
    // voice state or video state cannot remove the panel's visibility.
    const reveal = (element) => {
      element.dataset.revealState = 'visible';
      observer?.unobserve(element);
    };
    const observer =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) if (entry.isIntersecting) reveal(entry.target);
            },
            { threshold: 0, rootMargin: '0px 0px 48px 0px' },
          )
        : null;

    const register = (element) => {
      if (items.has(element)) return;
      items.add(element);
      const bounds = element.getBoundingClientRect();
      if (
        element.dataset.revealState === 'visible' ||
        !observer ||
        !motionAllowed() ||
        (bounds.top < innerHeight && bounds.bottom >= 0)
      ) {
        reveal(element);
      } else {
        element.dataset.revealState = 'pending';
        observer.observe(element);
      }
    };
    document.querySelectorAll('[data-reveal]').forEach(register);

    // Register later mounts without watching class updates or animation frames.
    const mounts =
      typeof MutationObserver === 'function'
        ? new MutationObserver((records) => {
            for (const record of records) {
              for (const node of record.addedNodes) {
                if (!(node instanceof Element)) continue;
                if (node.matches('[data-reveal]')) register(node);
                node.querySelectorAll('[data-reveal]').forEach(register);
              }
              for (const node of record.removedNodes) {
                if (!(node instanceof Element)) continue;
                for (const element of items) {
                  if (node === element || node.contains(element)) {
                    observer?.unobserve(element);
                    items.delete(element);
                  }
                }
              }
            }
          })
        : null;
    mounts?.observe(document.querySelector('main') || document.body, {
      childList: true,
      subtree: true,
    });

    let frame = 0;
    let event;
    const pointer = (nextEvent) => {
      if (!motionAllowed()) return;
      event = nextEvent;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!motionAllowed()) return;
        const hero = document.querySelector('.hero');
        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        if (rect.bottom < 0) return;
        hero.style.setProperty('--mx', `${event.clientX}px`);
        hero.style.setProperty('--my', `${event.clientY - rect.top}px`);
        hero.style.setProperty('--tilt', `${(event.clientX / innerWidth - 0.5) * 1.5}deg`);
      });
    };
    if (matchMedia('(pointer:fine)').matches)
      window.addEventListener('pointermove', pointer, { passive: true });
    const update = () => {
      if (!motionAllowed()) items.forEach(reveal);
    };
    media.addEventListener('change', update);
    const preferences =
      typeof MutationObserver === 'function' ? new MutationObserver(update) : null;
    preferences?.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-motion'],
    });
    return () => {
      observer?.disconnect();
      mounts?.disconnect();
      preferences?.disconnect();
      media.removeEventListener('change', update);
      window.removeEventListener('pointermove', pointer);
      cancelAnimationFrame(frame);
      // Fail open on cleanup, including React Strict Mode's setup/cleanup cycle.
      items.forEach((element) => {
        if (element.dataset.revealState === 'pending') delete element.dataset.revealState;
      });
    };
  }, []);
}
