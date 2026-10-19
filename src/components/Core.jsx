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
        <span>N</span>
        <i />
      </div>
      <b className="core-satellite satellite-one" />
      <b className="core-satellite satellite-two" />
      {!small && <span className="core-caption">N / INTELLIGENCE CORE</span>}
    </div>
  );
}
