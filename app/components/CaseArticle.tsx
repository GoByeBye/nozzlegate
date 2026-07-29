import Image from "next/image";
import Link from "next/link";
import { CopyButton } from "./CopyButton";
import type {
  CaseActionLink,
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

function RenderedEvidenceLinks({
  ids,
  sources,
}: {
  ids: string[];
  sources: CaseSource[];
}) {
  const records = ids
    .map((id) => sources.find((source) => source.id === id))
    .filter(
      (source): source is CaseSource =>
        Boolean(
          source &&
            source.kind === "Evidence" &&
            source.href.startsWith("/evidence/") &&
            !/\.[a-z0-9]{2,5}$/i.test(source.href),
        ),
    );

  if (!records.length) {
    return null;
  }

  return (
    <div className="evidence-record-links" aria-label="Rendered evidence">
      {records.map((record) => (
        <Link href={record.href} key={record.id}>
          Read rendered transcript <span aria-hidden="true">↗</span>
          <span className="sr-only">: {record.title}</span>
        </Link>
      ))}
    </div>
  );
}

function RenderedRecordStrip({ sources }: { sources: CaseSource[] }) {
  const records = sources.filter(
    (source) =>
      source.kind === "Evidence" &&
      source.href.startsWith("/evidence/") &&
      !/\.[a-z0-9]{2,5}$/i.test(source.href),
  );

  if (!records.length) {
    return null;
  }

  return (
    <nav
      className="case-record-strip"
      aria-label="Rendered Discord transcripts"
    >
      <div className="case-record-strip__intro">
        <span>Discord transcripts</span>
        <p>Readable records with verification and privacy notes attached.</p>
      </div>
      {records.map((record, index) => (
        <Link href={record.href} key={record.id}>
          <span>Record {String(index + 1).padStart(2, "0")}</span>
          <strong>{record.displayTitle ?? record.title}</strong>
          <small>Open transcript ↗</small>
        </Link>
      ))}
    </nav>
  );
}

function RemedyLinks({ links }: { links?: CaseActionLink[] }) {
  if (!links?.length) {
    return null;
  }

  return (
    <div className="case-remedy__links">
      {links.map((link) => {
        const external = /^https?:/i.test(link.href);

        return (
          <a
            href={link.href}
            key={link.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
          >
            {link.label} <span aria-hidden="true">↗</span>
          </a>
        );
      })}
    </div>
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
        <div className="article-layout">
          <section className="case-summary" id="short-version">
            <p className="section-number">QUICK READ</p>
            <h1>What happened</h1>
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

          <RenderedRecordStrip sources={caseFile.sources} />

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
                      <RenderedEvidenceLinks
                        ids={item.sourceIds}
                        sources={caseFile.sources}
                      />
                      {item.image ? (
                        <figure className="evidence-figure">
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            width={item.image.width}
                            height={item.image.height}
                            sizes="(max-width: 680px) calc(100vw - 32px), 860px"
                            unoptimized
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

            {caseFile.remedy ? (
              <CaseDisclosure
                id="remedy"
                label="Recovery path"
                title={caseFile.remedy.title}
                count={`${caseFile.remedy.steps.length} steps`}
              >
                <div className="case-remedy">
                  <div className="case-remedy__intro">
                    <CitedParagraph
                      paragraph={caseFile.remedy.intro}
                      sources={caseFile.sources}
                    />
                    <p className="case-remedy__boundary">
                      {caseFile.remedy.note}
                    </p>
                  </div>

                  <ol className="case-remedy__steps">
                    {caseFile.remedy.steps.map((step, index) => (
                      <li key={step.title}>
                        <span className="case-remedy__number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3>{step.title}</h3>
                          <p>
                            {step.text}
                            <Citations
                              ids={step.sourceIds}
                              sources={caseFile.sources}
                            />
                          </p>
                          {step.bullets?.length ? (
                            <ul>
                              {step.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          ) : null}
                          <RemedyLinks links={step.links} />
                        </div>
                      </li>
                    ))}
                  </ol>

                  <section className="case-remedy__escalation">
                    <div className="case-remedy__escalation-heading">
                      <p className="eyebrow">Still unresolved?</p>
                      <h3>{caseFile.remedy.escalationTitle}</h3>
                      <p>{caseFile.remedy.escalationIntro}</p>
                    </div>
                    <div className="case-remedy__routes">
                      {caseFile.remedy.escalation.map((route) => (
                        <article key={route.title}>
                          <h4>{route.title}</h4>
                          <p>
                            {route.text}
                            <Citations
                              ids={route.sourceIds}
                              sources={caseFile.sources}
                            />
                          </p>
                          <RemedyLinks links={route.links} />
                        </article>
                      ))}
                    </div>
                  </section>

                  <details className="report-template case-remedy__template">
                    <summary className="report-template__head">
                      <div>
                        <span>EMAIL DRAFT</span>
                        <h4>{caseFile.remedy.templateTitle}</h4>
                      </div>
                      <span className="report-template__toggle">
                        <span className="report-template__open-label">
                          Open draft
                        </span>
                        <span className="report-template__close-label">
                          Close draft
                        </span>
                        <b aria-hidden="true">+</b>
                      </span>
                    </summary>
                    <div className="report-template__body">
                      <div className="report-template__tools">
                        <p>{caseFile.remedy.templateNote}</p>
                        <CopyButton text={caseFile.remedy.emailTemplate} />
                      </div>
                      <pre>{caseFile.remedy.emailTemplate}</pre>
                    </div>
                  </details>
                </div>
              </CaseDisclosure>
            ) : null}

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
            <h2>
              {caseFile.remedy
                ? "Ask for a refund—or report the card fee to Konsumentverket."
                : "Report this to Konsumentverket."}
            </h2>
            <p>
              {caseFile.remedy
                ? "The refund steps are for recovering your fee. The reporting guide is for alerting Sweden’s consumer protection authority to the checkout practice."
                : "Konsumentverket is Sweden’s consumer protection authority. The guide shows what evidence to save and how to submit a report."}
            </p>
          </div>
          <div className="article-action__links">
            {caseFile.remedy ? (
              <a className="button button--dark" href="#remedy">
                See refund steps <span aria-hidden="true">↓</span>
              </a>
            ) : null}
            <Link
              className={caseFile.remedy ? "text-link" : "button button--dark"}
              href={`/report#${caseFile.slug}`}
            >
              {caseFile.remedy
                ? "Report to Konsumentverket"
                : "Open the reporting guide"}{" "}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
