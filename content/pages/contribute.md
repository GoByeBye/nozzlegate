---
metadata:
  title: Contribute evidence
  description: How to contribute evidence, corrections and case updates to the open-source Nozzlegate record.
hero:
  eyebrow: Open-source record
  title: Add evidence or fix a mistake.
  intro: Link the original source, explain what it proves and say what it does not prove. That is enough.
  action: See what to include
  githubAction: Open the GitHub project
  githubHref: https://github.com/GoByeBye/nozzlegate
notice:
  title: Protect people
  text: Never publish full card numbers, addresses, phone numbers, signatures, passwords, support tokens, unrelated order data or unnecessary community usernames.
evidenceSection:
  eyebrow: Source quality
  title: Some evidence is stronger than others.
  intro: A cropped screenshot can be useful, but it should not be treated like an invoice or company statement.
evidenceLevels:
  - level: A
    title: Primary record
    examples: Company statement, law, invoice, email you received, original photo.
  - level: B
    title: Preserved record
    examples: Internet Archive capture, dated PDF, full-page screenshot with URL.
  - level: C
    title: Corroborated report
    examples: Independent accounts that agree on material facts.
  - level: D
    title: Lead only
    examples: Anonymous claim, cropped screenshot, paraphrase without a source.
guide:
  eyebrow: Before a pull request
  title: Keep the change easy to verify
  steps:
    - number: "01"
      title: State one change
      text: Name the case file and the exact sentence, date, source or status that should change.
    - number: "02"
      title: Attach provenance
      text: Provide the original URL, capture date, author or sender, and explain how the document came into your possession.
    - number: "03"
      title: Redact a copy, preserve the original
      text: Submit a carefully redacted public copy. Keep the untouched original available for a regulator or maintainer to verify privately.
    - number: "04"
      title: Separate fact from conclusion
      text: “The invoice contains this line” is a fact. “This proves a crime” is a legal conclusion and needs an authoritative decision.
    - number: "05"
      title: Update the source of truth
      textBefore: Case content lives in
      code: content/cases/*.md
      textAfter: ". Update the relevant source entry, cited paragraph and checked date together."
    - number: "06"
      title: Run the checks
      textBefore: Run
      code: npm test
      textAfter: " before opening a pull request. Explain any source that cannot be independently opened."
contact:
  eyebrow: Contact
  title: Send it directly.
  intro: If the evidence should not go straight into a public pull request, reach out privately instead.
  note: This website itself does not submit or store messages. Email and Discord hand you off to those services, which process anything you send.
  privacyAction: Read the privacy notice
  privacyHref: /privacy
  methods:
    - label: Discord
      value: Join the Nozzlegate Discord
      text: Join the project community to share a lead or ask how to contribute.
      action: Join the server
      href: https://discord.gg/7Aqk5x8kFc
      external: true
    - label: Email
      value: contact.nozzlegate@f22.no
      text: Send links or attach a carefully redacted copy of the evidence.
      action: Write an email
      href: mailto:contact.nozzlegate@f22.no
      external: false
correction:
  eyebrow: Correction policy
  title: Corrections belong in the record.
  paragraphs:
    - Corrections are evaluated on evidence, not affiliation. A correction should identify the contested passage, provide a checkable source and propose precise replacement text. Material corrections should retain a dated note so readers can see what changed.
    - Right of reply matters. A sourced company response is added to the relevant record even when it does not resolve the underlying dispute.
license:
  eyebrow: Transparency and licensing
  title: Humans make the call.
  aiDisclosure: AI tools have helped with parts of the code, design, research organization, tests and first drafts. They do not decide what counts as evidence. A human maintainer checks published claims against the cited record, decides what goes live and remains responsible for it. AI output is never treated as a source or independent verification.
  text: The site code is MIT licensed. Original editorial content is available under CC BY 4.0. Third-party evidence remains subject to its original rights and is not relicensed by this project.
---

<!-- Contribution-guide content. Detailed repository instructions live in CONTRIBUTING.md. -->
