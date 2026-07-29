import type { CaseFile } from "../../content/cases";

type CaseCardProps = {
  caseFile: CaseFile;
};

export function CaseCard({ caseFile }: CaseCardProps) {
  return (
    <article className="case-card">
      <a className="case-card__link" href={`/cases/${caseFile.slug}`}>
        <div className="case-card__topline">
          <span className="case-card__number">CASE {caseFile.number}</span>
          <span className={`status status--${caseFile.statusTone}`}>
            {caseFile.status}
          </span>
        </div>

        <p className="case-card__category">{caseFile.category}</p>
        <h3>{caseFile.title}</h3>
        <p className="case-card__deck">{caseFile.deck}</p>

        <div className="case-card__fact">
          <strong>{caseFile.leadFact}</strong>
          <span>{caseFile.leadLabel}</span>
        </div>

        <div className="case-card__footer">
          <span>Read the evidence</span>
          <span aria-hidden="true">↗</span>
        </div>
      </a>
    </article>
  );
}
