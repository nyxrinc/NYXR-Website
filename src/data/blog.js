// NYXR blog. Every number here was measured on NYXR's own engine; each post names where its data lives.

export const posts = [
  {
    id: 'nyxr-5-1',
    date: '2026-11-24',
    dateLabel: '24 November 2026',
    tag: 'RELEASE',
    title: 'NYXR 5.1: it reads your textbook, checks its own work, and shows you when it’s driving.',
    summary:
      'NYXR 5.1 solves homework from the real textbook page, catches its own mistakes in maths and code, and works with any project type. It also passed a security pressure test before release. Here is what we measured.',
    sections: [
      {
        heading: 'Homework from the actual page',
        body: [
          'Before 5.1, asking NYXR to solve “Ganita Manjari, class 9, page 185, Q1 and Q2” ended with it asking you to paste the questions. Search found the book, but NYXR could only read web pages, not the PDF, and it had no idea that printed page 185 isn’t PDF page 185.',
          'Now it downloads the official NCERT PDF and reads the book’s contents page to find the chapter that holds page 185 (Chapter 8 in Part I). It opens that chapter’s file, uses the printed page numbers to land on the right page, quotes the questions and works through them step by step. Nothing about the book is hard-coded: the chapter file names are worked out from the publisher’s own URLs and checked against each file’s page numbers.',
        ],
        table: {
          caption: 'The same request, before and after',
          head: ['', 'NYXR 5 (preview.4)', 'NYXR 5.1'],
          rows: [
            ['“…ganita manjari (class 9 ncert) Page 185 Q. 1, and Q. 2”', 'Asked you to paste the questions', 'Q1: 48 and 128. Q2: −81 is the 35th term; 0 is the 8th term. Worked step by step.'],
            ['Time, first ask', '—', '71 s (downloading the NCERT PDFs)'],
            ['Time, asked again', '—', '29 s (book cached on your PC)'],
            ['Where the page came from', '—', 'ncert.nic.in, Part I, Chapter 8, PDF page 12 (printed 185)'],
          ],
        },
        note: 'NCERT’s server is often slow. When it can’t send the book in time, NYXR says so in one line and keeps downloading in the background, so asking again a few minutes later is instant.',
      },
      {
        heading: 'Sharper answers from the same models',
        body: [
          'NYXR 5.1 doesn’t switch you to a bigger model. Auto still uses each tool’s base model (Claude Code Haiku 5.5, Codex GPT-5.6 Luna, Antigravity Gemini Flash), and anything larger needs your yes. What changed is what NYXR does around the model. Hard maths is solved two ways and checked with a calculator, code is run before you see it, and rules like “exactly 10 words” are counted, with one rewrite if they’re missed.',
          'We graded 93 questions by code, not by eye: class 9 maths, word problems, multi-step reasoning, coding, research, routing and instruction-following.',
        ],
        table: {
          caption: '93 questions, graded by code (23 November 2026)',
          head: ['', 'Before', 'NYXR 5.1'],
          rows: [
            ['Claude Code · Haiku 5.5', '89/93 · 95.7%', '93/93 · 100%'],
            ['Codex · GPT-5.6 Luna', '90/93 · 96.8%', '93/93 · 100%'],
            ['Harness switched off vs on (Haiku 5.5, same day)', '91/94 · 96.8%', '75/75 · 100%'],
          ],
        },
        note: 'Honest reading: both models were already strong on this work (95–97%). 5.1 removes the occasional slip, such as 5832 − 5000 written as 824, which the calculator check caught and fixed to 832. It is not a new model. With 93 questions, one item is about one point, so small differences are noise. The cost: hard maths now takes about 1.6–2.1 model calls and 13–26 seconds per question, against one call and 4–17 seconds before.',
      },
      {
        heading: 'Maths you can read',
        body: [
          'Answers with equations used to arrive as raw \\[ … \\] code. NYXR 5 now typesets them the way ChatGPT does: fractions, square roots, subscripts and aligned working. The typesetter (KaTeX) only loads, about 78 KB, the first time a reply contains maths, and prices like “$5 and $10” are left alone.',
        ],
      },
      {
        heading: 'Tested hard before release',
        body: [
          'Before shipping, we ran a pressure test across the code, its security and every feature: the local service behind the app, the window’s permissions, prompt injection from web pages and PDFs, file handling, logs, the phone and backup paths, and every dependency.',
        ],
        table: {
          caption: 'Pressure test, 23–24 November 2026',
          head: ['', 'Result'],
          rows: [
            ['Issues found and fixed', '16 (3 high, 5 medium, 8 low), each with a test'],
            ['Still open', '2, both informational'],
            ['Known vulnerabilities in Python packages', '114 → 12 (the 12 are in one package that needs local access to exploit)'],
            ['Hostile inputs thrown at the request routers', 'about 14,100: 0 crashes, 0 hangs'],
            ['Test files passing', '185 of 190 (the 5 failures predate the upgrade)'],
          ],
        },
        note: 'The high-severity fixes: the make-it Python sandbox could be escaped; the Open button could run a program NYXR had made; and coding projects ran AI-written code with your full permissions. All three are closed. We also removed a 10–65 second freeze that hit any message containing words like “play” or “game”.',
      },
      {
        heading: 'Everything else in 5.1',
        list: [
          ['A model picker in every chat', 'Each chat remembers its own model, base models first, with Copy, Regenerate and Edit-and-resend.'],
          ['Coding for any project', 'Websites, browser games, pygame games, desktop and CLI apps and more: 13 project types, each with a starter, a sandboxed run or preview, and checks that fit.'],
          ['Slides in Studio', 'Make a deck on any topic and style, with pictures, and download it as .pptx.'],
          ['A new Student section', 'Today, Learn, Revise, Make and Plan, plus My books, so homework help knows your textbooks.'],
          ['Games your way', 'Ask for sprites from the web and Game Studio uses free-licence art with credits; attach your own pictures and it uses those. It never generates art you didn’t ask for.'],
          ['Real song AIs only', 'Song makers are listed only when the provider really has a music model, such as Google Lyria.'],
          ['See when NYXR is driving', 'Whenever NYXR uses your computer, its own cursor and a “NYXR is using your computer” banner appear, with a Stop button.'],
          ['Mission Control', 'Launch a multi-step task, watch each step, and approve the risky ones.'],
          ['Small updates', 'From 5.1 on, updates download only the files that changed, signed and checked, instead of the whole app.'],
          ['A faster browser connector', 'Companion 2.0.7 keeps one connection open and reports its status clearly.'],
        ],
      },
    ],
    sources:
      'Measured on a Windows 11 PC through NYXR’s own engine. Reasoning: 93-question set graded by code, method and every answer kept with the release. Homework: live runs of the exact request against ncert.nic.in. Security: the 5.1 pressure-test report.',
  },
];
