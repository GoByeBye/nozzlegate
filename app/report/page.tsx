import type { Metadata } from "next";
import { CopyButton } from "../components/CopyButton";
import { caseFiles } from "../../content/cases";

export const metadata: Metadata = {
  title: "Report to Konsumentverket",
  description:
    "A step-by-step guide and Swedish templates for reporting Nozzlegate, payment surcharges and warranty terms to Konsumentverket.",
};

const steps = [
  {
    number: "01",
    title: "Save the originals",
    text:
      "Keep the order confirmation, invoice, checkout screenshots, product page, terms and email thread. Include dates and full URLs. Do not edit the originals.",
  },
  {
    number: "02",
    title: "Open the official form",
    text:
      "Use Konsumentverket’s “Anmäl till Konsumentverket” service. Choose “Marknadsföring och avtalsvillkor,” then “Avtal, pris, säljmetod och marknadsföring.”",
  },
  {
    number: "03",
    title: "Identify the company",
    text:
      "For a direct Bondtech purchase: Bondtech AB, org.nr 556995-5643, bondtech.se. If another company sold you the product, name your actual seller and explain Bondtech’s role separately.",
  },
  {
    number: "04",
    title: "Write the event, not the verdict",
    text:
      "Give the date, exact wording or fee, amount, payment method and what happened next. Ask the authority to investigate; do not present a disputed legal conclusion as already decided.",
  },
  {
    number: "05",
    title: "Attach a clean evidence set",
    text:
      "Use descriptive filenames, one document per claim and a short index. Mask card numbers, passwords and unrelated personal data; leave the facts needed by the authority visible.",
  },
  {
    number: "06",
    title: "Submit and keep the receipt",
    text:
      "Review the summary, submit and save the confirmation. Konsumentverket uses reports for supervision but does not resolve your personal compensation claim.",
  },
];

export default function ReportPage() {
  return (
    <main id="main-content">
      <header className="page-hero page-hero--report">
        <div>
          <p className="eyebrow">Swedish authority guide</p>
          <h1>Make the paper trail impossible to ignore.</h1>
          <p>
            Konsumentverket can use your report to supervise marketing,
            pricing and contract terms. The strongest submission is short,
            specific and backed by the document that proves each sentence.
          </p>
          <a
            className="button button--dark"
            href="https://anmalan.konsumentverket.se/flow/anmalning-start"
            target="_blank"
            rel="noreferrer"
          >
            Open the official form <span aria-hidden="true">↗</span>
          </a>
        </div>
        <aside className="page-hero__notice">
          <strong>Know the lane</strong>
          <p>
            A Konsumentverket report is a tip for market supervision. It will
            not get you a refund or a personal decision.
          </p>
          <a
            href="https://www.konsumentverket.se/om-oss/anmala-till-konsumentverket/"
            target="_blank"
            rel="noreferrer"
          >
            Official explanation <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </header>

      <section className="report-steps">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Step by step</p>
            <h2>From receipt to report</h2>
          </div>
          <p>
            The form currently has four stages: what you are reporting, what
            happened, file attachments and who was affected.
          </p>
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
          <p className="eyebrow">Form route</p>
          <h2 id="route-map-title">The clicks to look for</h2>
        </div>
        <ol>
          <li>
            <span>1</span>
            <strong>Välj område</strong>
            <p>Marknadsföring och avtalsvillkor</p>
          </li>
          <li>
            <span>2</span>
            <strong>Gör ett val</strong>
            <p>Avtal, pris, säljmetod och marknadsföring</p>
          </li>
          <li>
            <span>3</span>
            <strong>Vad vill du anmäla?</strong>
            <p>Choose the closest option for your actual event.</p>
          </li>
          <li>
            <span>4</span>
            <strong>Finish the four stages</strong>
            <p>Event · attachments · affected person · summary</p>
          </li>
        </ol>
      </section>

      <section className="template-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Copy, then make it yours</p>
            <h2>Three Swedish report templates</h2>
          </div>
          <p>
            Delete any sentence you cannot prove. Replace every bracketed field
            and describe your own experience.
          </p>
        </div>

        <div className="template-list">
          {caseFiles.map((caseFile) => (
            <article
              className="report-template"
              id={caseFile.slug}
              key={caseFile.slug}
            >
              <div className="report-template__head">
                <div>
                  <span>CASE {caseFile.number}</span>
                  <h3>{caseFile.shortTitle}</h3>
                </div>
                <CopyButton text={caseFile.reportTemplate} />
              </div>
              <pre>{caseFile.reportTemplate}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className="remedy-section">
        <div>
          <p className="eyebrow">If you want your money back</p>
          <h2>Use the dispute lane too.</h2>
        </div>
        <div className="remedy-section__body">
          <p>
            Complain to the seller in writing and state the remedy you want.
            If the seller rejects the claim or does not respond within a
            reasonable time, ARN may be able to review the dispute. ARN
            requires you to complain to the company first and currently charges
            SEK 150.
          </p>
          <div className="link-pair">
            <a
              href="https://www.konsumentverket.se/konsumentratt-process/reklamera-vara/"
              target="_blank"
              rel="noreferrer"
            >
              How to complain about goods <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://www.arn.se/konsument/"
              target="_blank"
              rel="noreferrer"
            >
              ARN consumer guide <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
