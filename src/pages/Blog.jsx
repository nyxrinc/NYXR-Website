import { Button, Eyebrow } from '../components/Primitives';
import { posts } from '../data/blog';

/** The NYXR blog: release write-ups with measured results. */
export default function Blog() {
  return (
    <section className="blog-page container" aria-labelledby="blog-title">
      <Eyebrow>NYXR / BLOG</Eyebrow>
      <h1 id="blog-title">Notes from the core.</h1>
      <p className="blog-lede">What we built, how we measured it, and what we didn’t get right yet.</p>
      <nav className="blog-index" aria-label="Posts">
        {posts.map((post) => (
          <a key={post.id} href={`#${post.id}`}>
            <time dateTime={post.date}>{post.dateLabel}</time>
            <strong>{post.title}</strong>
          </a>
        ))}
      </nav>
      {posts.map((post) => (
        <article key={post.id} className="blog-post" id={post.id} aria-labelledby={`${post.id}-title`}>
          <header>
            <span className="release-channel">{post.tag}</span>
            <time dateTime={post.date}>{post.dateLabel}</time>
          </header>
          <h2 id={`${post.id}-title`}>{post.title}</h2>
          <p className="blog-summary">{post.summary}</p>
          {post.sections.map((section) => (
            <section key={section.heading} className="blog-section" data-reveal>
              <h3>{section.heading}</h3>
              {(section.body || []).map((text) => (
                <p key={text.slice(0, 40)}>{text}</p>
              ))}
              {section.table && (
                <figure className="blog-table">
                  <figcaption>{section.table.caption}</figcaption>
                  <div className="blog-table-scroll">
                    <table>
                      <thead>
                        <tr>
                          {section.table.head.map((h, i) => (
                            <th key={i} scope="col">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, i) =>
                              i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>,
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </figure>
              )}
              {section.list && (
                <ul className="blog-list">
                  {section.list.map(([title, text]) => (
                    <li key={title}>
                      <strong>{title}.</strong> {text}
                    </li>
                  ))}
                </ul>
              )}
              {section.note && (
                <div className="update-evidence">
                  <strong>Honestly</strong>
                  <p>{section.note}</p>
                </div>
              )}
            </section>
          ))}
          <p className="blog-sources">{post.sources}</p>
          <div className="button-row">
            <Button href="/download/#nyxr5-preview" icon="download">
              Download NYXR 5.1
            </Button>
            <Button href="/updates/#nyxr-5-1" secondary>
              Release notes
            </Button>
          </div>
        </article>
      ))}
    </section>
  );
}
