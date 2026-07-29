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

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
npm test
```

The site uses vinext and produces Cloudflare Worker-compatible output.

## Content

Case content and its source registry live in
[`content/cases.ts`](content/cases.ts). Update the cited text, source entry, and
verification date together.

Do not commit unredacted evidence containing payment details, addresses,
signatures, support tokens, or unrelated personal information.

## Licensing

- Code: [MIT](LICENSE)
- Original editorial content: [CC BY 4.0](CONTENT-LICENSE.md)
- Third-party documents and evidence remain subject to their original rights.
