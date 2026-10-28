import { Button, Eyebrow } from './Primitives';

export const exhibitionRelease = __NYXR_EXHIBITION_RELEASE__;

export function ExhibitionScope() {
  if (exhibitionRelease.edition !== 'basic') return null;
  return (
    <div data-testid="exhibition-basic-scope">
      <p>
        <strong>Basic capabilities:</strong> battery status, listing and opening apps, media volume,
        torch, selected files, links and productivity handoffs (such as alarms, timers and
        calendar). Handoffs may need a tap on the phone.
      </p>
      <p>
        <strong>Not included in Basic:</strong> calls, SMS, contacts, notification reading or
        replies, WhatsApp actions and media playback control. Media volume adjusts loudness only.
        Basic removes call, SMS and contacts permissions and the notification listener.
      </p>
      <p>
        Android may request <code>POST_NOTIFICATIONS</code> for NYXR’s own session notification.
        This does not allow reading or replying to other apps’ notifications.
      </p>
    </div>
  );
}

export function PlayProtectHelp() {
  return (
    <p data-testid="play-protect-help">
      <strong>Play Protect blocked an install?</strong> Keep Play Protect enabled. The older full
      beta 5 has been blocked on a tester’s device; it is not the default download. Basic uses fewer
      permissions, but installation cannot be guaranteed. If Android blocks it, stop and consult{' '}
      <a href="https://developers.google.com/android/play-protect/warning-dev-guidance">
        Google’s official Play Protect guidance
      </a>
      .
    </p>
  );
}

export function ExhibitionDownload() {
  const release = exhibitionRelease;
  const basic = release.edition === 'basic';
  return (
    <article
      id="exhibition-test"
      className="next-release exhibition-release"
      aria-labelledby="exhibition-title"
      data-testid="exhibition-card"
    >
      <div>
        <Eyebrow>SEPARATE ANDROID CHANNEL / LOCAL TESTING</Eyebrow>
        <h2 id="exhibition-title">{basic ? 'NYXR Exhibition Basic' : 'Exhibition Test'}</h2>
        <p>
          {release.version} · Android 10+ · same Wi-Fi. Test your own phone with the updated
          repository on your current PC. This is an experimental tester build; physical-device
          acceptance is still pending.
        </p>
        <p>
          <strong>Desktop required:</strong> update the repository, close the running NYXR app and
          restart with <code>run_nyxr.bat</code>. The public beta 3 installer is not compatible.
          Enable <strong>Use the Exhibition tester</strong> (Local exhibition testing) in the desktop Phone settings and opt in
          on the phone too.
        </p>
        <p>
          30 test actions per UTC day, counted locally. No account required; this grants no premium
          entitlement. Permissions and exact action confirmations still apply.
        </p>
        <p>
          <strong>Guided connection:</strong> on PC, choose the Exhibition tester and show its QR.
          On Android, tap <strong>Scan PC QR</strong>, approve the PC, then approve your phone on
          Windows. Use <strong>Test battery connection</strong> to check the complete connection.
          Once ready, ask “What’s my battery?” in NYXR voice or chat.
        </p>
        <ExhibitionScope />
        <PlayProtectHelp />
      </div>
      <div className="next-release-actions">
        <span className="release-channel">EXHIBITION TEST / NOT HARDWARE ACCEPTED</span>
        {release.available ? (
          <>
            <Button
              href={release.apk.url}
              download={release.apk.filename}
              icon="download"
              data-testid="exhibition-download"
            >
              {basic ? 'Download signed Exhibition Basic APK' : 'Download signed Exhibition APK'}
            </Button>
            <p>
              {release.apk.filename} · {(release.apk.bytes / 1_000_000).toFixed(1)} MB
            </p>
            <details className="release-checksum candidate-checksum">
              <summary>Verify Exhibition APK &amp; source</summary>
              <p>APK SHA-256:</p>
              <code>{release.apk.sha256}</code>
              <p>Signing certificate SHA-256:</p>
              <code>{release.apk.signingCertificateSha256}</code>
              <p>Matching source SHA-256:</p>
              <code>{release.source.sha256}</code>
              <a href={release.source.url} download={release.source.filename}>
                Exhibition corresponding source
              </a>
            </details>
          </>
        ) : (
          <>
            <Button disabled icon="download" aria-describedby="exhibition-unavailable">
              {basic
                ? 'Exhibition Basic APK awaiting publication'
                : 'Exhibition APK awaiting publication'}
            </Button>
            <p id="exhibition-unavailable">
              The tester download opens here after the signed APK and matching source are hosted and
              their exact sizes, checksums and signing certificate are recorded.
            </p>
          </>
        )}
        <a className="text-link" href="/guide/#exhibition-test">
          Exhibition Test setup guide
        </a>
      </div>
    </article>
  );
}

export function ExhibitionGuide() {
  const basic = exhibitionRelease.edition === 'basic';
  return (
    <section
      id="exhibition-test"
      className="companion-guide"
      aria-labelledby="exhibition-guide-title"
    >
      <h2 id="exhibition-guide-title">
        {basic ? 'NYXR Exhibition Basic' : 'Exhibition Test'} / local phone testing
      </h2>
      <p>
        Use the separate <a href="/download/#exhibition-test">Exhibition Test download channel</a>.
        This tester app uses <code>com.nyxr.companion.exhibition</code>. It is experimental and has
        not passed physical-device acceptance. The public companion retains its production account,
        compatible-desktop and hardware acceptance requirements.
      </p>
      <ExhibitionScope />
      <PlayProtectHelp />
      <ol>
        <li>
          <strong>Prepare both devices.</strong> Use Android 10 or later and connect your phone and
          current Windows PC to the same trusted Wi-Fi. Guest Wi-Fi isolation or firewall rules can
          block pairing.
        </li>
        <li>
          <strong>Run the updated repository on this PC.</strong> Get the current exhibition desktop
          changes, close any running NYXR instance and restart using <code>run_nyxr.bat</code> from
          that updated repository. The public beta 3 installer is not compatible. An older running
          desktop will not pick up the changes until restarted.
        </li>
        <li>
          <strong>Enable local testing on the desktop.</strong> Open Settings → Connected devices →
          Phone and tick <strong>Use the Exhibition tester</strong> (Local exhibition testing).
          Click <strong>Show QR to connect</strong>. This is an explicit local
          allowance: no NYXR account is required, and it does not grant a premium plan.
        </li>
        <li>
          <strong>Install the signed tester APK and opt in.</strong> When its download is available,
          compare the APK SHA-256 and signing certificate with the Exhibition Test card. Install{' '}
          {basic ? 'NYXR Exhibition Basic' : 'the Exhibition APK'}, open it and enable <strong>Local testing</strong>,
          then tap <strong>Scan PC QR</strong>. Both devices must opt in. Allow installation from your chosen source
          only as needed; keep Android security checks enabled.
        </li>
        <li>
          <strong>Pair and approve both screens.</strong> Show the desktop’s short-lived pairing QR
          code or use its private setup link, then approve the connection on both devices. Keep
          pairing codes and links private.
        </li>
        <li>
          <strong>Choose permissions and keep confirmations.</strong> Grant only the permissions
          needed for each test. Review the exact device and action before confirming. Local testing
          does not bypass permissions or action confirmations.
        </li>
        <li>
          <strong>Start with battery, apps and volume.</strong> Ask “Show my phone battery,” then
          “List apps on my phone,” then request a small media-volume change. Inspect the result on
          the phone and desktop. A submitted or simulated receipt is not proof the physical action
          happened.
          {' '}The updated desktop also includes <strong>Test battery connection</strong> and
          understands “What’s my battery?” when one phone is connected. If it is offline, locked or
          awaiting approval, follow the next-step message rather than pairing again unnecessarily.
        </li>
        {!basic && (
          <li>
            <strong>Keep communication simulation ON for initial tests.</strong> It is ON by
            default. Simulated calls and messages do not establish real calling or message delivery.
            Any deliberate real communication test still needs permissions and exact confirmations;
            carrier charges may apply. A new WhatsApp message requires review and sending on the
            phone. PC call audio is unsupported.
          </li>
        )}
        <li>
          <strong>Respect the local allowance and finish cleanly.</strong> You get 30 test actions
          per UTC day, tracked locally rather than as a premium entitlement. When finished, turn off
          Local exhibition testing, opt out on the phone and unpair or revoke permissions as needed.
          Share only sanitized diagnostics, never message contents or pairing secrets.
        </li>
      </ol>
    </section>
  );
}
