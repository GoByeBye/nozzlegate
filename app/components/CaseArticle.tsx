import Image from "next/image";
import Link from "next/link";
import type {
  CaseFile,
  CaseSource,
  CitedText,
} from "../../content/cases";

type CaseArticleProps = {
  caseFile: CaseFile;
};

type DisclosureProps = {
  children: React.ReactNode;
  count: string;
  id: string;
  label: string;
  title: string;
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
              href={source.href}
              target="_blank"
              rel="noreferrer"
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

function CaseDisclosure({
  children,
  count,
  id,
  label,
  title,
}: DisclosureProps) {
  return (
    <details className="case-disclosure" id={id}>
      <summary>
        <span className="case-disclosure__label">{label}</span>
        <strong>{title}</strong>
        <span className="case-disclosure__count">{count}</span>
        <span className="case-disclosure__toggle" aria-hidden="true" />
      </summary>
      <div className="case-disclosure__body">{children}</div>
    </details>
  );
}

export function CaseArticle({ caseFile }: CaseArticleProps) {
  const quickSummary = caseFile.summary.slice(0, 2);
  const additionalContext = caseFile.summary.slice(2);

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
                <span className="lead-fact__case">Key figure</span>
                <strong>{caseFile.leadFact}</strong>
                <p>{caseFile.leadLabel}</p>
                <div className="lead-fact__meta">
                  <span>Updated {caseFile.updated}</span>
                  <span>{caseFile.sources.length} sources</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="case-facts" aria-label="Case snapshot">
          {caseFile.metrics.map((metric) => (
            <div className="case-facts__item" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <div className="article-layout">
          <section className="case-summary" id="short-version">
            <p className="section-number">QUICK READ</p>
            <h2>What happened</h2>
            <div className="prose prose--lead">
              {quickSummary.map((paragraph) => (
                <CitedParagraph
                  key={paragraph.text}
                  paragraph={paragraph}
                  sources={caseFile.sources}
                />
              ))}
            </div>

            {additionalContext.length ? (
              <details className="context-details">
                <summary>More context</summary>
                <div className="prose">
                  {additionalContext.map((paragraph) => (
                    <CitedParagraph
                      key={paragraph.text}
                      paragraph={paragraph}
                      sources={caseFile.sources}
                    />
                  ))}
                </div>
              </details>
            ) : null}

            <div className="editorial-note">
              <strong>A note on wording</strong>
              <p>
                We separate what Bondtech confirmed, what buyers submitted and
                what the law says. Only an authority or court can make a final
                legal ruling.
              </p>
            </div>
          </section>

          <div className="case-disclosures">
            <CaseDisclosure
              id="evidence"
              label="Evidence"
              title="Documents and statements"
              count={`${caseFile.evidence.length} records`}
            >
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
                      {item.image ? (
                        <figure className="evidence-figure">
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            width={item.image.width}
                            height={item.image.height}
                            sizes="(max-width: 680px) calc(100vw - 32px), 860px"
                          />
                          <figcaption>{item.image.caption}</figcaption>
                        </figure>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </CaseDisclosure>

            <CaseDisclosure
              id="timeline"
              label="Timeline"
              title="How the position changed"
              count={`${caseFile.timeline.length} dates`}
            >
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
            </CaseDisclosure>

            <CaseDisclosure
              id="legal-reading"
              label="Legal context"
              title="What the law says"
              count="Not legal advice"
            >
              <div className="legal-panel">
                <h3>{caseFile.legalTitle}</h3>
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
            </CaseDisclosure>

            <CaseDisclosure
              id="open-questions"
              label="Still missing"
              title="What would strengthen the case"
              count={`${caseFile.openQuestions.length} questions`}
            >
              <ul className="question-list">
                {caseFile.openQuestions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </CaseDisclosure>

            <CaseDisclosure
              id="sources"
              label="Sources"
              title="Open the original records"
              count={`${caseFile.sources.length} links`}
            >
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
            </CaseDisclosure>
          </div>
        </div>

        <section className="article-action">
          <div>
            <p className="eyebrow">Bought an INDX?</p>
            <h2>Report what happened.</h2>
            <p>
              The Swedish guide covers what to save, where to send it and what
              to write.
            </p>
          </div>
          <Link
            className="button button--dark"
            href={`/report#${caseFile.slug}`}
          >
            Open the guide <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </article>
    </main>
  );
}
