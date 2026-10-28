import { useState } from 'react';
import Core from '../components/Core';
import Icon from '../components/Icon';
import { Button, Eyebrow } from '../components/Primitives';
import { candidate } from '../components/CandidateRelease';
import {
  exhibitionRelease,
  ExhibitionScope,
  PlayProtectHelp,
} from '../components/ExhibitionRelease';

const examples = [
  {
    label: 'Check in',
    request: 'Show my phone battery.',
    result: 'Read the paired phone’s battery status.',
    icon: 'nodes',
  },
  {
    label: 'Reach someone',
    request: 'Send Jamie an SMS saying I’m on my way.',
    result: 'Resolve the contact, review the exact message, then confirm on your PC.',
    icon: 'chat',
  },
  {
    label: 'Stay focused',
    request: 'On my phone, mute the media volume.',
    result: 'Confirm the change and read back the supported volume setting.',
    icon: 'voice',
  },
];

export function PhoneShowcase({ full = false }) {
  const [active, setActive] = useState(0);
  const example = examples[active];
  return (
    <section
      className={`phone-showcase container ${full ? 'phone-showcase-full' : ''}`}
      aria-labelledby={full ? 'phone-title' : 'home-phone-title'}
    >
      <div className="phone-showcase-copy">
        <Eyebrow>YOUR CORE / A LITTLE MORE REACH</Eyebrow>
        {full ? (
          <h1 id="phone-title">
            Your voice.
            <br />
            Your PC.
            <br />
            <span>Your phone.</span>
          </h1>
        ) : (
          <h2 id="home-phone-title">
            Your world,
            <br />
            <span>in the same orbit.</span>
          </h2>
        )}
        <p>
          The Android companion brings supported phone tasks into your Windows conversation. Check a
          device, prepare a message or manage media without breaking your train of thought.
        </p>
        <span className="release-channel">ANDROID BETA {candidate.version} / IN TESTING</span>
        <p className="phone-availability">
          Built, signed and being tested. Phone control is not active in the current public release.
        </p>
        {full && (
          <p className="phone-availability">
            Testing your own phone?{' '}
            <a href="/download/#exhibition-test">
              Exhibition {exhibitionRelease.edition === 'basic' ? 'Basic' : 'Test'}{' '}
              {exhibitionRelease.version}
            </a>{' '}
            is a separate local testing channel with explicit opt-in on both devices. Use the{' '}
            <a href="/guide/#exhibition-test">Exhibition Test guide</a> with the updated repository
            on your PC; the public beta 3 installer is not compatible.
          </p>
        )}
        <div className="button-row">
          <Button href={full ? '/download/#android-companion' : '/phone/'}>
            {full ? 'See downloads & status' : 'Meet the phone companion'}
          </Button>
          <a className="text-link" href="/guide/#phone-companion">
            Setup guide <Icon size={16} />
          </a>
        </div>
      </div>
      <div
        className="phone-orbit-preview"
        aria-label="Illustrated phone workflow, not a live connection"
      >
        <div className="phone-orbit-core" aria-hidden="true">
          <Core small />
        </div>
        <div className="phone-outline">
          <div className="phone-speaker" aria-hidden="true" />
          <header>
            <span>NYXR COMPANION</span>
            <Icon name="shield" size={17} />
          </header>
          <div className="phone-signal">
            <span>N</span>
            <small>ONE APPROVED CONNECTION</small>
          </div>
          <div className="phone-example">
            <span>YOU COULD ASK</span>
            <p>{example.request}</p>
          </div>
          <div className="phone-example-result">
            <Icon name={example.icon} size={20} />
            <p>{example.result}</p>
          </div>
          <footer>WORKFLOW ILLUSTRATION · NOT LIVE</footer>
        </div>
        <div className="phone-example-controls" aria-label="Example phone commands">
          {examples.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={active === index}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const capabilities = [
  [
    'chat',
    'Calls & messages',
    'Resolve contacts, clarify SIM choices, and confirm exact outgoing actions. Call audio stays on your phone or headset.',
  ],
  [
    'nodes',
    'Notifications, with boundaries',
    'Read or dismiss approved notifications. Reply only when a fresh notification exposes a supported reply action.',
  ],
  [
    'route',
    'Apps & everyday controls',
    'Open supported apps and links, check battery, adjust supported volume, brightness and flashlight controls.',
  ],
  [
    'play',
    'Media & small routines',
    'Control a supported active media session. Alarm, calendar and timer handoffs can still need a tap on your phone.',
  ],
  [
    'folder',
    'Files you choose',
    'Transfer selected files through Android’s document picker. The beta limits individual transfers to 512 KB.',
  ],
  [
    'shield',
    'A result you can inspect',
    'Submitted, verified, permission required and uncertain are separate outcomes. Repeating a command ID does not repeat a send.',
  ],
];

export default function Phone() {
  return (
    <>
      <PhoneShowcase full />
      <section className="phone-principles container" aria-labelledby="phone-principles-title">
        <Eyebrow>PAIRED DELIBERATELY</Eyebrow>
        <h2 id="phone-principles-title">Full companion capabilities / in testing</h2>
        <p>
          These full companion features are separate from Exhibition Basic. Check Basic’s limits
          below.
        </p>
        <div className="phone-capability-grid">
          {capabilities.map(([icon, title, text]) => (
            <article key={title}>
              <Icon name={icon} size={25} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="phone-setup-strip container" aria-labelledby="phone-setup-title">
        <div>
          <Eyebrow>ANDROID 10+ / SAME WI-FI</Eyebrow>
          <h2 id="phone-setup-title">
            Two devices.
            <br />
            One trusted connection.
          </h2>
        </div>
        <ol>
          <li>
            <strong>Start on Windows.</strong> Open Settings → Connected devices → Phone in the
            matching phone-enabled build.
          </li>
          <li>
            <strong>Pair both screens.</strong> Scan the short-lived QR code or paste its private
            setup link. Approve the connection on both devices.
          </li>
          <li>
            <strong>Choose permissions.</strong> Enable only the capabilities you need. Pause,
            disconnect or revoke access when you want.
          </li>
        </ol>
      </section>
      <aside className="phone-boundaries container">
        <h2>Know before you connect.</h2>
        <p>
          Android first; Motorola is the initial hardware test target. No iPhone support, internet
          relay, silent unlocking, universal app control or PC call-audio routing. New WhatsApp
          conversations open for review on the phone; notification replies depend on the app.
        </p>
        <p>
          Public companion execution requires a verified NYXR account. Public account setup and
          real-device acceptance are still pending. Carrier call/SMS/data charges and your chosen AI
          provider’s terms still apply.
        </p>
        <p>
          Exhibition Test requires no account after opting in on both devices: 30 local test actions
          per UTC day, no premium entitlement. Permissions and confirmations still apply;
          physical-device acceptance is pending.
        </p>
        <ExhibitionScope />
        <PlayProtectHelp />
        <div className="release-resource-links">
          <a href="/pricing/#phone-limits">Phone allowance</a>
          <a href="/privacy/#privacy-phone-companion">Phone privacy</a>
          <a href="/updates/">Release progress</a>
        </div>
      </aside>
    </>
  );
}
