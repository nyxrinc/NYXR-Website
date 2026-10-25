export default function Core({ className = '', small = false }) {
  return (
    <div className={`n-core ${small ? 'n-core-small' : ''} ${className}`} aria-hidden="true">
      <div className="core-halo" />
      <div className="core-orbit orbit-one" />
      <div className="core-orbit orbit-two" />
      <div className="core-orbit orbit-three" />
      <div className="core-ring ring-one" />
      <div className="core-ring ring-two" />
      <div className="core-ring ring-three" />
      <div className="core-center">
        <svg className="core-glyph" viewBox="0 0 100 100" focusable="false" aria-hidden="true">
          <path d="M18 15H35L65 57V15H82V85H65L35 43V85H18Z" />
        </svg>
        <i />
      </div>
      <b className="core-satellite satellite-one" />
      <b className="core-satellite satellite-two" />
      {!small && <span className="core-caption">N / INTELLIGENCE CORE</span>}
    </div>
  );
}
