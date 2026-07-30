import Link from "next/link";
import type { ReactNode } from "react";
import type {
  TranscriptContextBlock,
  TranscriptMessage,
  TranscriptRecord,
} from "../../content/transcripts";

type TranscriptViewerProps = {
  record: TranscriptRecord;
};

function inlineMarkdown(text: string) {
  const pattern =
    /(\[[^\]]+\]\(https?:\/\/[^)]+\)|`[^`]+`|https?:\/\/[^\s]+)/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      nodes.push(text.slice(cursor, index));
    }

    const token = match[0];
    const markdownLink = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);

    if (markdownLink) {
      nodes.push(
        <a
          href={markdownLink[2]}
          target="_blank"
          rel="noreferrer noopener"
          key={`${index}-${markdownLink[2]}`}
        >
          {markdownLink[1]}
        </a>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(<code key={`${index}-${token}`}>{token.slice(1, -1)}</code>);
    } else {
      nodes.push(
        <a
          href={token}
          target="_blank"
          rel="noreferrer noopener"
          key={`${index}-${token}`}
        >
          {token}
        </a>,
      );
    }

    cursor = index + token.length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function ContextBlock({ block }: { block: TranscriptContextBlock }) {
  if (block.type === "heading") {
    return <h3>{block.text}</h3>;
  }

  if (block.type === "notice") {
    return (
      <div className="transcript-context__notice">
        {block.paragraphs.map((paragraph) => (
          <p key={paragraph}>{inlineMarkdown(paragraph)}</p>
        ))}
      </div>
    );
  }

  return <p>{inlineMarkdown(block.text)}</p>;
}

function roleLabel(message: TranscriptMessage) {
  if (message.role === "company") {
    return "Attributed company response";
  }

  if (message.role === "unattributed") {
    return "Unattributed record note";
  }

  return null;
}

export function TranscriptViewer({ record }: TranscriptViewerProps) {
  const isVerified = record.recordType === "Maintainer-verified transcript";

  return (
    <main id="main-content" className="transcript-page">
      <header className="transcript-hero">
        <div className="transcript-hero__inner">
          <div className="article-breadcrumb">
            <Link href="/">Nozzlegate</Link>
            <span aria-hidden="true">/</span>
            <Link href="/cases/nozzlegate">Nozzlegate issue</Link>
            <span aria-hidden="true">/</span>
            <span>Discord record</span>
          </div>

          <div className="transcript-hero__grid">
            <div>
              <p className="eyebrow">{record.recordType}</p>
              <h1>{record.displayTitle}</h1>
              <p className="transcript-hero__deck">{record.deck}</p>

              <div className="transcript-hero__actions">
                <a
                  className="button"
                  href={record.rawHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open raw Markdown <span aria-hidden="true">↗</span>
                </a>
                <Link href="/cases/nozzlegate#evidence">
                  Back to the case
                </Link>
              </div>
            </div>

            <aside
              className={`transcript-status${
                isVerified ? " transcript-status--verified" : ""
              }`}
              aria-label="Verification status"
            >
              <span>Verification</span>
              <strong>Verified transcript</strong>
              <p>{record.verification}.</p>
            </aside>
          </div>
        </div>
      </header>

      <dl className="transcript-meta" aria-label="Transcript metadata">
        <div>
          <dt>Channel</dt>
          <dd>{record.attributedChannel}</dd>
        </div>
        <div>
          <dt>Date supplied</dt>
          <dd>{record.attributedDate}</dd>
        </div>
        <div>
          <dt>Time supplied</dt>
          <dd>{record.attributedTime}</dd>
        </div>
        <div>
          <dt>Timezone</dt>
          <dd>{record.timezone}</dd>
        </div>
      </dl>

      <div className="transcript-layout">
        <aside className="transcript-rail">
          <p className="section-number">ABOUT THIS RECORD</p>
          <h2>Read the verified record.</h2>
          <p>
            This page renders the public, privacy-redacted Markdown record. It
            is not a native Discord export.
          </p>

          <dl>
            <div>
              <dt>Attributed respondent</dt>
              <dd>{record.attributedCompanyRespondent}</dd>
            </div>
            <div>
              <dt>Submitted</dt>
              <dd>{record.submitted}</dd>
            </div>
            {record.privacy ? (
              <div>
                <dt>Privacy</dt>
                <dd>{record.privacy}</dd>
              </div>
            ) : null}
          </dl>

          <details className="transcript-context">
            <summary>Provenance and transcription notes</summary>
            <div>
              {record.context.map((block, index) => (
                <ContextBlock block={block} key={`${block.type}-${index}`} />
              ))}
            </div>
          </details>
        </aside>

        <article className="transcript-sheet" aria-label={record.title}>
          <header className="transcript-sheet__header">
            <div>
              <span className="transcript-sheet__signal" aria-hidden="true" />
              <strong>{record.attributedChannel}</strong>
            </div>
            <span>{record.messageCount} recorded messages</span>
          </header>

          {record.sections.map((section, sectionIndex) => (
            <section
              className="transcript-section"
              key={section.title}
              aria-labelledby={`transcript-section-${sectionIndex}`}
            >
              <header className="transcript-section__header">
                <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                <h2 id={`transcript-section-${sectionIndex}`}>
                  {section.title}
                </h2>
              </header>

              <ol className="transcript-messages">
                {section.messages.map((message, index) => {
                  const messageIndex =
                    record.sections
                      .slice(0, sectionIndex)
                      .reduce(
                        (total, entry) => total + entry.messages.length,
                        0,
                      ) +
                    index +
                    1;
                  const label = roleLabel(message);

                  return (
                    <li
                      className={`transcript-message transcript-message--${message.role}`}
                      key={`${messageIndex}-${message.speaker}-${message.timestamp ?? "note"}`}
                    >
                      <span className="transcript-message__index">
                        {String(messageIndex).padStart(2, "0")}
                      </span>
                      <div className="transcript-message__content">
                        <header>
                          <div>
                            <strong>{message.speaker}</strong>
                            {label ? <span>{label}</span> : null}
                          </div>
                          {message.timestamp ? (
                            <span className="transcript-message__time">
                              {message.timestamp}
                            </span>
                          ) : null}
                        </header>
                        <div className="transcript-message__body">
                          {message.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{inlineMarkdown(paragraph)}</p>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}

          <details className="transcript-raw">
            <summary>View raw source (.md)</summary>
            <div className="transcript-raw__header">
              <span>Exact Markdown used to render this page</span>
              <a href={record.rawHref} target="_blank" rel="noreferrer">
                Open raw file ↗
              </a>
            </div>
            <pre>{record.rawMarkdown}</pre>
          </details>
        </article>
      </div>
    </main>
  );
}
