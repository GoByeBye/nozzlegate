import Link from "next/link";
import type {
  CaseFile,
  CaseSource,
  CitedText,
} from "../../content/cases";

type CaseArticleProps = {
  caseFile: CaseFile;
};

function sourceNumber(sources: CaseSource[], sourceId: string) {
  return sources.findIndex((source) => source.id === sourceId) + 1;
}

function Citations({
  ids,
  sources,
}: {
  ids?: string[];
  sources: CaseSource[];
}) {
  if (!ids?.length) {
    return null;
  }

  return (
    <span className="citations" aria-label="Sources">
      {ids.map((id) => {
        const source = sources.find((entry) => entry.id === id);
        const number = sourceNumber(sources, id);

        if (!source || number < 1) {
          return null;
        }

        return (
          <sup key={id}>
            <a
              href={`#source-${number}`}
              aria-label={`Source ${number}: ${source.title}`}
            >
              {number}
            </a>
          </sup>
        );
      })}
    </span>
  );
}

function CitedParagraph({
  paragraph,
  sources,
}: {
  paragraph: CitedText;
  sources: CaseSource[];
}) {
  return (
    <p>
      {paragraph.text}
      <Citations ids={paragraph.sourceIds} sources={sources} />
    </p>
  );
}

export function CaseArticle({ caseFile }: CaseArticleProps) {
  return (
    <main id="main-content">
      <article>
        <header className="article-hero">
          <div className="article-hero__inner">
            <div className="article-breadcrumb">
              <Link href="/">Nozzlegate</Link>
              <span aria-hidden="true">/</span>
              <span>Case {caseFile.number}</span>
            </div>

            <div className="article-hero__grid">
              <div>
                <div className="article-statusline">
                  <span className={`status status--${caseFile.statusTone}`}>
                    {caseFile.status}
                  </span>
                  <span>{caseFile.statusNote}</span>
                </div>
                <p className="eyebrow eyebrow--light">{caseFile.category}</p>
                <h1>{caseFile.title}</h1>
                <p className="article-hero__deck">{caseFile.deck}</p>
              </div>

              <div className="lead-fact">
                <span className="lead-fact__case">CASE {caseFile.number}</span>
                <strong>{caseFile.leadFact}</strong>
                <p>{caseFile.leadLabel}</p>
                <div className="lead-fact__meta">
                  <span>Verified {caseFile.updated}</span>
                  <span>{caseFile.readTime} read</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="metric-strip" aria-label="Case snapshot">
          {caseFile.metrics.map((metric) => (
            <div className="metric-strip__item" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <div className="article-layout">
          <aside className="article-index" aria-label="On this page">
            <p>On this page</p>
            <ol>
              <li>
                <a href="#short-version">The short version</a>
              </li>
              <li>
                <a href="#evidence">Evidence record</a>
              </li>
              <li>
                <a href="#timeline">Timeline</a>
              </li>
              <li>
                <a href="#legal-reading">Legal reading</a>
              </li>
              <li>
                <a href="#open-questions">Open questions</a>
              </li>
              <li>
                <a href="#sources">Sources</a>
              </li>
            </ol>
          </aside>

          <div className="article-body">
            <section className="article-section" id="short-version">
              <p className="section-number">01 / THE SHORT VERSION</p>
              <h2>What the evidence supports today</h2>
              <div className="prose prose--lead">
                {caseFile.summary.map((paragraph) => (
                  <CitedParagraph
                    key={paragraph.text}
                    paragraph={paragraph}
                    sources={caseFile.sources}
                  />
                ))}
              </div>
              <div className="editorial-note">
                <strong>Editorial line</strong>
                <p>
                  We distinguish company-confirmed facts, primary documents,
                  community records and legal analysis. “Illegal” is a
                  conclusion for an authority or court, not a substitute for
                  evidence.
                </p>
              </div>
            </section>

            <section className="article-section" id="evidence">
              <p className="section-number">02 / EVIDENCE RECORD</p>
              <h2>Claim, record, assessment</h2>
              <div className="evidence-stack">
                {caseFile.evidence.map((item, index) => (
                  <article className="evidence-row" key={item.title}>
                    <span className="evidence-row__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="evidence-row__label">{item.label}</p>
                      <h3>{item.title}</h3>
                      <p>
                        {item.text}
                        <Citations
                          ids={item.sourceIds}
                          sources={caseFile.sources}
                        />
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="article-section" id="timeline">
              <p className="section-number">03 / TIMELINE</p>
              <h2>How the record developed</h2>
              <ol className="timeline">
                {caseFile.timeline.map((item) => (
                  <li key={`${item.date}-${item.title}`}>
                    <time>{item.date}</time>
                    <div>
                      <h3>{item.title}</h3>
                      <p>
                        {item.text}
                        <Citations
                          ids={item.sourceIds}
                          sources={caseFile.sources}
                        />
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="article-section" id="legal-reading">
              <p className="section-number">04 / LEGAL READING</p>
              <h2>{caseFile.legalTitle}</h2>
              <div className="legal-panel">
                <span className="legal-panel__label">
                  Analysis · not legal advice
                </span>
                <div className="prose">
                  {caseFile.legalAnalysis.map((paragraph) => (
                    <CitedParagraph
                      key={paragraph.text}
                      paragraph={paragraph}
                      sources={caseFile.sources}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section className="article-section" id="open-questions">
              <p className="section-number">05 / OPEN QUESTIONS</p>
              <h2>What would move the record forward</h2>
              <ul className="question-list">
                {caseFile.openQuestions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </section>

            <section className="article-section" id="sources">
              <p className="section-number">06 / SOURCES</p>
              <div className="sources-heading">
                <h2>Read the record yourself</h2>
                <p>Checked {caseFile.updated}</p>
              </div>
              <ol className="source-list">
                {caseFile.sources.map((source, index) => (
                  <li id={`source-${index + 1}`} key={source.id}>
                    <span className="source-list__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {source.title} <span aria-hidden="true">↗</span>
                      </a>
                      <p>
                        {source.publisher} · {source.kind} · Checked{" "}
                        {source.checked}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>

        <section className="article-action">
          <div>
            <p className="eyebrow">Turn evidence into a signal</p>
            <h2>Seen this yourself?</h2>
            <p>
              Use the tailored Swedish reporting template, preserve your
              originals and send the facts to Konsumentverket.
            </p>
          </div>
          <Link
            className="button button--dark"
            href={`/report#${caseFile.slug}`}
          >
            Open reporting guide <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </article>
    </main>
  );
}
