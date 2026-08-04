# Bondtech support email thread, 17 July 2026

- Canonical public transcript:
  `content/transcripts/bondtech-support-email-thread-2026-07-17.md`
- SHA-256:
  `873004E88477A60CC85C896A6773B0363EB69CFD253F1D63B1C71B114509315E`
- Submitted: 4 August 2026
- Attributed author of company replies: Martin Bondéus, signed
  "Founder, Bondtech AB"
- Attributed channel: Bondtech support ticket, handled through the company's
  Zendesk helpdesk
- Attributed timestamps: 17 July 2026, 08:38–16:56
- Timestamp timezone: GMT+2, as stamped by the helpdesk. The mail headers carry
  the same times in UTC.
- Submitted by: the sender of the thread
- Verification status: verified by the site operator against the original mail
  files
- Privacy treatment: sender's name, email address, helpdesk ticket number,
  message identifiers and mail routing headers removed at the sender's request

## Provenance

The sender supplied two original mail files: the Bondtech reply of 16:41, which
carries the full quoted ticket history, and the sender's own 16:56 reply. Both
originals are retained privately by the site operator and are not committed to
this repository.

The originals can be matched against the private copies by hash:

- Bondtech reply, 16:41:
  `10B6A6DFFD64FE87FAB8D6827212875C10F5336796EC6EBE0CA0EAE394ACC03E`
- Sender's reply, 16:56:
  `0B351195A05B402F1B1C8BB5CA74C48E2A2593F40A465B094C6EA7C32C346AFC`

The sender states that a screenshot of the 16:41 reply is the image that
circulated publicly and was later shown in video coverage of the INDX nozzle
dispute. The site operator has not independently traced the screenshot's
distribution and records that only as the sender's account. What the operator
did verify is the content of the mail files themselves.

## Authenticity signals

The Bondtech-side file was delivered to a Microsoft 365 mailbox, and its
received headers record:

- `spf=pass`, with `smtp.mailfrom=bondtech.se`;
- `dkim=pass` with a verified signature for the signing domain `zendesk.com`;
  and
- `dmarc=pass` with `header.from=bondtech.se`.

Those results are consistent with a message sent through Bondtech's Zendesk
helpdesk rather than a forged or edited copy. The headers themselves are not
published, because they contain the recipient's address, mailbox identifiers,
a tenant identifier and a mailbox logon time.

The sender's own 16:56 reply is an outbound copy from the sender's mailbox and
so carries no receiving-side authentication results.

## Evidentiary value

The verified thread records a Bondtech respondent, signing as founder, stating
that:

- a fully hardened steel version at roughly 60 HRC was evaluated during INDX
  nozzle development;
- it was dropped because the material could not be machined reliably, and the
  nitrocarburised version was supplied "for the time being";
- the shipped nozzles are surface hardened and are "not intended for prolonged
  use with highly abrasive filaments";
- the "hardened" wording was removed from the product page deliberately, to
  avoid creating incorrect expectations; and
- no reliable timeframe for a fully hardened nozzle could be given on 17 July.

An earlier reply the same morning characterises the shipped nozzles as "still
hardened (Nitrocarburised)" while stating they are unsuitable for highly
abrasive materials.

The record is dated 17 July, the same day as the Discord hardness exchange and
twelve days before Bondtech's public update. It shows the company giving the
same technical explanation privately to a paying customer while the product
page wording had already been changed.

The closing 16:56 message asks Bondtech to communicate the change to its
customers. The sender states that this message was never answered. The operator
cannot verify a negative and records only that the supplied files contain no
reply to it.

Bondtech's official 29 July update independently corroborates the central
product mismatch:

- https://www.bondtech.se/2026/07/29/indx-hardened-nozzles-update/

## Redactions

Removed from the public copy at the sender's request, or under the repository's
privacy rules:

- the sender's name, including the first name used in each Bondtech greeting,
  which is shown as `[redacted]`;
- the sender's email address;
- the helpdesk ticket number and the helpdesk's encoded ticket code, which are
  support tokens;
- all message identifiers, thread indexes, mailbox host names, tenant
  identifiers, the recipient's mailbox logon time and every other routing
  header; and
- Microsoft Safe Links wrappers around outbound links, which embed a network
  message identifier and a tenant identifier. Where a link is kept, the public
  copy uses the destination the wrapper pointed to.

Repeated newsletter footer blocks are omitted as marketing boilerplate. No
wording in any message was changed.

The company respondent and the `support@bondtech.se` address are retained.
Those statements are the subject of the record, and the address is published by
Bondtech.

## Not published

The original mail files are not in this repository and no downloadable mail
file is offered anywhere on the site. The public `.md` URL for this record
serves the redacted transcription only.
