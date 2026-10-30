import { SourceAvailability } from './SourceUpdates';

export default function LatestSetupGuide() {
  return (
    <section className="latest-setup-guide" aria-label="Latest source setup instructions">
      <h2>Set up the recent additions.</h2>
      <SourceAvailability compact />
      <h3 id="openjarvis">OpenJarvis: choose local or cloud</h3>
      <p>
        Open Settings → AI Providers → OpenJarvis. The optional managed service needs its separate
        Python runtime. Under Managed inference, choose Local Ollama or Cloud and an exact model.
        Save cloud keys with Save key securely; credentials persist in Windows Credential Manager.
        Apply engine &amp; restart checks the service without generating a completion, then Use
        OpenJarvis selects it for NYXR. Cloud usage can incur provider charges.
      </p>
      <p>
        The server token and cloud API key are separate. A blank key keeps the saved one; Check
        saved key checks storage, not account credit or API access. A localhost bridge can still use
        cloud inference. <a href="/openjarvis/">Read the complete OpenJarvis guide</a>.
      </p>
      <h3 id="background-replies">Background Replies: start with drafts</h3>
      <p>
        In the updated desktop source, open Settings → Background replies. Connect the updated
        Chrome extension, grant WhatsApp Web site access, and select the intended tab and
        conversation. Start in Draft mode. Automatic replies require an explicit selection and
        consent for that conversation, with time and response limits.
      </p>
      <p>
        NYXR pauses for an active chat or existing draft and does not restart a session on app
        launch. Use Stop when finished. It never treats a send attempt as delivery, and uncertain
        submissions are inspected rather than replayed. This beta supports WhatsApp Web only.{' '}
        <a href="/computer-use/#background-replies">See browser capabilities and limitations</a>.
      </p>
      <h3 id="voice-presets">Voice and sound are separate</h3>
      <p>
        Keep Fish Audio or your existing voice, or open Voice settings and explicitly apply the
        ElevenLabs Jarvis-inspired British assistant preset. It uses Eldrin — Crisp British
        Baritone, rather than a licensed character voice. Check access reads metadata; Preview
        generates audio and may use credits. Personality changes do not switch voice providers
        automatically.
      </p>
      <p>
        Open Settings → SFX for JARVIS Interface sounds, master volume, per-event controls and voice
        ducking. Follow theme can follow JARVIS personality; a manual sound-pack choice is retained.
        Hover and typing sounds are off by default. No remote sound download is needed.
      </p>
      <h3 id="browser-help">If a browser task needs attention</h3>
      <p>
        Check the approved Chrome profile, site permission and intended tab. NYXR now repairs
        malformed initial verification plans before input starts. It stops when a submitted action
        remains uncertain, to avoid sending twice. Check the page and Agent Timeline before retrying
        a send. Do not paste API keys or private message content into a support report.
      </p>
    </section>
  );
}
