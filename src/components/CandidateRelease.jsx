import candidate from '../data/candidate-release.json';
import { Button, Eyebrow } from './Primitives';
import Icon from './Icon';

export { candidate };
export const fileSize = (bytes) => `${(bytes / 1_000_000).toFixed(bytes < 10_000_000 ? 1 : 0)} MB`;

export function CandidateDetails({ platform }) {
  const file = candidate[platform];
  return (
    <details className="release-checksum candidate-checksum">
      <summary>Build details &amp; SHA-256</summary>
      <p>
        {file.filename} · {fileSize(file.bytes)}
      </p>
      <code>{file.sha256}</code>
      {platform === 'android' && (
        <>
          <p>Signing certificate SHA-256:</p>
          <code>{file.signingCertificateSha256}</code>
        </>
      )}
      <p>
        These identify the locally built candidate. A checksum is not hardware acceptance or a
        public download link.
      </p>
    </details>
  );
}

export function NextDesktopRelease() {
  return (
    <section className="next-release" aria-labelledby="next-desktop-title" id="next-desktop">
      <div>
        <Eyebrow>NEXT WINDOWS BUILD / IN TESTING</Eyebrow>
        <h2 id="next-desktop-title">A new connection starts here.</h2>
        <p>
          NYXR {candidate.version} adds the desktop half of the Android companion: secure pairing,
          phone commands, exact confirmations and usage controls.
        </p>
        <p>
          The {fileSize(candidate.windows.bytes)} installer is built and locally checked. It is
          unsigned. Account-service setup, Motorola acceptance and distribution checks remain open,
          so it has not replaced the public Windows download.
        </p>
        <CandidateDetails platform="windows" />
      </div>
      <div className="next-release-actions">
        <span className="release-channel">WINDOWS + ANDROID / PROTOCOL {candidate.protocol}</span>
        <Button disabled icon="download" aria-describedby="next-release-status">
          Windows beta 4 in testing
        </Button>
        <p id="next-release-status">
          Phone commands remain disabled until the verified account service and trusted allowance
          keys are configured.
        </p>
        <a className="text-link" href="/updates/">
          What changed <Icon size={16} />
        </a>
      </div>
    </section>
  );
}
