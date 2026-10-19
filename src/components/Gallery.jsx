import { useEffect, useRef, useState } from 'react';
import { gallery } from '../data/product';
import { SectionHeading } from './Primitives';
import Icon from './Icon';
import { trapDialogFocus } from './modalFocus';
export function Gallery({ openShot }) {
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? gallery : gallery.filter((g) => g.category === filter);
  return (
    <section className="gallery-section section container" id="gallery">
      <div className="section-title-row" data-reveal>
        <SectionHeading
          number="14"
          label="INSIDE THE ENVIRONMENT"
          title={
            <>
              A closer look.
              <br />
              <span className="text-dim">Every side of NYXR.</span>
            </>
          }
        />
        <p className="title-aside">
          Actual captures from NYXR 4.0.
          <br />
          Open a frame. Look around.
        </p>
      </div>
      <div className="gallery-filters" role="group" aria-label="Filter screenshot gallery">
        {['All', 'Workspace', 'Modes', 'Personalization'].map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            className={filter === f ? 'selected' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
            {filter === f && <span>{shown.length}</span>}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {shown.map((g, i) => (
          <button
            key={g.id}
            className={`gallery-item gallery-${g.id}`}
            onClick={() => openShot(g.id)}
          >
            <div className="gallery-image">
              <img
                src={`/screenshots/${g.id}.webp`}
                alt={g.title + ' — actual NYXR capture'}
                width={
                  g.id === 'hud'
                    ? 380
                    : g.id === 'voice-dock'
                      ? 440
                      : g.id === 'fullscreen'
                        ? 1920
                        : 1650
                }
                height={
                  g.id === 'hud'
                    ? 740
                    : g.id === 'voice-dock'
                      ? 132
                      : g.id === 'fullscreen'
                        ? 1080
                        : 920
                }
                loading="lazy"
              />
              <span className="gallery-expand">
                <Icon name="expand" size={18} />
              </span>
            </div>
            <div className="gallery-item-caption">
              <div>
                <span>
                  {String(i + 1).padStart(2, '0')} / {g.category}
                </span>
                <h3>{g.title}</h3>
              </div>
              <Icon size={17} />
            </div>
          </button>
        ))}
      </div>
      <p className="capture-caption">
        Showcase data only. Images are real app captures, locally cropped and compressed. They do
        not imply active provider connections or completed AI tasks.
      </p>
    </section>
  );
}

export function Lightbox({ selected, onClose, onSelect }) {
  const ref = useRef(null);
  const opener = useRef(null);
  const item = gallery.find((g) => g.id === selected) || {
    id: selected,
    title: selected?.startsWith('theme-')
      ? `NYXR / ${selected.replace('theme-', '')} theme`
      : 'NYXR app capture',
    description: 'Actual NYXR UI in the isolated showcase session. No live provider connections.',
  };
  useEffect(() => {
    if (selected) {
      if (!ref.current.open) {
        opener.current = document.activeElement;
        ref.current.showModal();
      }
    } else if (ref.current.open) {
      ref.current.close();
      opener.current?.focus();
    }
  }, [selected]);
  function move(delta) {
    const index = gallery.findIndex((g) => g.id === selected);
    onSelect(gallery[(Math.max(0, index) + delta + gallery.length) % gallery.length].id);
  }
  return (
    <dialog
      className="lightbox"
      ref={ref}
      aria-label="NYXR screenshot viewer"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      onKeyDown={(e) => {
        trapDialogFocus(e);
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          move(-1);
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          move(1);
        }
      }}
    >
      <div className="lightbox-top">
        <span>NYXR / INSIDE THE ENVIRONMENT</span>
        <button className="icon-button" aria-label="Close screenshot viewer" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      {selected && (
        <div className="lightbox-image">
          <img src={`/screenshots/${selected}.webp`} alt={item.title} />
        </div>
      )}
      <div className="lightbox-bottom">
        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
        <div className="lightbox-arrows">
          <button className="icon-button" aria-label="Previous screenshot" onClick={() => move(-1)}>
            <Icon style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button className="icon-button" aria-label="Next screenshot" onClick={() => move(1)}>
            <Icon />
          </button>
        </div>
      </div>
    </dialog>
  );
}
