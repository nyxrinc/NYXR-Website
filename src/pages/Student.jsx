import { SectionHeading, Button, Shot } from '../components/Primitives';

export default function Student({ slidesOnly = false }) {
  return <section className="section container">
    <SectionHeading number="STUDY" label={slidesOnly ? 'SLIDESHOW STUDIO' : 'NYXR FOR STUDENTS'} title={slidesOnly ? <>From a topic.<br /><span className="text-cyan">To your next presentation.</span></> : <>Your material.<br /><span className="text-cyan">A tutor at your pace.</span></>}>
      {slidesOnly ? 'Create a slide outline, review the content, then export an editable PowerPoint with speaker notes.' : 'Add PDF study material. Ask questions, practise recall and work through ideas with NYXR.'}
    </SectionHeading>
    <Shot name="student" alt="The actual NEXUS Student workspace with PDF library, Tutor, Slides, Revision and Exams tabs" caption="THE STUDENT WORKSPACE / ACTUAL APP" />
    <div className="study-feature-grid">
      {(slidesOnly ? [
        ['Start with a topic', 'Describe the audience and what you want to explain. Or use selected excerpts from your study material.'],
        ['Review before presenting', 'Preview the slide titles, concise bullet points and speaker notes inside NYXR. Check facts and adjust the content in PowerPoint.'],
        ['Keep it editable', 'Export a .pptx file to your own folder. Source page references are included when you generate from study material.'],
      ] : [
        ['Bring your chapters', 'Keep searchable PDFs in a persistent local study library. Text extraction happens on your computer, without a model call.'],
        ['Understand with context', 'Choose Explain, Quiz me, Flashcards or Summarize. Tutor answers can link back to the retrieved PDF pages.'],
        ['Present what you learn', 'Turn a topic or your selected material into slides, review the outline and export an editable PowerPoint.'],
      ]).map(([title, text]) => <article className="study-feature-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}
    </div>
    <p className="architecture-footnote">Uses your own selected AI provider or local model. When you ask, relevant excerpts are included in the request. PDFs and study conversations are not part of account sync. Searchable text PDFs are supported; scanned pages need OCR first. AI answers and citations should be checked against the original material.</p>
    <div className="study-actions"><Button href="/download/">Release information</Button><a href={slidesOnly ? '/students/' : '/slideshows/'}>{slidesOnly ? 'Explore Student workspace' : 'Explore slideshow generation'} →</a></div>
  </section>;
}
