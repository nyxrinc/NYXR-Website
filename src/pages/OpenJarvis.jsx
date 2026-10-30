import { useState } from 'react';
import Core from '../components/Core';
import Icon from '../components/Icon';
import { Button, Eyebrow } from '../components/Primitives';
import { SourceAvailability } from '../components/SourceUpdates';
import { openJarvisCloudProviders } from '../data/whats-new';

export default function OpenJarvis() {
  const [mode, setMode] = useState('local');
  return (
    <div className="openjarvis-page container">
      <section className="openjarvis-hero" aria-labelledby="openjarvis-title">
        <div>
          <Eyebrow>OPENJARVIS / MANUAL INFERENCE BRIDGE</Eyebrow>
          <h1 id="openjarvis-title">
            Your model.
            <br />
            <span className="text-cyan">NYXR’s tools.</span>
          </h1>
          <p>
            Use OpenJarvis to power text, coding and planning. Pick an installed local model or
            connect a cloud provider. NYXR handles the desktop actions, permissions and
            verification.
          </p>
          <div className="button-row">
            <Button href="#openjarvis-setup">How to connect</Button>
            <Button href="/providers/" secondary>
              All AI connections
            </Button>
          </div>
        </div>
        <div
          className="inference-orbit"
          aria-label="OpenJarvis supplies inference; NYXR executes approved actions"
        >
          <Core />
          <div className="inference-orbit-label">THE NYXR CORE</div>
          <div className="inference-path">
            <span>YOUR MODEL</span>
            <Icon />
            <span>NYXR TOOLS</span>
            <Icon />
            <span>VERIFICATION</span>
          </div>
        </div>
      </section>
      <SourceAvailability />
      <section className="inference-choice" aria-labelledby="inference-choice-title">
        <div>
          <Eyebrow>ONE EXPLICIT CHOICE</Eyebrow>
          <h2 id="inference-choice-title">Where should the thinking happen?</h2>
          <p>
            The bridge runs on your PC. The engine you choose determines where the request goes.
          </p>
        </div>
        <div className="inference-toggle" role="group" aria-label="Preview inference location">
          <button aria-pressed={mode === 'local'} onClick={() => setMode('local')}>
            <Icon name="code" />
            Local Ollama
          </button>
          <button aria-pressed={mode === 'cloud'} onClick={() => setMode('cloud')}>
            <Icon name="nodes" />
            Cloud provider
          </button>
        </div>
        <div className="inference-mode" aria-live="polite">
          <span className="source-label">
            ILLUSTRATIVE SETUP · {mode === 'local' ? 'LOCAL' : 'CLOUD'}
          </span>
          <h3>
            {mode === 'local'
              ? 'Your hardware. An installed model.'
              : 'Your provider. Your own API key.'}
          </h3>
          <p>
            {mode === 'local'
              ? 'Explicitly select an already installed Ollama text model, such as Qwen 2.5 Coder. NYXR gives managed local inference time to load. No weights are downloaded by opening this page or the settings.'
              : 'Choose a supported provider and an exact text-model ID. Save the key securely on Windows, then apply the engine. Cloud usage follows that provider’s pricing, account limits and data policies.'}
          </p>
          <div className="inference-model-line">
            <span>{mode === 'local' ? 'Example model' : 'Supported cloud choices'}</span>
            <strong>
              {mode === 'local' ? 'qwen2.5-coder:7b' : openJarvisCloudProviders.join(' · ')}
            </strong>
          </div>
          <p className="source-feature-detail">
            This website preview does not connect to a model, accept credentials or generate a
            request. OpenJarvis is never added to AUTO fallback.
          </p>
        </div>
      </section>
      <section
        className="openjarvis-setup"
        id="openjarvis-setup"
        aria-labelledby="openjarvis-setup-title"
      >
        <Eyebrow>SET UP ON WINDOWS</Eyebrow>
        <h2 id="openjarvis-setup-title">Connect once. Keep the key secure.</h2>
        <p>
          In an updated source installation, open Settings → AI Providers → OpenJarvis → Managed
          inference. OpenJarvis needs a separate supported Python environment; it is an optional
          integration, not bundled model weights.
        </p>
        <ol>
          {[
            [
              'Choose local or cloud',
              'Use an installed Ollama model, or choose Cloud and a provider. Enter the provider’s exact text-model ID; for OpenRouter, the OpenJarvis prefix is added once.',
            ],
            [
              'Save the cloud key securely',
              'The masked field saves to Windows Credential Manager and verifies storage. Blank input keeps the existing key. Check saved key checks storage only, without a provider request.',
            ],
            [
              'Apply the engine',
              'Set context and output budgets the model supports, then choose Apply engine & restart managed service. This checks service metadata without generating text.',
            ],
            [
              'Select it for NYXR',
              'Choose Use OpenJarvis. A message can now use that explicit connection. The normal NYXR executor remains responsible for computer and browser actions.',
            ],
          ].map(([title, text], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="inference-safety">
          <Icon name="shield" size={22} />
          <div>
            <h3>Separate credentials. Clear execution.</h3>
            <p>
              The optional server token authenticates the local bridge. The cloud API key
              authenticates your selected provider. Keys stay out of website forms, preferences,
              command arguments and screenshots. Cloud inference is labeled CLOUD even when its
              bridge is on localhost.
            </p>
            <p>
              This bridge currently accepts text. Use NYXR’s compatible vision routes for image
              requests. It does not expose OpenJarvis shell tools or an autonomous agent endpoint.
            </p>
          </div>
        </div>
      </section>
      <figure className="openjarvis-capture">
        <div>
          <Eyebrow>INSIDE NYXR / ACTUAL SETTINGS</Eyebrow>
          <h2>
            A visible choice.
            <br />A secure connection.
          </h2>
          <p>
            Local and cloud controls live together, with a separate masked API-key field and
            explicit Apply action.
          </p>
          <figcaption>
            Actual Qt settings in an isolated showcase. The model ID is an example; no real
            credentials are shown.
          </figcaption>
        </div>
        <img
          src="/screenshots/openjarvis-settings.webp"
          width="900"
          height="850"
          loading="lazy"
          alt="Actual dark NYXR OpenJarvis settings with a cloud provider selector, blank API key field, secure save controls, model and token budgets"
        />
      </figure>
      <section className="openjarvis-questions">
        <h2>A few useful distinctions.</h2>
        {[
          [
            'Does connecting OpenJarvis start paid requests?',
            'Saving a key and reading the managed service catalog do not generate completions. Sending work through a selected cloud model may use credits. Availability and costs depend on the provider.',
          ],
          [
            'Can I keep using local models?',
            'Yes. Local Ollama remains an explicit choice. Cloud failure does not silently launch Ollama unless local fallback was deliberately enabled.',
          ],
          [
            'Is OpenWhispr the same thing?',
            'No. NYXR’s OpenWhispr connection provides supported speech/transcription features. Its MCP endpoint is not a chat-model provider. OpenJarvis provides model inference through this separate text bridge.',
          ],
        ].map(([title, text]) => (
          <details key={title}>
            <summary>{title}</summary>
            <p>{text}</p>
          </details>
        ))}
        <a className="text-link" href="/guide/">
          Continue to the setup guide <Icon size={16} />
        </a>
      </section>
    </div>
  );
}
