import type { Metadata } from "next";
import { CaseCard } from "./components/CaseCard";
import { caseFiles } from "../content/cases";
import { homeContent } from "../content/pages";

export const metadata: Metadata = {
  title: homeContent.metadata.title,
  description: homeContent.metadata.description,
};

export default function Home() {
  const { caseSection, actions } = homeContent;

  return (
    <main id="main-content">
      <section className="case-section" id="case-files">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{caseSection.eyebrow}</p>
            <h1>{caseSection.title}</h1>
          </div>
          <p>{caseSection.intro}</p>
        </div>

        <div className="case-grid">
          {caseFiles.map((caseFile) => (
            <CaseCard caseFile={caseFile} key={caseFile.slug} />
          ))}
        </div>
        <nav className="home-actions" aria-label="Next steps">
          {actions.map((action) => (
            <a href={action.href} key={action.href}>
              <span>{action.text}</span>
              <strong>
                {action.label} <span aria-hidden="true">↗</span>
              </strong>
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
