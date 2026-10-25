import { useEffect, useRef, useState } from 'react';
import { Button, Eyebrow, FeatureLine, Key, SectionHeading, Shot } from '../components/Primitives';
import Icon from '../components/Icon';
import Core from '../components/Core';
import { features, providers } from '../data/product';

const featurePaths = {
  'Student tutor': '/students/',
  Slideshows: '/slideshows/',
  Conversation: '/chat/',
  Coding: '/coding/',
  Projects: '/coding/',
  'Computer Use': '/computer-use/',
  Voice: '/voice/',
  'Write for me': '/voice/#write-for-me',
  'HUD & Full Screen': '/modes/',
  Skills: '/skills/',
  Macros: '/macros/',
  Memory: '/core/',
  Providers: '/providers/',
  Personalization: '/personalization/',
  'Visible progress': '/demo/',
  Teams: '/pricing/#teams-beta',
};

function Counter({ value, label }) {
  const ref = useRef(null);
  const [count, setCount] = useState(value);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / 700);
          setCount(Math.round(value * (1 - (1 - p) ** 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <div className="stat" ref={ref}>
      <strong>
        <span className="sr-only">{value}</span>
        <span aria-hidden="true">{String(count).padStart(2, '0')}</span>
      </strong>
      <span>{label}</span>
    </div>
  );
}

export function Introduction() {
  return (
    <section className="introduction section container" id="features" data-reveal>
      <div className="intro-copy">
        <Eyebrow number="01">THE ENVIRONMENT</Eyebrow>
        <h2>
          Less switching.
          <br />
          More <span className="serif-word">getting somewhere.</span>
        </h2>
        <p>
          Your conversations, projects, tools, and models belong in the same place. NYXR brings them
          together in a Windows desktop environment that keeps the work in view.
        </p>
      </div>
      <div className="intro-instrument">
        <div className="instrument-label">
          <i className="status-dot" /> ONE WORKSPACE. CONNECTED CAPABILITIES.
        </div>
        <div className="capability-ribbon">
          {[
            ['chat', 'Think'],
            ['code', 'Build'],
            ['cursor', 'Automate'],
            ['voice', 'Speak'],
          ].map(([icon, label]) => (
            <div key={label}>
              <Icon name={icon} size={24} />
              <span>{label}</span>
              <i />
            </div>
          ))}
        </div>
        <div className="intro-stats">
          <Counter value={7} label="featured themes" />
          <Counter value={3} label="desktop modes" />
          <div className="stat stat-n">
            <strong>N</strong>
            <span>your intelligence core</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ChatSection({ openShot }) {
  return (
    <section className="chat-section section container" id="chat">
      <div className="split-copy" data-reveal>
        <SectionHeading
          number="02"
          label="CONVERSATION"
          title={
            <>
              A thought. <br />A thread.
              <br />
              <span className="text-dim">A way forward.</span>
            </>
          }
        >
          Ask a quick question or work through something bigger. Keep the conversation, without
          losing the context.
        </SectionHeading>
        <div className="feature-lines">
          <FeatureLine title="Your workspace remembers">
            Independent chats, persistent history, and relevant project context.
          </FeatureLine>
          <FeatureLine title="Clarity, as it comes">
            Streaming responses, separate code blocks, and optional provider details.
          </FeatureLine>
        </div>
        <a className="text-link" href="/gallery/">
          A closer look at Chat <Icon size={16} />
        </a>
      </div>
      <div className="chat-visual" data-reveal>
        <div className="visual-caption">
          <span>CONVERSATION / 01</span>
          <span>AUTHORED SHOWCASE DATA</span>
        </div>
        <Shot
          name="chat"
          alt="The actual NYXR Chat page with an authored conversation about a website"
          caption="CHAT"
          onClick={() => openShot('chat')}
        />
        <div className="context-note">
          <span className="note-icon">
            <Icon name="memory" />
          </span>
          <div>
            <h3>Context, when it matters.</h3>
            <p>
              Conversation. Project. Current task.
              <br />
              The right details travel with you.
            </p>
          </div>
          <span className="note-rule" />
        </div>
      </div>
    </section>
  );
}

export function CodingSection({ openShot }) {
  return (
    <section className="coding-section section" id="coding">
      <div className="container">
        <div className="section-title-row" data-reveal>
          <SectionHeading
            number="03"
            label="PROJECTS & CODING"
            title={
              <>
                Build without
                <br />
                <span className="text-cyan">breaking context.</span>
              </>
            }
          />
          <div className="title-aside">
            <p>
              From the first file to the next iteration. A real workspace for the whole project,
              with changes you can inspect and progress you can follow.
            </p>
            <div className="keyboard-hints">
              <span>
                <Key>Ctrl</Key>
                <Key>P</Key> Find a file
              </span>
              <span>
                <Key>Ctrl</Key>
                <Key>Shift</Key>
                <Key>P</Key> Commands
              </span>
            </div>
          </div>
        </div>
        <div className="coding-frame" data-reveal>
          <div className="code-frame-heading">
            <span>
              <Icon name="folder" size={17} /> ORBIT WORKSPACE
            </span>
            <span className="source-tag">ACTUAL APP CAPTURE</span>
          </div>
          <Shot
            name="coding-detail"
            alt="Real NYXR project file explorer, HTML editor and coding assistant in an isolated Orbit workspace"
            caption="PROJECT WORKSPACE"
            onClick={() => openShot('projects')}
          />
          <div className="coding-bottom">
            <span>
              <i className="status-dot" /> INSPECT → PLAN → EDIT → VALIDATE
            </span>
            <span>YOUR FILES. YOUR PROJECT.</span>
          </div>
        </div>
        <div className="coding-principles" data-reveal>
          {[
            [
              '01',
              'Inspect before editing',
              'Existing files and project context inform the next change.',
            ],
            [
              '02',
              'Keep the last good version',
              'Candidates are staged and checked before promotion.',
            ],
            [
              '03',
              'Recover from the checkpoint',
              'Continue the file and stage instead of starting over.',
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ComputerSection() {
  return (
    <section className="control-section section container" id="computer">
      <div data-reveal>
        <SectionHeading
          number="05"
          label="COMPUTER CONTROL"
          title={
            <>
              From intent <br />
              to <span className="serif-word">execution.</span>
            </>
          }
        >
          Give NYXR a goal. It uses context to plan, tools to act, and state inspection to check
          what actually happened.
        </SectionHeading>
        <div className="control-tags">
          <span>Windows-Use</span>
          <span>Chrome connector</span>
          <span>Local operations</span>
        </div>
        <p className="footnote">
          Available actions depend on permissions, configured tools, and the current application.
        </p>
      </div>
      <div className="execution-diagram" data-reveal>
        <div className="diagram-top">
          <span>OPERATIONAL ARCHITECTURE</span>
          <Icon name="cursor" size={17} />
        </div>
        {[
          ['01', 'Understand the goal', 'User intent + relevant memory'],
          ['02', 'Create the plan', 'Structured steps + expected states'],
          ['03', 'Execute with tools', 'Windows-Use · browser · system'],
          ['04', 'Verify the outcome', 'Inspect state · recover if needed'],
        ].map(([num, title, desc]) => (
          <div className="execution-step" key={num}>
            <span className="step-orbit">{num}</span>
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
            <Icon name={num === '04' ? 'check' : 'down'} size={15} />
          </div>
        ))}
        <div className="diagram-note">
          <Icon name="shield" size={16} />
          <span>A successful action still needs a verified goal.</span>
        </div>
      </div>
    </section>
  );
}

export function VoiceSection({ openShot }) {
  const [state, setState] = useState('Idle');
  return (
    <section className="voice-section section" id="voice">
      <div className="voice-atmosphere" />
      <div className="container">
        <SectionHeading
          number="06"
          label="VOICE & HANDS-FREE"
          center
          title={
            <>
              A little less typing.
              <br />A little more <span className="text-cyan">flow.</span>
            </>
          }
        >
          Toggle hands-free with F11. Hold F8 to speak.
          <br />
          Or put a thought into the quick-text bubble and keep going.
        </SectionHeading>
        <div className={`voice-stage voice-${state.toLowerCase()}`} data-reveal>
          <div className="voice-orbit" />
          <div className="waveform" aria-hidden="true">
            {Array.from({ length: 49 }, (_, i) => (
              <i key={i} style={{ '--i': i, '--bar': `${12 + Math.sin(i * 1.37) ** 2 * 63}px` }} />
            ))}
          </div>
          <button
            className="dock-capture"
            onClick={() => openShot('voice-dock')}
            aria-label="Enlarge actual NYXR hands-free dock"
          >
            <img
              src="/screenshots/voice-dock.webp"
              alt="NYXR F11 dock with centered voice dots, quick-text input, Send and collapse controls"
              width="440"
              height="141"
              loading="lazy"
            />
            <span>ACTUAL F11 DOCK / IDLE CAPTURE</span>
          </button>
          <div className="voice-state-control">
            <span>EXPLORE THE STATES</span>
            <div role="group" aria-label="Voice animation preview state">
              {['Idle', 'Listening', 'Processing', 'Speaking'].map((s) => (
                <button
                  key={s}
                  aria-pressed={state === s}
                  className={state === s ? 'selected' : ''}
                  onClick={() => setState(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <small>Animation preview only. No microphone access.</small>
          </div>
        </div>
        <div className="shortcut-strip" data-reveal>
          {[
            ['F11', 'Hands-free on / off'],
            ['F8', 'Hold to speak'],
            ['F9', 'Stop speaking'],
            ['F10', 'Macro voice'],
          ].map(([k, l]) => (
            <div key={k}>
              <Key>{k}</Key>
              <span>{l}</span>
            </div>
          ))}
        </div>
        <article
          className="dictation-preview"
          id="write-for-me"
          aria-labelledby="dictation-preview-title"
        >
          <Eyebrow>BETA 3 / WRITE FOR ME</Eyebrow>
          <h3 id="dictation-preview-title">Write for me. Your words, in the right textbox.</h3>
          <p className="preview-availability">
            Included in the beta 3 installer. The capture above shows the earlier dock; the app
            adds the mode dropdown and writing controls for selecting a textbox and dictating.
          </p>
          <ol className="dictation-steps">
            <li>
              <span>01 / CHOOSE YOUR MODE</span>
              <h4>Open the F11 dropdown.</h4>
              <p>
                Press <Key>F11</Key>, then choose Write for me from the Assistant / Write for me /
                Macro voice mode dropdown.
              </p>
            </li>
            <li>
              <span>02 / SELECT AND SPEAK</span>
              <h4>Pick the textbox.</h4>
              <p>
                Choose Select textbox and click an editable field. Hold <Key>F8</Key> to dictate;
                release when you finish speaking.
              </p>
            </li>
            <li>
              <span>03 / OPTIONAL CORRECTION</span>
              <h4>Keep your meaning.</h4>
              <p>
                With Correct grammar on, your selected AI rewrites scores below 9/10. A score of
                9/10 or higher stays verbatim. Turn correction off to keep the transcription
                unchanged.
              </p>
            </li>
          </ol>
          <div className="dictation-details">
            <FeatureLine title="Checked insertion, without sending">
              NYXR checks the selected textbox before insertion and verifies the result. It does not
              press Send or submit the form. Cancel stops further writing; Copy last text copies the
              latest dictation.
            </FeatureLine>
            <FeatureLine title="Only your dictation goes to the grammar check">
              The speech service transcribes your audio. Your selected AI checks the dictated words;
              the textbox’s existing contents stay out of that grammar request.
            </FeatureLine>
          </div>
        </article>
      </div>
    </section>
  );
}

export function ProviderSection() {
  return (
    <section className="providers-section section container" id="providers">
      <div className="section-title-row" data-reveal>
        <SectionHeading
          number="07"
          label="SMART MODEL ROUTING"
          title={
            <>
              One interface.
              <br />
              <span className="text-dim">Many models.</span>
            </>
          }
        />
        <div className="title-aside">
          <p>
            {providers.length} NYXR integrations, including local Ollama and FreeLLMAPI’s broader
            upstream catalog. NYXR considers task needs, model capabilities, health, and your cost
            policy.
          </p>
          <span className="support-label">
            <i /> SUPPORTED INTEGRATIONS · SETUP REQUIRED
          </span>
        </div>
      </div>
      <div className="provider-map" data-reveal>
        <div className="provider-center">
          <Core small />
          <span>
            YOUR REQUEST.
            <br />
            THE RIGHT ROUTE.
          </span>
        </div>
        <div className="provider-grid">
          {providers.map(([name, mark, desc]) => (
            <div className={`provider-node ${name === 'Ollama' ? 'local-node' : ''}`} key={name}>
              <span className="provider-mark">{mark}</span>
              <div>
                <h3>{name}</h3>
                <span>{desc}</span>
              </div>
              <i />
            </div>
          ))}
        </div>
      </div>
      <div className="routing-strip" data-reveal>
        {[
          'Task compatibility',
          'Provider health',
          'Cost policy',
          'Quality & reliability',
          'Select route',
        ].map((s, i) => (
          <span key={s}>
            <small>0{i + 1}</small>
            {s}
            {i < 4 && <Icon size={12} />}
          </span>
        ))}
      </div>
      <p className="provider-disclosure">
        Provider availability, models, and charges depend on your account. Cloud requests use the
        selected service. Ashna AI is available in Settings → AI Providers, with secure key storage
        and account-quota access you explicitly enable. Ollama is manual-only unless local fallback
        is explicitly enabled. Bring your own keys or use an installed local model: there are no
        NYXR inference credits, and an NYXR account is optional.
      </p>
      <div className="provider-pricing-link">
        <p>
          {providers.length} integrations, with free access, trials and paid accounts clearly
          labeled. See the published limits and the token-cap calculation.
        </p>
        <Button href="/pricing/" secondary>
          Free tiers & pricing
        </Button>
      </div>
    </section>
  );
}

export function HudSection({ openShot }) {
  return (
    <section className="hud-section section container" id="hud">
      <div className="hud-scene" data-reveal>
        <div className="workspace-illustration" aria-hidden="true">
          <div className="desktop-top">
            <span>YOUR WORKSPACE</span>
            <span>◌ &nbsp; — &nbsp; □</span>
          </div>
          <div className="desktop-columns">
            <div className="faux-sidebar">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="focus-page">
              <span>SPACE TO FOCUS</span>
              <h3>
                Stay with
                <br />
                your work.
              </h3>
              <div className="faux-lines">
                <i />
                <i />
                <i />
              </div>
              <div className="focus-mountain" />
            </div>
          </div>
          <span className="scene-label">ILLUSTRATIVE WORKSPACE BACKGROUND</span>
        </div>
        <button
          className="hud-capture"
          onClick={() => openShot('hud')}
          aria-label="View real NYXR HUD screenshot"
        >
          <img
            src="/screenshots/hud.webp"
            alt="Actual side-docked NYXR HUD, with the orbital N Core and compact composer"
            width="380"
            height="740"
            loading="lazy"
          />
        </button>
        <span className="hud-callout">
          <i className="status-dot" /> ACTUAL HUD CAPTURE
        </span>
      </div>
      <div data-reveal>
        <SectionHeading
          number="08"
          label="HUD & FULL SCREEN"
          title={
            <>
              Beside your work.
              <br />
              <span className="text-dim">Out of the way.</span>
            </>
          }
        >
          Keep NYXR at the edge of your desktop. Ask, check in, and return to what you were doing.
        </SectionHeading>
        <FeatureLine title="Three distinct ways to work">
          The full desktop app, an expanded full-screen canvas, or a compact side-docked HUD.
        </FeatureLine>
        <a className="text-link" href="/gallery/">
          Explore the different modes <Icon size={16} />
        </a>
      </div>
    </section>
  );
}

export function SkillsSection({ openShot, mode = 'skills' }) {
  const macros = mode === 'macros';
  return (
    <section className="skills-section section container" id={macros ? 'macros' : 'skills'}>
      <div className="section-title-row" data-reveal>
        <SectionHeading
          number="09"
          label={macros ? 'MACROS / REPEATABLE WORKFLOWS' : 'SKILLS / TASK-SCOPED INTELLIGENCE'}
          title={
            <>
              {macros ? 'A useful workflow.' : 'The right approach.'}
              <br />
              {macros ? 'A repeatable ' : 'The right '}
              <span className="serif-word">{macros ? 'rhythm.' : 'context.'}</span>
            </>
          }
        />
        <p className="title-aside">
          {macros
            ? 'Record a useful sequence. Let NYXR understand the demonstrated steps, then run it with verification.'
            : 'Choose how NYXR approaches a task. Keep the relevant instructions with the work.'}
        </p>
      </div>
      <div className="skills-grid" data-reveal>
        {!macros && (
          <article className="skill-panel">
            <div className="panel-index">
              <Icon name="spark" />
              <span>01 / TASK-SCOPED INTELLIGENCE</span>
            </div>
            <h3>
              Change the approach.
              <br />
              Keep the context.
            </h3>
            <p>
              Skills shape the work for a turn, a task, or a pinned project. They don’t need to
              follow every unrelated conversation.
            </p>
            <div className="skill-cloud">
              {[
                '/coding',
                '/taste',
                '/research',
                '/debugging',
                '/ui-review',
                '/computer',
                '/macro',
              ].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <button className="text-link" onClick={() => openShot('skills')}>
              Inside the Skills workspace <Icon size={16} />
            </button>
          </article>
        )}
        {macros && (
          <article className="procedure-panel">
            <div className="panel-index">
              <Icon name="route" />
              <span>02 / REPEATABLE ACTIONS</span>
            </div>
            <h3>
              Record once.
              <br />
              Return to it.
            </h3>
            <p>
              Record a workflow. AI summarizes the recorded evidence into a grounded plan;
              Windows-Use resolves live targets, executes the steps and verifies the result. Changed
              or uncertain targets pause playback for review.
            </p>
            <div className="procedure-track">
              {[
                ['01', 'Record', 'F6'],
                ['02', 'Save', 'F5'],
                ['03', 'Plan + run', 'F10 voice'],
              ].map(([n, t, k]) => (
                <div key={n}>
                  <b>{n}</b>
                  <span>{t}</span>
                  <small>{k}</small>
                </div>
              ))}
            </div>
            <button className="text-link" onClick={() => openShot('macros')}>
              Inside the Macros workspace <Icon size={16} />
            </button>
          </article>
        )}
        <Shot
          name={macros ? 'macros' : 'skills'}
          alt={
            macros
              ? 'The actual NYXR Macros workspace with its recorded actions and plan'
              : 'The actual NYXR Skills workspace'
          }
          caption={macros ? 'MACROS' : 'SKILLS'}
          onClick={() => openShot(macros ? 'macros' : 'skills')}
        />
      </div>
    </section>
  );
}

export function CoreSection() {
  return (
    <section className="architecture-section section" id="intelligence">
      <div className="container">
        <SectionHeading
          number="11"
          label="N / INTELLIGENCE CORE"
          center
          title={
            <>
              There’s a system
              <br />
              behind the <span className="text-cyan">conversation.</span>
            </>
          }
        >
          A model reasons. Tools carry out the work.
          <br />
          NYXR keeps the context, progress, and outcome together.
        </SectionHeading>
        <div className="architecture-visual" data-reveal>
          <div className="architecture-core">
            <Core />
          </div>
          <div className="architecture-callout arch-left">
            <span>CONTEXT IN</span>
            <h3>
              Intent. <br />
              Memory. <br />
              Relevant skills.
            </h3>
            <p>What matters for this task.</p>
          </div>
          <div className="architecture-callout arch-right">
            <span>OUTCOMES OUT</span>
            <h3>
              Tools. <br />
              State. <br />
              Verification.
            </h3>
            <p>What actually happened.</p>
          </div>
        </div>
        <div className="architecture-flow" data-reveal>
          {['User', 'Intent', 'Skills', 'Router', 'Model', 'Tools', 'Verification', 'Response'].map(
            (t, i) => (
              <span key={t} className={i === 3 ? 'flow-highlight' : ''}>
                {t}
                {i < 7 && <Icon size={11} />}
              </span>
            ),
          )}
        </div>
        <p className="architecture-footnote">
          Operational architecture, not private model reasoning. Execution and verification depend
          on the task and available integrations.
        </p>
        <article className="architecture-example" aria-labelledby="dictation-core-title">
          <Eyebrow>BETA 3 / WRITE FOR ME</Eyebrow>
          <h3 id="dictation-core-title">Write for me, with a clear role for each tool.</h3>
          <p>
            The F11 dropdown separates Assistant, Write for me and Macro voice. Select a textbox and
            hold F8 to dictate. The speech service transcribes audio; with correction on, your
            selected AI checks only the dictation. Scores below 9/10 are rewritten; 9/10 or higher
            stays verbatim. Local tools check the target and verify insertion without submitting the
            text.
          </p>
          <p className="preview-availability">
            Included in the beta 3 installer and its matching source download.
          </p>
          <a className="text-link" href="/voice/#write-for-me">
            Explore Write for me <Icon size={16} />
          </a>
        </article>
      </div>
    </section>
  );
}

export function FeatureGrid() {
  return (
    <section className="feature-directory section container" id="capabilities">
      <div className="section-title-row" data-reveal>
        <SectionHeading
          number="12"
          label="THE WHOLE ENVIRONMENT"
          title={
            <>
              A lot comes together.
              <br />
              <span className="text-dim">You stay in one place.</span>
            </>
          }
        />
        <span className="directory-mark">
          N / 4.0
          <br />
          DESKTOP CAPABILITIES
        </span>
      </div>
      <div className="feature-grid" data-reveal>
        {features.map(([icon, t, d, availability], i) => (
          <a
            key={t}
            href={featurePaths[t] || '/features/'}
            className={i === 1 || i === 4 ? 'feature-card featured' : 'feature-card'}
          >
            <div className="feature-icon">
              <Icon name={icon} />
              <span>{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3>{t}</h3>
            {availability && <span className="feature-availability">{availability}</span>}
            <p>{d}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
