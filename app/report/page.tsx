import type { Metadata } from "next";
import { CopyButton } from "../components/CopyButton";
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
    stepsSection,
    steps,
    routeMap,
    templatesSection,
    remedy,
  } = reportContent;

  return (
    <main id="main-content">
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

      <section className="report-steps">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{stepsSection.eyebrow}</p>
            <h2>{stepsSection.title}</h2>
          </div>
          <p>{stepsSection.intro}</p>
        </div>

        <ol className="report-step-grid">
          {steps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="route-map" aria-labelledby="route-map-title">
        <div>
          <p className="eyebrow">{routeMap.eyebrow}</p>
          <h2 id="route-map-title">{routeMap.title}</h2>
        </div>
        <ol>
          {routeMap.items.map((item) => (
            <li key={item.number}>
              <span>{item.number}</span>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="template-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{templatesSection.eyebrow}</p>
            <h2>{templatesSection.title}</h2>
          </div>
          <p>{templatesSection.intro}</p>
        </div>

        <div className="template-list">
          {caseFiles.map((caseFile) => (
            <details
              className="report-template"
              id={caseFile.slug}
              key={caseFile.slug}
            >
              <summary className="report-template__head">
                <div>
                  <span>CASE {caseFile.number}</span>
                  <h3>{caseFile.shortTitle}</h3>
                </div>
                <span className="report-template__toggle">
                  <span className="report-template__open-label">
                    Open template
                  </span>
                  <span className="report-template__close-label">
                    Close template
                  </span>
                  <b aria-hidden="true">+</b>
                </span>
              </summary>
              <div className="report-template__body">
                <div className="report-template__tools">
                  <p>Replace the bracketed fields with your own details.</p>
                  <CopyButton text={caseFile.reportTemplate} />
                </div>
                <pre>{caseFile.reportTemplate}</pre>
              </div>
            </details>
          ))}
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
