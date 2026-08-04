# Transcript records

These Markdown files are the canonical public transcripts rendered by the
evidence viewer. They cover chat records and transcribed email threads.

- Preserve submitted wording, including spelling and supplied timestamps.
- Replace non-company usernames with stable labels such as
  `Community member 1`.
- Do not infer a missing date, timezone, role, or attribution.
- Keep the current verification status and its basis in the front matter and
  opening note.
- Update the matching provenance record under [`evidence`](../../evidence)
  when the transcript or its redactions change.

The public `.md` URL is generated from this canonical file. Do not maintain a
second copy under `public`.

## Front matter

`recordKind` selects the viewer chrome. It is `discord` by default; set it to
`email` for a transcribed mail thread, which adds a redacted envelope block and
replaces the chat wording.

`participants` declares each speaker's role explicitly:

```yaml
participants:
  - label: Buyer
    role: community
    note: Ticket opener, redacted at their request
```

Declare it for any label outside `Community member <n>`. Without it a speaker
falls through to the `unattributed` role and the viewer labels the message an
unattributed record note, which is wrong for a known author.

`envelope` supplies the mail header rows: `subject`, `company`, `buyer`,
`thread` and `outcome`. Any other key is ignored, so an unreviewed header
cannot reach the page.

## Email records

Transcribe from the original mail file. Never commit the file itself: an
`.eml` carries the sender's address, message identifiers, mailbox and tenant
identifiers, and Safe Links wrappers that embed the same identifiers inside
otherwise ordinary URLs, and parts of it are base64 encoded, so a text search
for a name will not find them all. Replace a redacted greeting with
`Hi [redacted],` rather than deleting the line, and record every removal in the
provenance file.
