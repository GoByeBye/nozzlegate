# Contributing to Nozzlegate

Contributions are welcome as pull requests. Corrections are prioritized over
expansion.

## What makes a useful contribution

Open one focused change and include:

1. the case file and exact passage that should change;
2. the original URL or document;
3. the date the source was published, received, or captured;
4. a short explanation of what the source proves; and
5. any limitation that keeps the source from proving more.

Primary records are preferred: company statements, original invoices, complete
email threads, laws, authority guidance, and dated page archives.

## Protect personal information

Never publish:

- complete card or bank details;
- home addresses or phone numbers;
- passwords, reset links, cookies, or support tokens;
- signatures;
- community usernames or handles that are not necessary to attribute a company
  statement;
- unrelated order history; or
- private information about employees or customers.

Create a redacted public copy and preserve the untouched original for a
regulator or a maintainer to verify privately. Redaction must not hide the date,
seller, product, payment method, disputed line item, or other fact the document
is meant to prove.

For chat records, replace non-company handles with stable labels such as
`Community member 1`. Keep a real name only where it is materially necessary
to attribute an official company statement, and explain that choice in the
provenance record.

## Editing a case

Each public case record is a Markdown file in
[`content/cases`](content/cases/README.md). TypeScript contains rendering and
validation logic, not the editorial record.

- Add or update the source in the case’s `sources` list.
- Cite its `id` from the exact paragraph, evidence item, or timeline event it
  supports.
- Update the case verification date if you rechecked every time-sensitive
  statement affected by the change.
- Keep quotes short. Prefer a precise paraphrase plus a link to the full source.
- Do not call conduct illegal, fraudulent, criminal, or deceptive unless an
  authoritative decision supports that exact description.
- Keep public evidence transcripts as Markdown and record every redaction in
  the matching provenance file under [`evidence`](evidence/README.md).

Homepage and guide copy is also Markdown under
[`content/pages`](content/pages/README.md). Keep factual and instructional copy
there rather than embedding it in a page component.

## Verification

Run:

```bash
npm test
npm run lint
```

Explain any source that cannot be opened independently.

## Corrections and replies

A correction should identify the contested wording, provide a checkable source,
and propose precise replacement text. Material corrections should include a
dated note explaining what changed.

A sourced company response belongs in the record even when it does not resolve
the underlying dispute.
