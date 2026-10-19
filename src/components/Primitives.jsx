import Icon from './Icon';
export function Eyebrow({ number, children }) {
  return (
    <div className="eyebrow">
      <span className="cross">+</span>
      {number && <span className="section-no">{number} /</span>}
      {children}
    </div>
  );
}
export function SectionHeading({ number, label, title, children, center = false }) {
  return (
    <header className={`section-heading ${center ? 'center' : ''}`}>
      <Eyebrow number={number}>{label}</Eyebrow>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}
export function Button({
  href,
  children,
  secondary = false,
  icon = 'arrow',
  className = '',
  ...props
}) {
  const Tag = href ? 'a' : 'button';
  const magnetic = (e) => {
    if (
      !matchMedia('(pointer:fine)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.dataset.motion === 'off'
    )
      return;
    const el = e.currentTarget,
      rect = el.getBoundingClientRect();
    el.style.setProperty('--magnet-x', `${((e.clientX - rect.left) / rect.width - 0.5) * 5}px`);
    el.style.setProperty('--magnet-y', `${((e.clientY - rect.top) / rect.height - 0.5) * 3}px`);
  };
  const reset = (e) => {
    e.currentTarget.style.setProperty('--magnet-x', '0px');
    e.currentTarget.style.setProperty('--magnet-y', '0px');
  };
  return (
    <Tag
      href={href}
      className={`button ${secondary ? 'button-secondary' : ''} ${className}`}
      onPointerMove={magnetic}
      onPointerLeave={reset}
      {...props}
    >
      <span>{children}</span>
      <Icon name={icon} size={17} />
    </Tag>
  );
}
export function Shot({
  name,
  alt,
  caption,
  className = '',
  priority = false,
  detail = false,
  onClick,
}) {
  return (
    <figure className={`product-shot ${className}`}>
      <div className="shot-bar">
        <span>
          <i />
          <i />
          <i />
        </span>
        <span>
          NYXR 4.0 <b>/</b> {caption || 'SHOWCASE WORKSPACE'}
        </span>
        <Icon name="expand" size={12} />
      </div>
      {onClick ? (
        <button className="shot-open" onClick={onClick} aria-label={`Enlarge ${alt}`}>
          <img
            src={`/screenshots/${name}.webp`}
            alt={alt}
            width={name === 'chat-detail' ? 1120 : name === 'coding-detail' ? 1435 : 1650}
            height={name === 'chat-detail' ? 341 : name === 'coding-detail' ? 850 : 920}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
          />
          <span className="shot-zoom">
            <Icon name="expand" /> View capture
          </span>
        </button>
      ) : (
        <img
          src={`/screenshots/${name}.webp`}
          alt={alt}
          width={1650}
          height={920}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
        />
      )}
    </figure>
  );
}
export function FeatureLine({ title, children }) {
  return (
    <div className="feature-line">
      <span className="feature-check">
        <Icon name="check" size={14} />
      </span>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}
export function Key({ children }) {
  return <kbd>{children}</kbd>;
}
