import { Button, Eyebrow } from '../components/Primitives';
import { CandidateDetails, candidate } from '../components/CandidateRelease';
import { betaRelease } from '../data/release';
import {
  exhibitionRelease,
  ExhibitionScope,
  PlayProtectHelp,
} from '../components/ExhibitionRelease';

export default function Updates() {
  return (
    <section className="updates-page container">
      <Eyebrow>NYXR / RELEASE NOTES</Eyebrow>
      <h1>The core keeps evolving.</h1>
      <article className="update-entry latest-source-entry" id="nyxr-5-1">
        <header><span className="release-channel">NYXR 5.1 / 5.1.0 · WINDOWS</span><time dateTime="2026-11-24">24 NOVEMBER 2026</time></header>
        <h2>It reads your textbook, checks its own work, and shows you when it’s driving.</h2>
        <p>The biggest NYXR 5 update so far. It installs over every NYXR 5 preview and keeps your chats and settings.
          <a href="/download/#nyxr5-preview"> Download NYXR 5.1</a> · <a href="/blog/#nyxr-5-1">the full write-up, with measurements</a>.</p>
        <ul><li><strong>Homework from the real page.</strong> Name a textbook page and questions (“Ganita Manjari, page 185,
          Q1 and Q2”) and NYXR finds the official PDF, picks the chapter that holds that printed page, and solves the
          questions step by step. Student’s homework help and My books use the same path.</li>
          <li><strong>Answers that check themselves.</strong> Hard maths is solved two ways and checked with a calculator,
          code is run before you see it, and word limits are counted. On our 93-question set, base models went from
          89 and 90 to 93 out of 93.</li>
          <li><strong>Maths you can read.</strong> Equations are typeset like a textbook instead of showing raw code.</li>
          <li><strong>A model picker in every chat</strong>, with Copy, Regenerate and Edit-and-resend. Base models stay the
          default; Sonnet only after your yes.</li>
          <li><strong>Any project type.</strong> Websites, browser and pygame games, desktop and command-line apps: 13 types,
          each with a starter, a sandboxed run or preview and its own checks.</li>
          <li><strong>Slides in Studio</strong> for any topic and style, with pictures, as .pptx.</li>
          <li><strong>A new Student section:</strong> Today, Learn, Revise, Make and Plan, plus My books.</li>
          <li><strong>Game Studio respects your art choice:</strong> free-licence web sprites with credits, or your own
          pictures. It never generates art you said not to.</li>
          <li><strong>Song makers only where there is a real music AI</strong> (such as Google Lyria); note-writing chat
          models are labelled as a fallback.</li>
          <li><strong>See when NYXR is driving.</strong> Its own cursor and a “NYXR is using your computer” banner with a
          Stop button, in hands-free mode and everywhere else.</li>
          <li><strong>Mission Control</strong> runs multi-step tasks and holds risky steps for your OK.</li>
          <li><strong>Small signed updates.</strong> From 5.1 on, updates download only the files that changed, checked
          against a signed list.</li>
          <li><strong>Browser companion 2.0.7</strong> keeps one connection open and reports its status clearly. Reload it
          in chrome://extensions after updating.</li>
          <li><strong>Fixes.</strong> “Whats the current version of NYXR?” answers from NYXR itself; research reads a site
          you name directly; “set a reminder in 3 days to …” works; homework messages are no longer mistaken for WhatsApp
          while WhatsApp Web is open; no more 10–65 second pause on messages with “play” or “game”.</li></ul>
        <div className="update-evidence"><strong>Tested</strong><p>A pre-release pressure test found and fixed 16 issues
          (3 high: a make-it sandbox escape, the Open button running made programs, and coding projects running with
          full permissions). Known vulnerabilities in NYXR’s Python packages went from 114 to 12. About 14,100 hostile
          inputs to the request routers caused 0 crashes. 185 of 190 test files pass.</p></div>
        <div className="update-open"><strong>Known limits</strong><p>Not yet code-signed. Real AI songs need a paid music
          model (Gemini billing, OpenRouter credit or Cloudflare). Publisher sites can be slow; NYXR keeps downloading a
          textbook in the background when they are.</p></div>
      </article>
      <article className="update-entry" id="nyxr-5-preview-4">
        <header><span className="release-channel">NYXR 5 / 5.0.0-preview.4 · WINDOWS</span><time dateTime="2026-11-18">18 NOVEMBER 2026</time></header>
        <h2>Say it your way.</h2>
        <p>Changing the theme by voice or chat now understands the request instead of matching a fixed sentence.
          <a href="/download/#nyxr5-preview"> Download NYXR 5</a>.</p>
        <ul><li><strong>Any wording.</strong> “Change the theme back to Nemesis”, “Nemesis theme please”, “go back to the
          default theme” and “I want the rain look” all switch at once, with no AI. Small typos are fine when you say
          “theme”.</li>
          <li><strong>Never in the way.</strong> “Make it rain” or “write a theme song about rain” stay ordinary
          requests.</li>
          <li><strong>Built from the app.</strong> The looks NYXR offers come from its own theme list, so new looks
          work by voice the day they arrive.</li></ul>
      </article>
      <article className="update-entry" id="nyxr-5-preview-3">
        <header><span className="release-channel">NYXR 5 / 5.0.0-preview.3 · WINDOWS</span><time dateTime="2026-11-18">18 NOVEMBER 2026</time></header>
        <h2>Install in one click. Set up in a minute.</h2>
        <p>NYXR 5 is now the NYXR download. This build makes the first minutes easy.</p>
        <ul><li><strong>One-click installer.</strong> No folders or questions: press Install, and NYXR 5 opens when
          it is done. No administrator rights needed; it installs over earlier NYXR 5 previews.</li>
          <li><strong>Pick your AI in one tap.</strong> Setup finds Antigravity, Claude Code or Codex if you are
          already signed in. Or it links you to a free Groq, Gemini or OpenRouter key, saves it in Windows
          Credential Manager and tests it on the spot.</li>
          <li><strong>Your voice, end to end.</strong> A microphone check that stays on your PC, a try of voice
          typing, a sample of the spoken voice, and the hands-free bar.</li>
          <li><strong>A starter quest.</strong> Six first things to try wait in the sidebar, and tick themselves
          off as you do them.</li>
          <li><strong>F2 for hands-free</strong>, from any app. <strong>Change the theme by asking</strong>
          (“change the theme to Nexus” shows the four Nexus looks). Aurora and Blossom now drift slowly.</li>
          <li><strong>Studio keeps going.</strong> Songs, pictures and diagrams keep generating when you switch
          pages, and say so when they are ready.</li>
          <li><strong>Smarter follow-ups.</strong> “Now search for tesla” right after opening YouTube searches YouTube,
          instantly. Write for me types into the textbox you clicked before speaking.</li>
          <li><strong>Fixes.</strong> The model picker stays on screen in Game Studio; the game viewer can be closed;
          Fish Audio voices can be searched and previewed.</li></ul>
      </article>
      <article className="update-entry" id="nyxr-5-preview-2">
        <header><span className="release-channel">NYXR 5 / PREVIEW 5.0.0-preview.2 · WINDOWS</span><time dateTime="2026-11-18">18 NOVEMBER 2026</time></header>
        <h2>Instant from the first command.</h2>
        <p>The second NYXR 5 preview makes everyday commands answer in milliseconds, from the very first one.
          It installs over preview 1.</p>
        <ul><li><strong>No first-time wait.</strong> A few seconds after NYXR starts, it quietly prepares the
          commands that act on your PC. “Type hello judges in Notepad” went from about 9 seconds the first time to
          about 0.3 seconds.</li>
          <li><strong>Voice starts sooner.</strong> Holding F8 opens the connection to speech-to-text while you are
          still talking, saving about a second on the first spoken command. No audio is sent until you let go.</li>
          <li><strong>Menus you can read.</strong> The “/” command list, the model picker and notices are now
          solid in every theme, so nothing shows through them in Nemesis.</li></ul>
        <div className="update-evidence"><strong>Measured</strong><p>Through NYXR’s engine on a Windows 11 PC:
          what time is it 26–60 ms, open Notepad 19–370 ms, snap a window ~30 ms, volume up ~0.35 s, open Calculator
          ~0.5 s, take a screenshot ~0.6 s, type into a new Notepad note 0.25–0.36 s. No AI is used for any of them.</p></div>
      </article>
      <article className="update-entry" id="nyxr-5">
        <header><span className="release-channel">NYXR 5 / PREVIEW 5.0.0-preview.1 · WINDOWS</span><time dateTime="2026-11-17">17 NOVEMBER 2026</time></header>
        <h2>Introducing NYXR 5.</h2>
        <p>A new, lighter NYXR app around the same engine as every NYXR 4 beta, now an early, unsigned
          preview download that installs beside NYXR 4 and shares its chats and settings. Windows beta 6
          stays the main download. Preview 2 (above) replaces this build.</p>
        <ul><li><strong>Game Studio as an IDE.</strong> Open a folder as a project. Chat on the left, with the
          model picker and every chat feature; the game plays on the right and changes with each message.
          Every version is written to your folder, and Previous games plays or saves anything made before.</li>
          <li><strong>A hands-free bar for every app.</strong> Hold F8 anywhere to talk, or hover the bar to type.
          Its Write for me switch types into any textbox you click, corrected when the grammar scores under 9/10.</li>
          <li><strong>Home, with a living core.</strong> The NYXR core leans toward your cursor and shows when NYXR
          is listening, thinking or speaking; every theme has its own core.</li>
          <li><strong>Nemesis and responsive themes.</strong> A dark, neon-blue HUD theme. Aurora’s lights follow
          your cursor, and in Rain your cursor wipes the glass.</li>
          <li><strong>Faster to reach.</strong> Typing “/” lists every command; empty chat boxes type out
          suggestions that fit where you are.</li>
          <li><strong>Images and Music, simpler.</strong> Realistic pictures and diagrams in one gallery; music
          from a mood in one tap.</li>
          <li><strong>No surprise costs.</strong> Auto stays on each tool’s base model (Claude Haiku, GPT-5.6 Luna,
          Gemini Flash); a bigger model needs your pick or a yes.</li>
          <li><strong>Macros replay again.</strong> Replays find the app you recorded in even after it was
          reopened, and every run ends with a clear Done, Stopped or Needs attention line instead of waiting
          forever.</li></ul>
        <div className="update-evidence"><strong>Measured</strong><p>With Home open and still, all NYXR 5 processes
          together used about 16 to 31 milliseconds of CPU over 30 seconds. Write for me was checked end to end:
          “this are a short test sentence” scored 5/10 and was written as “This is a short test sentence for NYXR.”</p></div>
        <Button href="/nyxr-5/" secondary>Introducing NYXR 5</Button>
      </article>
      <article className="update-entry" id="beta-6">
        <header><span className="release-channel">WINDOWS BETA 6 / UNSIGNED EARLY ACCESS</span><time dateTime="2026-11-15">15 NOVEMBER 2026</time></header>
        <h2>Games, music, pictures. One assistant.</h2>
        <p>NYXR {betaRelease.version} turns NYXR into a creative hub, alongside everything from beta 5.</p>
        <figure className="games-capture">
          <img src="/screenshots/nyxr-music.png" alt="NYXR 5 Studio → Music with Chill Jazz, a 110 BPM tune in D dorian made by the built-in offline composer" width="1650" height="920" loading="lazy" />
          <figcaption>The Music page playing a song NYXR composed from one sentence.</figcaption>
        </figure>
        <ul><li><strong>Music.</strong> Describe a song and hear it at once. Change the tempo, key, mood and
          instruments, regenerate a part, edit notes, turn lyrics into a melody, and export WAV, MIDI or a project file.</li>
          <li><strong>Make anything.</strong> Drawings, posters, quizzes, tunes and small apps are made and checked even
          without a special tool. Draw and Generate image are in the + menu. Realistic pictures and photo edits use
          Antigravity’s free image tool when it is signed in.</li>
          <li><strong>Student visuals.</strong> Mind maps, concept maps, flowcharts, timelines, comparisons, Venn
          diagrams and labelled diagrams. Slides can be written through Antigravity, with pictures.</li>
          <li><strong>Instant commands.</strong> About twenty common phrases act the moment they are transcribed.
          Exhibition mode preloads everything for a live demo.</li>
          <li><strong>Email and a calmer interface.</strong> “Send it” sends the drafted email through Gmail and
          confirms only when Gmail does. The header, menus, Home and Settings are quieter, with every action still reachable.</li>
          <li><strong>Companion.</strong> “Show me how…” highlights the real buttons step by step and waits for your
          click. Press Ctrl+Alt+A and drag a box to ask about part of the screen. Focus sessions, a “Brief me” daily
          briefing and spoken reminders with snooze.</li>
          <li><strong>You stay in control.</strong> “Stop everything” or Ctrl+Alt+Backspace halts every action, and
          Settings → Permissions switches off whole kinds of action. Notes, a memory manager, custom instructions,
          schedules and a second opinion from another AI.</li>
          <li><strong>Your words, your provider.</strong> Hinglish commands such as “Chrome kholo” work, with replies
          in the language you wrote in. A provider you pick stays picked, falling back Claude Code → Codex → Antigravity.</li></ul>
        <div className="update-evidence"><strong>Executed checks</strong><p>The frozen app, its helpers, the packaged
          game player and an isolated install, upgrade and uninstall were checked against this exact installer before
          publication. Results are in BETA_ACCEPTANCE.json with the release.</p>
          <p>This build is unsigned, so Windows may warn about the publisher. Reload the Browser Companion after
          upgrading. Clean-machine laptop, microphone and different-CPU testing remain open.</p></div>
        <Button href="/download/" secondary>Download beta 6</Button>
      </article>
      <article className="update-entry" id="beta-5">
        <header><span className="release-channel">WINDOWS BETA 5 / UNSIGNED EARLY ACCESS</span><time dateTime="2026-11-11">11 NOVEMBER 2026</time></header>
        <h2>Build it, play it, share the screen with it.</h2>
        <p>NYXR {betaRelease.version} brings everything since beta 3 into one installer: Game Studio,
          signed-in AI plans, background research and a lighter interface on modest PCs.</p>
        <ul><li>Game Studio keeps a build going by itself. A game that still runs after every automatic
          repair is saved with a note, so you can play it and use Fix game. Play opens the game full
          screen, scaled and centred, in front of NYXR. Add images, files or web research as inspiration.</li>
          <li>Claude Code, Codex and Antigravity (Gemini) work through the command-line tools already
          signed in on your PC. NYXR never reads their logins. Antigravity prefers Gemini 3.5 Flash and
          otherwise uses the newest Gemini Flash your account offers.</li>
          <li>Questions that need current sources are researched in the background, with live steps and
          the pages NYXR read.</li>
          <li>The chat + button attaches files or picks a tool for the next message: Web research,
          Create a game, Write code, Use the computer, Make slides or Think longer.</li>
          <li>AUTO chooses FULL, BALANCED or PERFORMANCE from your processor, memory and graphics.
          On the build PC, idle chat CPU fell from about 45% to 2–5%.</li></ul>
        <div className="update-evidence"><strong>Executed checks</strong><p>The frozen app, its helpers and
          an isolated install, upgrade and uninstall were checked against this exact installer before
          publication. Results are in BETA_ACCEPTANCE.json with the release.</p>
          <p>This build is unsigned, so Windows may warn about the publisher. Clean-machine laptop,
          microphone and different-CPU testing remain open. Game results vary by prompt and provider.</p></div>
        <Button href="/download/" secondary>Download beta 5</Button>
      </article>
      <article className="update-entry" id="one-prompt-games">
        <header><span className="release-channel">DESKTOP SOURCE BETA / NOW IN BETA 5</span><time dateTime="2026-11-10">10 NOVEMBER 2026</time></header>
        <h2>One sentence. An original game.</h2>
        <p>Game Studio now writes original browser games from a single prompt, then checks them by
          playing them. Claude Code and Codex can write games through your own signed-in accounts.</p>
        <ul><li>Real keys and clicks test starting, moving, restarting and a short play session before a game is saved.</li>
          <li>A source check looks for limits that cannot be met, content that never appears, offers nobody
          can afford and games that end too soon.</li>
          <li>For 2D games, an AI-written player tries to win on a throwaway copy. If two separately written
          players fail, NYXR attempts a repair. Games won by out-playing a computer opponent keep their difficulty.</li>
          <li>Fix game applies a plain-language change, such as “Add sound effects and animations,” and
          keeps your last working version until the change passes its checks.</li></ul>
        <div className="update-evidence"><strong>Executed checks</strong><p>Thirteen one-prompt builds ran on
          Claude Haiku on 10 November 2026. Twelve saved, and one paused for repair; its cause was then fixed.
          Two saved games, both early card builds, had real design flaws that led to stricter checks. A person
          played Lighthouse Keeper, Garden Keeper, Lantern Rooftops and Chess vs Bot, and each worked well.</p>
          <p>These results are not a guarantee for every prompt. Successful builds took between 7 and 26 minutes,
          and 3D games do not get the automated win check yet. This update was source-only when written; it is
          included in the Windows beta 5 installer.</p></div>
        <Button href="/games/" secondary>Explore Game Studio</Button>
      </article>
      <article className="update-entry" id="nexus-games">
        <header><span className="release-channel">DESKTOP SOURCE BETA / NOT A NEW INSTALLER</span><time dateTime="2026-10-31">31 OCTOBER 2026</time></header>
        <h2>Nexus worlds. Inside NYXR.</h2>
        <p>Game Studio turns a prompt into an editable Nexus project using your configured AI provider.
          NYXR contains the player; Edit in Chrome opens the separate scene and script editor.</p>
        <ul><li>Play test fills the screen. Exit play test or Esc restores NYXR.</li>
          <li>Compact AI scene authoring and tested gameplay components cover coins, keys, checkpoints,
          hazards, moving platforms, doors and goals. Custom Nyx scripts remain supported.</li>
          <li>Raw output is saved before validation. Bounded repairs and hash-bound promotion protect
          the last working game. Import/export uses standard .nexus files.</li>
          <li>Bundled Three.js allows local playback. Generation uses your provider and its quota.</li></ul>
        <div className="update-evidence"><strong>Executed acceptance checks</strong><p>Three increasingly
          difficult cloud-generated games passed real-engine compilation and automated gameplay checks.
          The native Windows Qt test covered generation, play-only rendering, full-screen play, exit and
          the separate editor handoff. Nexus’s 19 existing browser regression groups also passed.</p>
          <p>Automated interaction checks are not a guarantee for every generated game or a substitute
          for reviewing a complete level. The public Windows beta 3 binary has not been rebuilt for this update.</p></div>
        <Button href="/games/" secondary>Explore Game Studio</Button>
      </article>
      <article className="update-entry" id="october-reliability">
        <header>
          <span className="release-channel">LATEST DESKTOP SOURCE / NOT A NEW INSTALLER</span>
          <time dateTime="2026-10-30">30 OCTOBER 2026</time>
        </header>
        <h2>More ways to think. Better ways to act.</h2>
        <p>
          OpenJarvis can now use explicitly selected cloud models as well as local Ollama. NYXR
          keeps its own action tools, verification and approvals.
        </p>
        <ul>
          <li>
            OpenJarvis supports OpenRouter, OpenAI, Anthropic, Google Gemini, DeepSeek and MiniMax,
            with separate cloud keys in Windows Credential Manager.
          </li>
          <li>
            Cloud and local inference are labeled separately. Saving a key or checking
            managed-service metadata does not generate a completion.
          </li>
          <li>
            Malformed browser verification plans get one bounded repair from a fresh observation
            before input starts. Profile, tab and document targeting remain explicit.
          </li>
          <li>
            Vision requests retain compatible image routes and purpose-specific deadlines across
            fallback.
          </li>
          <li>
            Background Replies adds a WhatsApp Web source beta: drafts first, explicitly scoped
            automatic sessions, typing/draft pauses, and no replay of uncertain sends.
          </li>
          <li>
            An optional ElevenLabs British assistant preset and bundled JARVIS Interface SFX add
            voice and sound choices without silently switching providers.
          </li>
        </ul>
        <div className="update-evidence">
          <strong>Checked in the source checkout</strong>
          <p>
            493 targeted checks passed across the selected integration suites. Cloud SDK requests
            used controlled responses. No real email, WhatsApp message or billable cloud inference
            was sent during those checks. This is not packaged-release or physical-device
            acceptance.
          </p>
        </div>
        <div className="update-open">
          <strong>Download versions are unchanged</strong>
          <p>
            The public Windows installer remains {betaRelease.version}. The signed Android
            Exhibition Basic tester has its own version and limited scope. The source additions
            above do not change either artifact or its checksum.
          </p>
        </div>
        <div className="button-row">
          <Button href="/openjarvis/" secondary>
            Set up OpenJarvis
          </Button>
          <a className="text-link" href="/download/#latest-source">
            Compare download versions
          </a>
          <a className="text-link" href="/guide/#background-replies">
            Background Replies setup
          </a>
        </div>
      </article>
      <p className="updates-intro">
        What is available, what has been built, and what still needs to pass before it reaches your
        devices.
      </p>
      <article className="update-entry" aria-labelledby="exhibition-update-title">
        <header>
          <span className="release-channel">EXHIBITION TEST / SEPARATE LOCAL CHANNEL</span>
          <span>29 OCTOBER 2026</span>
        </header>
        <h2 id="exhibition-update-title">
          {exhibitionRelease.version} · Exhibition{' '}
          {exhibitionRelease.edition === 'basic' ? 'Basic' : 'Test'}
        </h2>
        <p>
          Exhibition Test uses a separate Android app identity and requires explicit opt-in on both
          the desktop and phone. Android 10+ and the same Wi-Fi are required. Update the repository
          on your current PC, close NYXR and restart with <code>run_nyxr.bat</code>; the public beta
          3 installer is not compatible. Enable Local exhibition testing in desktop Phone settings.
        </p>
        <p>
          No account required. The local allowance is 30 test actions per UTC day and grants no
          premium entitlement. Permissions and exact confirmations remain required. Start with
          battery, listing apps and media volume.
        </p>
        <p>
          The updated desktop and tester support five-digit, same-Wi-Fi pairing. Show a connection
          code on PC, enter it on Android and approve both screens. QR remains an alternative.
          Already paired? Reconnect instead of starting setup again.
        </p>
        <p>
          The current Windows repository also adds image, local text-file and readable PDF pasting
          into main and project chats, plus a FreeLLMAPI saved-key refresh fix across account
          sessions. PDF attachments provide extracted text with page references; scanned PDFs need
          searchable text. These changes require the updated repository, rather than the older
          public beta 3 installer.
        </p>
        <ExhibitionScope />
        <PlayProtectHelp />
        <div className="update-open">
          <strong>Testing, not hardware acceptance</strong>
          <p>
            Physical-device acceptance remains pending. Public companion release gates are
            unchanged.{' '}
            {exhibitionRelease.available
              ? 'The signed tester APK and corresponding source are linked in the separate download card.'
              : 'The tester download is unavailable until the signed APK and corresponding source are hosted and their exact metadata is recorded.'}
          </p>
        </div>
        <div className="button-row">
          <Button href="/download/#exhibition-test" secondary>
            Exhibition Test download &amp; status
          </Button>
          <a className="text-link" href="/guide/#exhibition-test">
            Exhibition Test setup guide
          </a>
        </div>
      </article>
      <article className="update-entry">
        <header>
          <span className="release-channel">IN TESTING / WINDOWS + ANDROID</span>
          <span>27 OCTOBER 2026</span>
        </header>
        <h2>{candidate.version} · Your phone joins the orbit.</h2>
        <p>
          A signed Android 10+ companion and matching Windows candidate have been built locally.
          Same-Wi-Fi pairing uses pinned TLS, short-lived setup links and approval on both devices.
        </p>
        <ul>
          <li>Phone commands join normal chat, F8 and F11 instead of a separate chatbot.</li>
          <li>Contact/SIM clarification and exact confirmations for outgoing actions.</li>
          <li>
            Supported notifications, media, apps, controls, productivity handoffs and selected
            files.
          </li>
          <li>Durable command receipts and protection against repeating uncertain sends.</li>
          <li>
            Core’s 30-action daily policy and verified premium entitlements; payments remain
            inactive.
          </li>
        </ul>
        <div className="update-evidence">
          <strong>Checked locally</strong>
          <p>
            535 Python tests, 36 Android JVM tests, 72 account-service tests and packaged desktop
            checks passed. These are automated and controlled checks, not real Motorola acceptance.
          </p>
        </div>
        <div className="update-open">
          <strong>Still required</strong>
          <p>
            Production account setup and trusted allowance keys, physical Motorola/instrumentation
            testing, clean Windows acceptance, final redistribution review, Windows signing and
            public artifact hosting. Phone execution is disabled without the account/key
            configuration.
          </p>
        </div>
        <CandidateDetails platform="windows" />
        <CandidateDetails platform="android" />
        <div className="button-row">
          <Button href="/download/#next-desktop" secondary>
            Build & download status
          </Button>
          <a className="text-link" href="/phone/">
            Explore phone capabilities
          </a>
        </div>
      </article>
      <article className="update-entry">
        <header>
          <span className="release-channel">CURRENT PUBLIC WINDOWS BETA</span>
          <span>25 OCTOBER 2026</span>
        </header>
        <h2>{betaRelease.version} · The heart of NYXR.</h2>
        <p>
          NEXUS brings the animated core back to the command center. Write for me, the F11 dock,
          skippable first-launch setup and upgrade backups accompany the existing coding, voice,
          Student and Macro workflows.
        </p>
        <p>
          This unsigned early-access Windows build does not include the phone companion. Bring your
          own AI connection or deliberately choose an installed local Ollama model.
        </p>
        <Button href="/download/" secondary>
          Current Windows download
        </Button>
      </article>
    </section>
  );
}
