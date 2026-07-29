# Case Markdown

Each public case is stored as one Markdown file:

- `nozzlegate.md`
- `payment-surcharges.md`
- `warranty-terms.md`

The YAML front matter is the site’s source of truth. It contains the card
summary, metrics, cited narrative, evidence rows, timeline, legal analysis,
open questions, source registry, and Swedish report template. Application code
only validates and renders this material.

## Editing safely

1. Change the relevant prose and its `sourceIds` together.
2. Add a source to `sources` before citing its unique `id`.
3. Keep evidence limitations in the same item as the claim.
4. Update `updated` only after rechecking every time-sensitive statement your
   change affects.
5. Keep multiline report templates as YAML block scalars.
6. Run `npm test` and `npm run lint`.

The build rejects missing required fields, duplicate source IDs, unknown
citations, unsupported source kinds, and invalid image dimensions.

Do not put private source material or personal information in case front matter.
Public evidence belongs in `public/evidence`; its provenance and redaction notes
belong in `evidence`.
