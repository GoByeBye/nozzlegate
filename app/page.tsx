import type { Metadata } from "next";
import { CaseCard } from "./components/CaseCard";
import { caseFiles } from "../content/cases";

export const metadata: Metadata = {
  title: "Nozzlegate — the open consumer record",
  description:
    "A source-first public record of the Bondtech INDX nozzle mismatch, payment surcharges and warranty terms, with a Swedish reporting guide.",
};

const standards = [
  {
    number: "01",
    title: "Primary before viral",
    text:
      "Company statements, law, invoices and archived pages outrank screenshots of screenshots.",
  },
  {
    number: "02",
    title: "Label the confidence",
    text:
      "Confirmed facts, documented reports and legal analysis are never presented as the same thing.",
  },
  {
    number: "03",
    title: "Keep the exit visible",
    text:
      "Every case says what is missing, what could change and where the reader can verify it.",
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="home-hero__grid">
          <div className="home-hero__copy">
            <p className="eyebrow">
              Open-source consumer dossier · Bondtech INDX
            </p>
            <h1>
              The record
              <br />
              is the <em>point.</em>
            </h1>
            <p className="home-hero__intro">
              Nozzlegate tracks what was promised, what was delivered and what
              the law says—without asking outrage to do the work of evidence.
            </p>
            <div className="button-row">
              <a className="button button--dark" href="#case-files">
                Read the case files <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link" href="/report">
                Report to Konsumentverket <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <aside className="hero-docket" aria-label="Current dossier status">
            <div className="hero-docket__head">
              <span>PUBLIC RECORD</span>
              <span>NG / 2026</span>
            </div>
            <div className="hero-docket__mark" aria-hidden="true">
              <span>NOZZLE</span>
              <strong>GATE</strong>
            </div>
            <dl className="hero-docket__stats">
              <div>
                <dt>Case files</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Company admission</dt>
                <dd>01</dd>
              </div>
              <div>
                <dt>Primary sources</dt>
                <dd>12+</dd>
              </div>
            </dl>
            <p className="hero-docket__note">
              Last verified <time dateTime="2026-07-29">29.07.2026</time>
            </p>
          </aside>
        </div>

        <div className="hero-ticker" aria-label="Current key findings">
          <span>01 — SHIPPED NOZZLES ARE NOT TRULY HARDENED</span>
          <span>02 — CARD-FEE RECEIPTS REQUESTED</span>
          <span>03 — 90 DAYS ≠ STATUTORY LIMIT</span>
        </div>
      </section>

      <section className="case-section" id="case-files">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The active docket</p>
            <h2>Three claims. Three evidence trails.</h2>
          </div>
          <p>
            Each file shows the claim, strongest evidence, legal context and
            remaining gaps. Start with the status label.
          </p>
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
          Company-confirmed · 29 July 2026
        </div>
        <blockquote>
          “The units shipped with the INDX are not truly hardened.”
        </blockquote>
        <div className="confirmed-band__source">
          <span>Bondtech’s official update</span>
          <a
            href="https://www.bondtech.se/2026/07/29/indx-hardened-nozzles-update/"
            target="_blank"
            rel="noreferrer"
          >
            Read source <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="standards-section">
        <div className="standards-section__intro">
          <p className="eyebrow">How this site earns trust</p>
          <h2>Anger starts the search. Evidence finishes it.</h2>
          <p>
            This project can be uncompromising without being careless. The
            editorial standard is designed to make every claim useful to a
            buyer, journalist, regulator or court.
          </p>
          <a className="text-link" href="/contribute">
            Read the evidence standard <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="standard-list">
          {standards.map((standard) => (
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
          <p className="eyebrow">A paper trail has leverage</p>
          <h2>Report what happened.</h2>
        </div>
        <p>
          A step-by-step Konsumentverket guide, evidence checklist and
          copy-ready Swedish templates for each case file.
        </p>
        <a className="button button--paper" href="/report">
          Start the guide <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
