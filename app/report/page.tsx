import type { Metadata } from "next";
import { CopyButton } from "../components/CopyButton";
import { HashGuideOpener } from "../components/HashGuideOpener";
import { caseFiles } from "../../content/cases";
import { reportContent } from "../../content/pages";

export const metadata: Metadata = {
  title: reportContent.metadata.title,
  description: reportContent.metadata.description,
};

export default function ReportPage() {
  const {
    hero,
    notice,
    whyReport,
    sharedRoute,
    guideSection,
    issueGuides,
    finish,
    remedy,
  } = reportContent;

  return (
    <main id="main-content">
      <HashGuideOpener />
      <header className="page-hero page-hero--report">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p>{hero.intro}</p>
          <a
            className="button button--dark"
            href={hero.href}
            target="_blank"
            rel="noreferrer"
          >
            {hero.action} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <aside className="page-hero__notice">
          <strong>{notice.title}</strong>
          <p>{notice.text}</p>
          <a
            href={notice.href}
            target="_blank"
            rel="noreferrer"
          >
            {notice.action} <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </header>

      <section
        className="why-report-section"
        aria-labelledby="why-report-title"
      >
        <div>
          <p className="eyebrow">{whyReport.eyebrow}</p>
          <h2 id="why-report-title">{whyReport.title}</h2>
        </div>
        <div className="why-report-section__body">
          <p>{whyReport.text}</p>
          <p className="why-report-section__note">{whyReport.note}</p>
          <a
            className="text-link"
            href={whyReport.href}
            target="_blank"
            rel="noreferrer"
          >
            {whyReport.action} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section
        className="route-map route-map--compact"
        aria-labelledby="route-map-title"
      >
        <div className="route-map__heading">
          <div>
            <p className="eyebrow">{sharedRoute.eyebrow}</p>
            <h2 id="route-map-title">{sharedRoute.title}</h2>
          </div>
          <div>
            <p>{sharedRoute.intro}</p>
            <small>{sharedRoute.verified}</small>
          </div>
        </div>
        <ol>
          {sharedRoute.items.map((item) => (
            <li key={item.number}>
              <span>{item.number}</span>
              <strong>{item.title}</strong>
              <small className="route-map__translation">
                English: {item.titleTranslation}
              </small>
              <p className="route-map__choice">
                <span>{item.text}</span>
                <small>English: {item.textTranslation}</small>
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="issue-guide-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{guideSection.eyebrow}</p>
            <h2>{guideSection.title}</h2>
          </div>
          <p>{guideSection.intro}</p>
        </div>

        <div className="issue-guide-list">
          {issueGuides.map((guide) => {
            const caseFile = caseFiles.find(
              (entry) => entry.slug === guide.caseSlug,
            );

            if (!caseFile) {
              throw new Error(`Missing case file for ${guide.caseSlug}`);
            }

            return (
              <details
                className="issue-guide"
                id={guide.caseSlug}
                key={guide.caseSlug}
              >
                <summary className="issue-guide__summary">
                  <span className="issue-guide__case">
                    CASE {caseFile.number}
                  </span>
                  <span className="issue-guide__title">
                    <strong>{guide.title}</strong>
                    <small>{guide.summary}</small>
                  </span>
                  <span className="issue-guide__toggle" aria-hidden="true">
                    <span className="issue-guide__open-label">Open guide</span>
                    <span className="issue-guide__close-label">
                      Close guide
                    </span>
                    <b>+</b>
                  </span>
                </summary>

                <div className="issue-guide__body">
                  <ol className="issue-guide__steps">
                    <li>
                      <span className="issue-guide__number">1</span>
                      <div>
                        <p className="issue-guide__form-label">
                          Vad vill du anmäla?
                        </p>
                        <h3>Identify the product and company.</h3>
                        <dl className="issue-guide__fields">
                          {guide.fields.map((field) => (
                            <div key={field.label}>
                              <dt>{field.label}</dt>
                              <dd>{field.value}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </li>

                    <li>
                      <span className="issue-guide__number">2</span>
                      <div>
                        <p className="issue-guide__form-label">
                          Vad har hänt?
                        </p>
                        <h3>Choose how you encountered it.</h3>
                        <p className="issue-guide__answer">
                          {guide.encounter}
                        </p>
                        <p>{guide.encounterNote}</p>
                        <p>{guide.date}</p>

                        <details className="report-template report-template--nested">
                          <summary className="report-template__head">
                            <div>
                              <span>SWEDISH DRAFT</span>
                              <h4>Text for “Berätta kort om händelsen”</h4>
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
                              <p>
                                Replace the bracketed fields. Remove anything
                                that did not happen to you.
                              </p>
                              <CopyButton text={caseFile.reportTemplate} />
                            </div>
                            <pre>{caseFile.reportTemplate}</pre>
                          </div>
                        </details>
                      </div>
                    </li>

                    <li>
                      <span className="issue-guide__number">3</span>
                      <div>
                        <p className="issue-guide__form-label">Bifoga filer</p>
                        <h3>Attach the proof you have.</h3>
                        <ul className="issue-guide__evidence">
                          {guide.attachments.map((attachment) => (
                            <li key={attachment}>{attachment}</li>
                          ))}
                        </ul>
                        <p>{finish.files}</p>
                      </div>
                    </li>

                    <li>
                      <span className="issue-guide__number">4</span>
                      <div>
                        <p className="issue-guide__form-label">
                          Vem är drabbad?
                        </p>
                        <h3>Choose what you are comfortable sharing.</h3>
                        <p>{finish.affected}</p>
                        <p>{finish.contact}</p>
                      </div>
                    </li>

                    <li>
                      <span className="issue-guide__number">5</span>
                      <div>
                        <p className="issue-guide__form-label">
                          Sammanfattning
                        </p>
                        <h3>Review, then send.</h3>
                        <p>{finish.summary}</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </details>
            );
          })}
        </div>
      </section>

      <section className="remedy-section">
        <div>
          <p className="eyebrow">{remedy.eyebrow}</p>
          <h2>{remedy.title}</h2>
        </div>
        <div className="remedy-section__body">
          <p>{remedy.text}</p>
          <div className="link-pair">
            {remedy.links.map((link) => (
              <a
                href={link.href}
                key={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
