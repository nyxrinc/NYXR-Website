import { Button, Eyebrow } from '../components/Primitives';
import { SourceAvailability } from '../components/SourceUpdates';

export default function Games() {
  return <div className="games-page container">
    <section className="games-hero" aria-labelledby="games-title">
      <div>
        <Eyebrow>NEXUS ENGINE / GAME STUDIO</Eyebrow>
        <h1 id="games-title">An idea.<br /><span className="text-cyan">A world to play.</span></h1>
        <p>Describe a small 3D game. NYXR builds a Nexus project with your chosen AI provider, checks its scripts, and brings it into your game library.</p>
        <div className="button-row"><Button href="#game-workflow">See the workflow</Button><Button href="/download/" secondary>Release availability</Button></div>
        <span className="games-source-label">DESKTOP SOURCE BETA · NOT IN WINDOWS BETA 3</span>
      </div>
      <figure className="games-capture">
        <img src="/screenshots/nexus-game-puzzle.png" alt="A real Nexus game generated in the NYXR cloud acceptance test" width="1650" height="900" fetchPriority="high" />
        <figcaption>Actual rendered cloud-generated prototype. Game quality depends on your prompt and model.</figcaption>
      </figure>
    </section>
    <SourceAvailability />
    <section className="games-workflow" id="game-workflow" aria-labelledby="game-workflow-title">
      <Eyebrow>DESCRIBE → BUILD → PLAY</Eyebrow><h2 id="game-workflow-title">Stay in NYXR. Step into your game.</h2>
      <div className="games-steps">
        <article><span>01 / DESCRIBE</span><h3>Start with the rules.</h3><p>Open Games, use the Game Studio command, or ask “Build a coin collection game.” Your configured model designs the scene and mechanics.</p></article>
        <article><span>02 / BUILD</span><h3>Keep a working version.</h3><p>Raw responses and candidates are saved before checks. Scene validation and Nyx compilation gate each saved version, with bounded repair and last-good protection.</p></article>
        <article><span>03 / PLAY</span><h3>The game takes the screen.</h3><p>Play test opens a full-screen player over NYXR. Move with WASD or arrows, jump with Space, and use Exit play test or Esc to return.</p></article>
      </div>
    </section>
    <section className="games-editing" aria-labelledby="games-editing-title">
      <div><Eyebrow>PLAY HERE / EDIT THERE</Eyebrow><h2 id="games-editing-title">A player in NYXR.<br />A studio in Chrome.</h2><p>NYXR’s game screen has no scene editor. Choose Edit in Chrome to open a separate window with Nexus’s building tools and Nyx scripts. Export an edited .nexus file there, then import it into NYXR.</p><p>Keep NYXR open while the editor loads. Projects are stored locally; game-session progress currently stays within the running player session.</p></div>
      <div className="games-prompts"><span>TRY A PROMPT</span><blockquote>“Build a coin collector with three neon coins and a restart key.”</blockquote><blockquote>“Make a platformer with checkpoints, a moving platform and a finish zone.”</blockquote><blockquote>“Create a sci-fi puzzle: find two keys, unlock a gate and reach the goal.”</blockquote></div>
    </section>
    <section className="games-evidence" aria-labelledby="games-evidence-title"><Eyebrow>TESTED BEFORE THE WEBSITE UPDATE</Eyebrow><h2 id="games-evidence-title">Playability gets checked.</h2><p>Three progressively harder games were generated using a configured NVIDIA cloud route. Automated browser tests exercised collection and restart, checkpoint recovery, moving platforms, gate requirements and win triggers. A real Windows Qt test checked the embedded player, full-screen play and exit.</p><p>These are specific acceptance results, not a promise that every generated game will work. Custom mechanics and level design still need playtesting. Generation uses your provider and its quota; playback uses the bundled local Nexus runtime, with no bundled AI model.</p><a className="text-link" href="/updates/#nexus-games">Read the source update →</a></section>
  </div>;
}
