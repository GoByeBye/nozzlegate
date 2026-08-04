import type { Metadata } from "next";
import Image from "next/image";
import { CaseCard } from "./components/CaseCard";
import { caseFiles } from "../content/cases";
import { homeContent } from "../content/pages";

export const metadata: Metadata = {
  title: homeContent.metadata.title,
  description: homeContent.metadata.description,
};

export default function Home() {
  const { caseSection, community, actions } = homeContent;

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
        <section className="home-community" aria-labelledby="home-community-title">
          <Image
            className="home-community__icon"
            src="/brand/discord-server-icon.png"
            alt={community.iconAlt}
            width={512}
            height={512}
            sizes="72px"
            unoptimized
          />
          <div className="home-community__body">
            <p className="eyebrow">{community.eyebrow}</p>
            <h2 id="home-community-title">{community.title}</h2>
            <p>{community.text}</p>
            <p className="home-community__note">{community.note}</p>
          </div>
          <a
            className="button button--solid home-community__action"
            href={community.href}
            target="_blank"
            rel="noreferrer"
          >
            {community.label} <span aria-hidden="true">↗</span>
          </a>
        </section>

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
