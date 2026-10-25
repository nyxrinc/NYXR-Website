import Core from '../components/Core';
import Icon from '../components/Icon';
import { Button, Eyebrow, Shot } from '../components/Primitives';
export default function Hero({ openShot }) {
  return (
    <section className="hero" id="overview" aria-labelledby="hero-title">
      <div className="hero-grid" />
      <div className="hero-atmosphere" />
      <div className="hero-topline container">
        <span>THE HEART OF YOUR WINDOWS WORKSPACE.</span>
        <span>
          <i className="status-dot" /> NYXR / VERSION 4.0
        </span>
      </div>
      <div className="hero-copy">
        <Eyebrow>NEXUS / THE NYXR COMMAND CENTER</Eyebrow>
        <h1 id="hero-title">
          NYXR
          <span className="title-star" aria-hidden="true">
            ✳
          </span>
        </h1>
        <h2>
          A living core. <span>A world of possibilities.</span>
        </h2>
        <p>
          Your own AI command center for Windows. Speak an idea, build a project, automate a
          routine or learn something new. One glowing core, with your work in orbit.
        </p>
        <div className="button-row">
          <Button href="/download/">
            Get NYXR <span className="sr-only">release information</span>
          </Button>
          <Button href="/demo/" secondary>
            See NYXR in action
          </Button>
        </div>
        <div className="hero-product-note">
          <span>WINDOWS DESKTOP ASSISTANT</span>
          <i aria-hidden="true" />
          <span>BUILT AROUND YOUR WORK</span>
        </div>
      </div>
      <div className="hero-stage container">
        <div className="stage-coordinate coord-left">
          N / 04.0
          <br />
          WINDOWS DESKTOP ENVIRONMENT
        </div>
        <div className="stage-coordinate coord-right">
          THINK.
          <br />
          BUILD.
          <br />
          AUTOMATE.
        </div>
        <div className="stage-horizon" />
        <div className="hero-main-shot">
          <Shot
            name="dashboard"
            alt="Actual NYXR NEXUS Command Center, with its large central reactor core and surrounding work panels"
            caption="COMMAND CENTER"
            priority
            onClick={() => openShot('dashboard')}
          />
        </div>
        <div className="hero-orb">
          <Core small />
          <span>ONE INTELLIGENCE LAYER</span>
        </div>
        <button
          className="hero-chat-float"
          onClick={() => openShot('chat')}
          aria-label="View the actual NYXR Chat interface"
        >
          <div className="float-heading">
            <Icon name="chat" size={14} />
            <span>KEEP THE THREAD.</span>
            <span className="tiny-dot" />
          </div>
          <img
            src="/screenshots/chat-detail.webp"
            alt="A detail from the real NYXR showcase conversation"
            width="1120"
            height="341"
          />
          <div className="float-footer">
            CHAT / PERSISTENT CONTEXT <Icon size={13} />
          </div>
        </button>
        <button
          className="hero-voice-float"
          onClick={() => openShot('voice-dock')}
          aria-label="View the actual F11 voice dock"
        >
          <img
            src="/screenshots/voice-dock.webp"
            alt="Actual NYXR F11 quick-text dock"
            width="440"
            height="191"
          />
          <span>
            <kbd>F11</kbd> A smaller way to ask.
          </span>
        </button>
      </div>
      <div className="hero-bottom container">
        <span>REAL APP. REAL POSSIBILITIES.</span>
        <a href="#inside-nyxr">
          ENTER THE ENVIRONMENT <Icon name="down" size={13} />
        </a>
        <span>BUILT TO KEEP YOU IN FLOW.</span>
      </div>
    </section>
  );
}
