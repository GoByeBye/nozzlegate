import type { Metadata } from "next";
import { CaseCard } from "./components/CaseCard";
import { caseFiles } from "../content/cases";
import { homeContent } from "../content/pages";

export const metadata: Metadata = {
  title: homeContent.metadata.title,
  description: homeContent.metadata.description,
};

export default function Home() {
  const {
    hero,
    docket,
    caseSection,
    confirmation,
    standardsSection,
    reportBanner,
  } = homeContent;

  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="home-hero__grid">
          <div className="home-hero__copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>
              {hero.headlineLine1}
              <br />
              <em>{hero.headlineEmphasis}</em>
            </h1>
            <p className="home-hero__intro">{hero.intro}</p>
            <div className="button-row">
              <a className="button button--dark" href="#case-files">
                {hero.primaryAction} <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link" href="/report">
                {hero.secondaryAction} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <aside className="hero-docket" aria-label="Current dossier status">
            <div className="hero-docket__head">
              <span>{docket.label}</span>
              <span>{docket.reference}</span>
            </div>
            <div className="hero-docket__mark" aria-hidden="true">
              <span>{docket.markTop}</span>
              <strong>{docket.markBottom}</strong>
            </div>
            <dl className="hero-docket__stats">
              {docket.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
            <p className="hero-docket__note">
              {docket.verifiedLabel}{" "}
              <time dateTime={docket.verifiedDate}>
                {docket.verifiedDisplay}
              </time>
            </p>
          </aside>
        </div>

      </section>

      <section className="case-section" id="case-files">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{caseSection.eyebrow}</p>
            <h2>{caseSection.title}</h2>
          </div>
          <p>{caseSection.intro}</p>
        </div>

        <div className="case-grid">
          {caseFiles.map((caseFile) => (
            <CaseCard caseFile={caseFile} key={caseFile.slug} />
          ))}
        </div>
      </section>

      <section className="confirmed-band">
        <div className="confirmed-band__label">
          <span className="live-dot" aria-hidden="true" />
          {confirmation.label}
        </div>
        <blockquote>“{confirmation.quote}”</blockquote>
        <div className="confirmed-band__source">
          <span>{confirmation.sourceLabel}</span>
          <a
            href={confirmation.href}
            target="_blank"
            rel="noreferrer"
          >
            {confirmation.action} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="standards-section">
        <div className="standards-section__intro">
          <p className="eyebrow">{standardsSection.eyebrow}</p>
          <h2>{standardsSection.title}</h2>
          <p>{standardsSection.intro}</p>
          <a className="text-link" href="/contribute">
            {standardsSection.action} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="standard-list">
          {standardsSection.standards.map((standard) => (
            <article key={standard.number}>
              <span>{standard.number}</span>
              <div>
                <h3>{standard.title}</h3>
                <p>{standard.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="report-banner">
        <div>
          <p className="eyebrow">{reportBanner.eyebrow}</p>
          <h2>{reportBanner.title}</h2>
        </div>
        <p>{reportBanner.text}</p>
        <a className="button button--paper" href="/report">
          {reportBanner.action} <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
