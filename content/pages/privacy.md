---
metadata:
  title: Privacy notice
  description: How Nozzlegate handles website requests, contact messages and submitted evidence.
hero:
  eyebrow: Privacy notice
  title: Privacy without surveillance.
  intro: Nozzlegate does not use client-side analytics, advertising trackers or an on-site contact form. A visit still reaches the hosting service, and messages sent through email, Discord or GitHub contain personal data.
  updated: 29 July 2026
facts:
  - label: Cookies
    value: No first-party tracking
    text: No analytics scripts, advertising pixels or browser storage are implemented by this project.
  - label: Contact
    value: You choose the channel
    text: Email, Discord and GitHub are external services. Nothing is submitted through this website.
  - label: Hosting
    value: Cloudflare Worker
    text: Standard request metadata is processed to deliver, secure and troubleshoot the site.
sections:
  - id: controller
    number: "01"
    title: Who is responsible
    paragraphs:
      - The person operating the independent Nozzlegate project decides why and how the personal data described here is used and is therefore the controller. Privacy questions and requests can be sent to contact.nozzlegate@f22.no.
  - id: website-data
    number: "02"
    title: What a visit processes
    paragraphs:
      - The website source does not set first-party cookies, use client-side analytics, show advertising, load tracking pixels, or write to local or session storage.
      - The website is deployed directly as a Cloudflare Worker. Standard request and response metadata can include an IP address, requested URL, method, timestamp, user agent, response status, traffic-routing information, error details and security signals. The project does not add custom request logging or export visitor profiles.
      - Cloudflare Workers Logs and traces are disabled in the deployment configuration. Cloudflare still processes network, security and operational data needed to deliver and protect the Worker under its own privacy policy.
      - Cloudflare may use strictly necessary security technology if a visitor is presented with an abuse-prevention or security challenge. It is not used by this project for advertising or behavioural analytics.
    links:
      - label: Cloudflare privacy policy
        href: https://www.cloudflare.com/policies/privacy/
      - label: Cloudflare Workers Logs
        href: https://developers.cloudflare.com/workers/observability/logs/workers-logs/
      - label: Cloudflare cookie documentation
        href: https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/
  - id: contact-data
    number: "03"
    title: What contact channels process
    paragraphs:
      - If you contact the project, we receive the identifiers and material you choose to send. This can include your email address or service username, message text, attachments, timestamps and other evidence metadata.
      - Discord, the email service and GitHub process information under their own terms when you choose those channels. GitHub issues, pull requests and comments are normally public. Discord server messages are visible according to the server and channel permissions.
      - Do not send passwords, authentication tokens, full payment-card or bank details, home addresses, unredacted identity documents, or unrelated personal information. Redact public evidence before sending it.
    links:
      - label: Discord privacy policy
        href: https://discord.com/privacy
      - label: GitHub privacy statement
        href: https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement
  - id: purposes
    number: "04"
    title: Why we process it
    paragraphs:
      - Request metadata is processed to deliver and secure the website and to diagnose faults. Contact data is processed to reply, assess evidence, verify sources, handle corrections and protect the integrity of the public record.
      - The usual legal basis is the project's legitimate interest under Article 6(1)(f) GDPR in operating a secure website and maintaining an accurate, source-based consumer record. Data may also be processed when necessary to comply with a legal obligation or establish, exercise or defend legal claims.
      - No automated decision-making or profiling is used by this project.
  - id: recipients
    number: "05"
    title: Providers and transfers
    paragraphs:
      - Cloudflare provides the Worker hosting and processes request, log and site data on behalf of the project under its Data Processing Addendum. Cloudflare also processes certain network and security data under its own privacy policy. Its addendum describes safeguards for international transfers, including applicable adequacy decisions and Standard Contractual Clauses.
      - Contact data is also handled by the service you choose, such as the email provider, Discord or GitHub. Evidence is not shared beyond project maintainers unless you make it public, ask us to publish it, or disclosure is necessary to comply with law, protect legal rights or provide it to a competent authority.
    links:
      - label: Cloudflare Data Processing Addendum
        href: https://www.cloudflare.com/cloudflare-customer-dpa/
      - label: Cloudflare privacy policy
        href: https://www.cloudflare.com/policies/privacy/
  - id: retention
    number: "06"
    title: How long data is kept
    paragraphs:
      - The project does not retain Cloudflare Workers invocation logs or traces because both are disabled in the deployment configuration. Cloudflare may still retain separate operational, aggregate and security data according to its own policies.
      - Contact messages that do not become part of a published issue record are deleted when the conversation and evidence review are finished and they are no longer needed. Unredacted attachments that are not needed are deleted after review.
      - Evidence needed to support or correct a published claim may be retained while the related record remains published or while a legal issue requires it. Public copies are redacted where personal details are not necessary.
    links:
      - label: Cloudflare Workers metrics
        href: https://developers.cloudflare.com/workers/observability/metrics-and-analytics/
  - id: rights
    number: "07"
    title: Your rights
    paragraphs:
      - Depending on the circumstances, you may ask for access, correction, deletion or restriction of your personal data, or object to processing based on legitimate interests. Contact contact.nozzlegate@f22.no and describe the channel you used so the relevant material can be located.
      - You may complain to the data-protection authority where you live, work or believe an infringement happened. The Swedish authority is Integritetsskyddsmyndigheten (IMY), and the Norwegian authority is Datatilsynet. These rights can be limited where data must be retained for legal obligations, freedom of expression, or the establishment, exercise or defence of legal claims.
    links:
      - label: Contact IMY
        href: https://www.imy.se/en/individuals/forms-and-e-services/file-a-gdpr-complaint/
      - label: Contact Datatilsynet
        href: https://www.datatilsynet.no/en/about-us/contact-us/how-to-complain-to-the-norwegian-dpa/
  - id: changes
    number: "08"
    title: Changes to this notice
    paragraphs:
      - This notice will be updated before adding analytics, an on-site submission form, non-essential cookies or any materially different use of personal data. The current revision date appears at the top of the page.
---

<!-- Privacy-notice source of truth. Update this file when providers or processing change. -->
