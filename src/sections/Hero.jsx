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
        <a href="/nyxr-5-1/">
          <i className="status-dot" /> NYXR 5.1 IS HERE · SEE WHAT’S NEW →
        </a>
      </div>
      <div className="hero-copy">
        <Eyebrow>NYXR 5.1 / SMARTER, AND YOURS TO WATCH</Eyebrow>
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
          Your own AI command center for Windows. Speak an idea, build any project, automate a
          routine or solve tonight’s homework from the real textbook page. Answers that check
          themselves, and a cursor you can see whenever NYXR is at work.
        </p>
        <div className="button-row">
          <Button href="/download/">
            Download NYXR 5.1 <span className="sr-only">for Windows</span>
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
          N / 05.1
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
            alt="NYXR 5 Home in Midnight: the orbiting NYXR core, a greeting, an ask box and recent chats"
            caption="HOME"
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
          aria-label="View the NYXR 5 Chat page"
        >
          <div className="float-heading">
            <Icon name="chat" size={14} />
            <span>KEEP THE THREAD.</span>
            <span className="tiny-dot" />
          </div>
          <img
            src="/screenshots/chat-detail.webp"
            alt="A real NYXR 5 reply explaining how black holes form"
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
          aria-label="View the NYXR 5 hands-free bar"
        >
          <img
            src="/screenshots/voice-dock.webp"
            alt="NYXR 5 hands-free bar with its text box, Send and the Write for me switch"
            width="420"
            height="236"
          />
          <span>
            <kbd>F8</kbd> Hold to talk, from any app.
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
