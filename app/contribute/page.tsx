import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute evidence",
  description:
    "How to contribute evidence, corrections and case updates to the open-source Nozzlegate record.",
};

const evidenceLevels = [
  {
    level: "A",
    title: "Primary record",
    examples: "Company statement, law, invoice, email you received, original photo.",
  },
  {
    level: "B",
    title: "Preserved record",
    examples: "Internet Archive capture, dated PDF, full-page screenshot with URL.",
  },
  {
    level: "C",
    title: "Corroborated report",
    examples: "Independent accounts that agree on material facts.",
  },
  {
    level: "D",
    title: "Lead only",
    examples: "Anonymous claim, cropped screenshot, paraphrase without a source.",
  },
];

export default function ContributePage() {
  return (
    <main id="main-content">
      <header className="page-hero page-hero--contribute">
        <div>
          <p className="eyebrow">Open record · open corrections</p>
          <h1>Bring receipts. Leave the mob at the door.</h1>
          <p>
            Nozzlegate is built for public contribution. The standard is
            simple: a reader should be able to see what happened, when it
            happened and how we know.
          </p>
          <a className="button button--dark" href="#how-to-contribute">
            Contribution checklist <span aria-hidden="true">↓</span>
          </a>
        </div>
        <aside className="page-hero__notice page-hero__notice--dark">
          <strong>Protect people</strong>
          <p>
            Never publish full card numbers, addresses, phone numbers,
            signatures, passwords, support tokens or unrelated order data.
          </p>
        </aside>
      </header>

      <section className="evidence-standard" id="method">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Evidence ladder</p>
            <h2>Not every source carries the same weight.</h2>
          </div>
          <p>
            Lower-grade material can start an investigation. It cannot end one.
          </p>
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
          <p className="eyebrow">Before opening a pull request</p>
          <h2>A contribution that can be merged</h2>
        </div>

        <div className="checklist">
          <article>
            <span>01</span>
            <div>
              <h3>State one change</h3>
              <p>
                Name the case file and the exact sentence, date, source or
                status that should change.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Attach provenance</h3>
              <p>
                Provide the original URL, capture date, author or sender, and
                explain how the document came into your possession.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Redact a copy, preserve the original</h3>
              <p>
                Submit a carefully redacted public copy. Keep the untouched
                original available for a regulator or maintainer to verify
                privately.
              </p>
            </div>
          </article>
          <article>
            <span>04</span>
            <div>
              <h3>Separate fact from conclusion</h3>
              <p>
                “The invoice contains this line” is a fact. “This proves a
                crime” is a legal conclusion and needs an authoritative
                decision.
              </p>
            </div>
          </article>
          <article>
            <span>05</span>
            <div>
              <h3>Update the source of truth</h3>
              <p>
                Case content lives in <code>content/cases.ts</code>. Update the
                relevant source entry, cited paragraph and checked date
                together.
              </p>
            </div>
          </article>
          <article>
            <span>06</span>
            <div>
              <h3>Run the checks</h3>
              <p>
                Run <code>npm test</code> before opening a pull request. Explain
                any source that cannot be independently opened.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="correction-policy" id="corrections">
        <div>
          <p className="eyebrow">Correction policy</p>
          <h2>The site must be able to say “we were wrong.”</h2>
        </div>
        <div>
          <p>
            Corrections are evaluated on evidence, not affiliation. A
            correction should identify the contested passage, provide a
            checkable source and propose precise replacement text. Material
            corrections should retain a dated note so readers can see what
            changed.
          </p>
          <p>
            Right of reply matters. A sourced company response is added to the
            relevant record even when it does not resolve the underlying
            dispute.
          </p>
        </div>
      </section>

      <section className="license-strip">
        <div>
          <p className="eyebrow">Reuse the work</p>
          <h2>Code open. Editorial work shareable.</h2>
        </div>
        <p>
          The site code is MIT licensed. Original editorial content is
          available under CC BY 4.0. Third-party evidence remains subject to
          its original rights and is not relicensed by this project.
        </p>
      </section>
    </main>
  );
}
