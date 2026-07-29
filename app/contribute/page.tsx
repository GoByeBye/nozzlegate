import type { Metadata } from "next";
import { contributeContent } from "../../content/pages";

export const metadata: Metadata = {
  title: contributeContent.metadata.title,
  description: contributeContent.metadata.description,
};

export default function ContributePage() {
  const {
    hero,
    notice,
    evidenceSection,
    evidenceLevels,
    guide,
    correction,
    license,
  } = contributeContent;

  return (
    <main id="main-content">
      <header className="page-hero page-hero--contribute">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p>{hero.intro}</p>
          <a className="button button--dark" href="#how-to-contribute">
            {hero.action} <span aria-hidden="true">↓</span>
          </a>
        </div>
        <aside className="page-hero__notice page-hero__notice--dark">
          <strong>{notice.title}</strong>
          <p>{notice.text}</p>
        </aside>
      </header>

      <section className="evidence-standard" id="method">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{evidenceSection.eyebrow}</p>
            <h2>{evidenceSection.title}</h2>
          </div>
          <p>{evidenceSection.intro}</p>
        </div>

        <div className="evidence-levels">
          {evidenceLevels.map((item) => (
            <article key={item.level}>
              <span>{item.level}</span>
              <h3>{item.title}</h3>
              <p>{item.examples}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contribution-guide" id="how-to-contribute">
        <div>
          <p className="eyebrow">{guide.eyebrow}</p>
          <h2>{guide.title}</h2>
        </div>

        <div className="checklist">
          {guide.steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>
                  {step.text ??
                    (step.code ? (
                      <>
                        {step.textBefore} <code>{step.code}</code>
                        {step.textAfter}
                      </>
                    ) : null)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="correction-policy" id="corrections">
        <div>
          <p className="eyebrow">{correction.eyebrow}</p>
          <h2>{correction.title}</h2>
        </div>
        <div>
          {correction.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="license-strip">
        <div>
          <p className="eyebrow">{license.eyebrow}</p>
          <h2>{license.title}</h2>
        </div>
        <p>{license.text}</p>
      </section>
    </main>
  );
}
