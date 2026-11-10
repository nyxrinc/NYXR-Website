import { Button, Eyebrow } from '../components/Primitives';
import { SourceAvailability } from '../components/SourceUpdates';

export default function Games() {
  return <div className="games-page container">
    <section className="games-hero" aria-labelledby="games-title">
      <div>
        <Eyebrow>NEXUS ENGINE / GAME STUDIO</Eyebrow>
        <h1 id="games-title">An idea.<br /><span className="text-cyan">A world to play.</span></h1>
        <p>Describe an original game in a sentence. NYXR writes it with your chosen AI provider, tests it with real keys and clicks, and brings it into your game library.</p>
        <div className="button-row"><Button href="#game-workflow">See the workflow</Button><Button href="/download/" secondary>Release availability</Button></div>
        <span className="games-source-label">DESKTOP SOURCE BETA · NOT IN WINDOWS BETA 3</span>
      </div>
      <figure className="games-capture">
        <img src="/screenshots/nexus-game-chess.png" alt="Chess vs Bot, a game NYXR built from one sentence, with Easy, Medium and Hard bot levels" width="960" height="540" fetchPriority="high" />
        <figcaption>Actual game built from one sentence asking for chess with three bot levels. Game quality depends on your prompt and model.</figcaption>
      </figure>
    </section>
    <SourceAvailability />
    <section className="games-workflow" id="game-workflow" aria-labelledby="game-workflow-title">
      <Eyebrow>DESCRIBE → BUILD → PLAY</Eyebrow><h2 id="game-workflow-title">Stay in NYXR. Step into your game.</h2>
      <div className="games-steps">
        <article><span>01 / DESCRIBE</span><h3>Start with the rules.</h3><p>Open Games, use the Game Studio command, or describe your idea in one sentence. Your configured model designs the rules and writes the game.</p></article>
        <article><span>02 / BUILD</span><h3>Checked by playing it.</h3><p>Every version is saved before it is checked. NYXR reads the rules for faults and tests the controls with real input. For 2D games, an AI-written player tries to win. A failed check gets a bounded repair, and your last working game stays safe.</p></article>
        <article><span>03 / PLAY</span><h3>The game takes the screen.</h3><p>Play test opens a full-screen player over NYXR, with the controls each game shows you. Use Exit game or Esc to return.</p></article>
      </div>
    </section>
    <section className="games-editing" aria-labelledby="games-editing-title">
      <div><Eyebrow>PLAY HERE / EDIT THERE</Eyebrow><h2 id="games-editing-title">A player in NYXR.<br />A studio in Chrome.</h2><p>NYXR’s game screen has no scene editor. Choose Edit in Chrome to open a separate window with Nexus’s building tools and Nyx scripts. Export an edited .nexus file there, then import it into NYXR.</p><p>Keep NYXR open while the editor loads. Projects are stored locally; game-session progress currently stays within the running player session.</p></div>
      <div className="games-prompts"><span>TRY A PROMPT</span><blockquote>“I want a fully working chess game with 3 levels of difficulty when playing with bots.”</blockquote><blockquote>“Make a one-button runner where a paper lantern hops across moonlit rooftops.”</blockquote><blockquote>“Build a lemonade stand game where the weather decides how many customers come.”</blockquote></div>
    </section>
    <section className="games-evidence" aria-labelledby="games-evidence-title"><Eyebrow>TESTED 10 NOVEMBER 2026</Eyebrow><h2 id="games-evidence-title">Playability gets checked.</h2><p>NYXR ran 13 builds from one prompt each, using Claude Haiku through a signed-in Claude Code. Twelve saved. One paused for repair, and its cause was then fixed. Two of the saved games, both early card builds, had real design flaws that led to stricter checks. A person played four of the games, and each worked well.</p><p>These are specific test results, not a promise that every generated game will work. Successful builds took between 7 and 26 minutes, and 3D games do not get the automated win check yet. Generation uses your provider and its quota; playback uses NYXR’s bundled game runtime, with no bundled AI model.</p><a className="text-link" href="/updates/#one-prompt-games">Read the source update →</a></section>
  </div>;
}
