import { useEffect, useState } from 'react';
import { normalizePath, pageById } from '../data/pages';

function currentPath() {
  const legacy = location.pathname === '/' && pageById[location.hash.slice(1)];
  if (legacy) history.replaceState(null, '', legacy.path);
  return normalizePath(location.pathname);
}

export default function usePage() {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const update = () => setPath(currentPath());
    const follow = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = event.target.closest?.('a[href]');
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self'))
        return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol)) return;
      // Keep skip links and other genuine in-page anchors native.
      if (url.pathname === location.pathname && url.hash) return;
      event.preventDefault();
      const next = normalizePath(url.pathname);
      if (next !== normalizePath(location.pathname) || location.hash)
        history.pushState(null, '', next + url.search + url.hash);
      setPath(next);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    document.addEventListener('click', follow);
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    return () => {
      document.removeEventListener('click', follow);
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
    };
  }, []);
  return path;
}
