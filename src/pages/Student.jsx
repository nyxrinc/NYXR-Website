import { SectionHeading, Button, Shot } from '../components/Primitives';

export default function Student({ slidesOnly = false }) {
  return (
    <section className="section container">
      <SectionHeading
        number="STUDY"
        label={slidesOnly ? 'SLIDESHOW STUDIO' : 'NYXR FOR STUDENTS'}
        title={
          slidesOnly ? (
            <>
              From a topic.
              <br />
              <span className="text-cyan">To your next presentation.</span>
            </>
          ) : (
            <>
              Your material.
              <br />
              <span className="text-cyan">A tutor at your pace.</span>
            </>
          )
        }
      >
        {slidesOnly
          ? 'Make a deck on any topic, from Studio or Student. Pick a style, review the slides and pictures, then export an editable PowerPoint with speaker notes.'
          : 'Name your textbook page and questions and NYXR solves them from the real page. Add PDF study material, ask questions, practise recall and plan your week.'}
      </SectionHeading>
      <Shot
        name="student"
        alt="NYXR 5 Student in the Rain look: PDF library, Tutor, Slides, Revision and Exams"
        caption="THE STUDENT WORKSPACE / ACTUAL APP"
      />
      <div className="study-feature-grid">
        {(slidesOnly
          ? [
              [
                'Start with a topic',
                'Describe the audience and what you want to explain, for school, work or anything else. Or use selected excerpts from your study material.',
              ],
              [
                'Pick a look',
                'New in 5.1: Studio’s Slides tab offers five styles, adds pictures and lets you restyle a finished deck in one click.',
              ],
              [
                'Review before presenting',
                'Preview the slide titles, concise bullet points and speaker notes inside NYXR. Check facts and adjust the content in PowerPoint.',
              ],
              [
                'Keep it editable',
                'Export a .pptx file to your own folder. Source page references are included when you generate from study material.',
              ],
            ]
          : [
              [
                'Homework from the real page',
                'New in 5.1: say “Ganita Manjari, page 185, Q1 and Q2” and NYXR finds the official textbook PDF, opens the chapter that holds that page and solves the questions step by step, with the maths typeset properly.',
              ],
              [
                'Five places for your week',
                'Today, Learn, Revise, Make and Plan, plus My books, so homework help already knows which textbooks you study from.',
              ],
              [
                'Bring your chapters',
                'Keep searchable PDFs in a persistent local study library. Text extraction happens on your computer, without a model call.',
              ],
              [
                'Understand with context',
                'Choose Explain, Quiz me, Flashcards or Summarize. Tutor answers can link back to the retrieved PDF pages.',
              ],
              [
                'Present what you learn',
                'Turn a topic or your selected material into slides, review the outline and export an editable PowerPoint.',
              ],
            ]
        ).map(([title, text]) => (
          <article className="study-feature-card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <p className="architecture-footnote">
        Uses your own selected AI provider or local model. When you ask, relevant excerpts are
        included in the request. PDFs and study conversations are not part of account sync.
        Searchable text PDFs are supported; scanned pages need OCR first. AI answers and citations
        should be checked against the original material.
      </p>
      {!slidesOnly && (
        <aside className="study-revision">
          <h2>Make the next revision count.</h2>
          <p>
            Keep a local revision queue with source-linked study cards, spaced practice and exam
            plans. Return to the PDF page behind a card, record your review and see what is due
            next. Generated study content still needs your own fact-check.
          </p>
        </aside>
      )}
      <div className="study-actions">
        <Button href="/download/">Release information</Button>
        <a href={slidesOnly ? '/students/' : '/slideshows/'}>
          {slidesOnly ? 'Explore Student workspace' : 'Explore slideshow generation'} →
        </a>
      </div>
    </section>
  );
}
