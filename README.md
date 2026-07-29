# nozzlegate.com

An open-source, source-first consumer dossier covering:

1. the Bondtech INDX hardened-nozzle mismatch;
2. reported payment-method surcharges; and
3. warranty terms that may misstate or obscure EU consumer rights.

The site also includes a step-by-step guide and Swedish templates for reporting
marketing, pricing, and contract-term concerns to Konsumentverket.

## Editorial position

This project can be forceful without blurring evidence and allegation. Every
case file distinguishes:

- company-confirmed facts;
- primary and preserved records;
- community reports that still need an original document;
- legal analysis; and
- conclusions that only an authority or court can make.

Read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a correction or new
evidence.

## AI disclosure

AI tools have assisted with parts of the code, design, research organization,
tests, and first drafts. Human maintainers decide what is published, verify
claims against cited records, and remain responsible for the result. AI output
is never treated as a source or independent verification.

See [NOTICE.md](NOTICE.md) for the full project notice.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
npm test
```

The site uses vinext and produces Cloudflare Worker-compatible output.

## Design

The interface adapts the visual language of
[daddie.dev](https://daddie.dev): a near-black canvas, Montserrat typography,
purple links and borders, gold offset controls, and red warning accents.

The self-hosted Montserrat subset is distributed under the
[SIL Open Font License](public/fonts/OFL.txt).

## Content

Case content and source registries live in contributor-friendly Markdown under
[`content/cases`](content/cases/README.md). Evidence transcripts are also
published as Markdown. Homepage and guide copy lives under
[`content/pages`](content/pages/README.md). TypeScript is limited to schema
validation and presentation.

Do not commit unredacted evidence containing payment details, addresses,
signatures, support tokens, unrelated personal information, or community
usernames that are not needed to attribute an official statement.

## Licensing

- Code: [MIT](LICENSE)
- Original editorial content: [CC BY 4.0](CONTENT-LICENSE.md)
- Third-party documents and evidence remain subject to their original rights.
- AI-assisted work: [project notice](NOTICE.md#ai-assisted-work)
