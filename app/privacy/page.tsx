import type { Metadata } from "next";
import { privacyContent } from "../../content/pages";

export const metadata: Metadata = {
  title: privacyContent.metadata.title,
  description: privacyContent.metadata.description,
};

export default function PrivacyPage() {
  const { hero, facts, sections } = privacyContent;

  return (
    <main id="main-content">
      <header className="privacy-hero">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.intro}</p>
        <small>Last updated {hero.updated}</small>
      </header>

      <section className="privacy-facts" aria-label="Privacy at a glance">
        {facts.map((fact) => (
          <article key={fact.label}>
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
            <p>{fact.text}</p>
          </article>
        ))}
      </section>

      <div className="privacy-layout">
        <aside className="privacy-index">
          <p className="eyebrow">In this notice</p>
          <nav aria-label="Privacy notice sections">
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>{section.number}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="privacy-copy">
          {sections.map((section) => (
            <section id={section.id} key={section.id}>
              <p className="eyebrow">{section.number}</p>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.links ? (
                <div className="privacy-copy__links">
                  {section.links.map((link) => (
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
              ) : null}
            </section>
          ))}

          <div className="privacy-contact">
            <p className="eyebrow">Privacy request</p>
            <h2>Ask about your data.</h2>
            <a
              className="button button--dark"
              href="mailto:contact.nozzlegate@f22.no?subject=Privacy%20request"
            >
              Email the project <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}
