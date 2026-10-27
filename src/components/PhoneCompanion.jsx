import { Button, Eyebrow } from './Primitives';
import Icon from './Icon';
import { betaRelease } from '../data/release';
import { phoneLimits } from '../data/phone-plans';
import { CandidateDetails, candidate, fileSize } from './CandidateRelease';

export function CompanionDownload() {
  const companion = betaRelease.companion;
  return (
    <article
      className="release-card companion-card"
      aria-labelledby="companion-title"
      data-testid="companion-card"
    >
      <div className="release-card-top">
        <span>PHONE COMPANION / ANDROID</span>
        <Icon name="download" size={18} />
      </div>
      <div className="companion-symbol" aria-hidden="true">
        <span>N</span>
      </div>
      <span className="release-status">
        {companion.available ? 'PRIVATE BETA AVAILABLE' : 'SIGNED BUILD / IN TESTING'}
      </span>
      <h2 id="companion-title">Your phone, beside your core.</h2>
      <p>Android 10+ · same Wi-Fi · Motorola is the initial test target.</p>
      {!companion.available && (
        <p className="companion-build-version">
          {candidate.version} · {fileSize(candidate.android.bytes)} · signed APK built locally
        </p>
      )}
      <dl className="release-details">
        <div>
          <dt>Connection</dt>
          <dd>Paired phone &amp; Windows PC</dd>
        </div>
        <div>
          <dt>Beta scope</dt>
          <dd>Calls, SMS &amp; supported phone tasks</dd>
        </div>
        <div>
          <dt>Call audio on PC</dt>
          <dd>Not supported</dd>
        </div>
      </dl>
      {companion.available ? (
        <>
          <Button
            href={companion.apk.url}
            download={companion.apk.filename}
            icon="download"
            data-testid="companion-download"
          >
            Download signed Android APK
          </Button>
          <span className="release-note">
            Private beta {companion.version} · {(companion.apk.bytes / 1_000_000).toFixed(1)} MB
          </span>
          <details className="release-checksum">
            <summary>Verify Android APK</summary>
            <p>SHA-256 of this signed APK:</p>
            <code>{companion.apk.sha256}</code>
            <p>Signing certificate SHA-256:</p>
            <code>{companion.apk.signingCertificateSha256}</code>
            <a href="/beta-SHA256SUMS.txt" download>
              Download checksums
            </a>
          </details>
        </>
      ) : (
        <>
          <Button disabled icon="download" aria-describedby="companion-unavailable">
            Android beta coming soon
          </Button>
          <p className="release-note" id="companion-unavailable">
            Unavailable until a signed APK, a compatible updated desktop and Motorola hardware
            acceptance are verified. The current Windows beta does not include phone support.
          </p>
          <CandidateDetails platform="android" />
        </>
      )}
      <p className="companion-core-note">
        Free Core: {phoneLimits('core').actions.replace('/day planned', ' phone actions/day')} ·{' '}
        {phoneLimits('core').phones.replace(' planned', '')} when released.
      </p>
      <p className="release-note">
        Your mobile carrier’s call/SMS and data charges still apply. The free Core allowance covers
        NYXR actions only.
      </p>
      <div className="release-resource-links">
        <a href="/guide/#phone-companion">Setup &amp; permissions</a>
        <a href="/phone/">Explore the companion</a>
        <a href="/pricing/#phone-limits">Phone limits &amp; plans</a>
      </div>
    </article>
  );
}

export function CompanionFeatures() {
  const available = betaRelease.companion.available;
  return (
    <section className="companion-info container" aria-labelledby="phone-feature-title">
      <Eyebrow>PHONE COMPANION / {available ? 'PRIVATE BETA' : 'COMING TO PRIVATE BETA'}</Eyebrow>
      <h2 id="phone-feature-title">Keep your phone in reach.</h2>
      <p>
        {available
          ? 'The private Android beta connects'
          : 'The built Android beta is designed to connect'}{' '}
        your paired phone to NYXR over the same Wi-Fi. Android 10 or later is required; Motorola is
        the first hardware test target.{' '}
        {available
          ? 'Use the matching desktop release linked on Download.'
          : 'Phone features are not in the current Windows installer.'}
      </p>
      <div className="companion-feature-grid">
        <article>
          <h3>Reach someone, deliberately</h3>
          <p>
            Native calls and SMS use granted phone permissions and exact PC confirmation. WhatsApp
            replies require a fresh notification with a supported reply action.
          </p>
        </article>
        <article>
          <h3>Start WhatsApp on your phone</h3>
          <p>
            A new WhatsApp message is handed off to the phone. Review and send it there; this is not
            a silent desktop send.
          </p>
        </article>
        <article>
          <h3>Choose what to share</h3>
          <p>
            Phone content stays on your paired devices unless you explicitly use it with your
            selected AI provider. PC call audio is not supported.
          </p>
        </article>
      </div>
      <div className="button-row">
        <Button href="/download/#android-companion" secondary>
          Companion availability
        </Button>
        <a className="text-link" href="/guide/#phone-companion">
          Read the setup guide <Icon size={16} />
        </a>
      </div>
    </section>
  );
}

export function CompanionGuide() {
  const available = betaRelease.companion.available;
  return (
    <section id="phone-companion" className="companion-guide" aria-labelledby="phone-guide-title">
      <h2 id="phone-guide-title">Android phone companion / private beta</h2>
      <p>
        These are the public companion requirements. For the separate local tester build, follow
        the <a href="/guide/#exhibition-test">Exhibition Test guide</a>. Its local opt-in allowance
        does not activate the public companion release.
      </p>
      <p>
        {available
          ? 'The companion is available as a private beta. '
          : 'The signed beta 4 APK and matching desktop candidate are built and in testing. '}
        Check <a href="/download/#android-companion">Download</a> for a verified compatible pair
        before installing.{' '}
        {available
          ? 'Use only the matching desktop and signed APK linked there.'
          : 'The current Windows beta is not phone enabled. This public companion channel has no APK download yet; do not reuse the current installer as a phone-enabled release.'}
      </p>
      <ol>
        <li>
          <strong>Check your devices.</strong> The private beta targets Android 10+ and initially
          Motorola hardware. Connect your phone and Windows PC to the same trusted Wi-Fi.
          Guest-network isolation or firewall rules may prevent pairing.
        </li>
        <li>
          <strong>Install a verified pair when available.</strong> Use the desktop version and
          signed APK listed together on Download. Compare both file hashes and the APK signing
          certificate with the release record. Allow installation only from the source you chose; do
          not disable Android security checks.
        </li>
        <li>
          <strong>Pair locally.</strong> Open the phone companion and the matching desktop phone
          controls, then follow the pairing instructions on your own devices. Keep pairing codes
          private. In the new desktop build, open Settings → Connected devices → Phone, show the QR
          code, then approve the phone on both screens. Manual setup links are available if scanning
          or discovery fails. Hosted account/key setup must be ready before commands run.
        </li>
        <li>
          <strong>Grant access deliberately.</strong> Enable contacts, phone and SMS permissions
          only for the corresponding native features. Notification access can expose sender names
          and message previews; enable it only if you want notification reading or supported
          replies. Reply availability depends on the app, notification reply action, Android
          permissions and device restrictions. Review any additional permission before granting it.
        </li>
        <li>
          <strong>Review the action.</strong> Check the exact device, recipient and message on PC
          before confirming. Native SMS sending is tracked separately from recipient delivery.
          WhatsApp notification replies require a supported reply action. Starting a new WhatsApp
          message hands it to the phone for review and sending. PC call audio is outside this beta.
        </li>
        <li>
          <strong>Disconnect when finished.</strong> Revoke notification access in Android settings
          or unpair in the companion controls when available. Stop sharing sensitive content before
          sending a device for repair or passing it to someone else.
        </li>
      </ol>
      <p>
        Your mobile carrier’s call/SMS and data charges still apply. The free Core allowance covers
        NYXR actions only. For native SMS, a verified SENT status confirms sending; it does not
        confirm recipient delivery.
      </p>
      <p>
        Phone replies and handoffs have a separate action allowance from AI tokens. See{' '}
        <a href="/pricing/#phone-limits">phone limits on Pricing</a>. Paid plan previews do not
        unlock entitlements; payments remain inactive. If pairing fails, check Wi-Fi, permissions
        and battery restrictions, then contact support with sanitized diagnostics, never message
        contents or pairing secrets.
      </p>
      <p>
        Phone user content stays local to your paired devices except content you explicitly send to
        your selected AI provider for a request. Your messaging service still handles messages under
        its own terms. Read the{' '}
        <a href="/privacy/#privacy-phone-companion">phone privacy information</a>.
      </p>
    </section>
  );
}
