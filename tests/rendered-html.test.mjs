import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${path.replaceAll("/", "-")}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function htmlFor(path) {
  const response = await render(path);
  assert.equal(response.status, 200, `${path} should render`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("server-renders the source-first home page", async () => {
  const html = await htmlFor("/");

  assert.match(
    html,
    /<title>Nozzlegate — the open consumer record \| Nozzlegate<\/title>/i,
  );
  assert.match(
    html,
    /href="(?:https:\/\/nozzlegate\.com)?\/icon\.svg/i,
  );
  assert.match(
    html,
    /href="(?:https:\/\/nozzlegate\.com)?\/favicon\.ico/i,
  );
  assert.match(
    html,
    /href="(?:https:\/\/nozzlegate\.com)?\/apple-icon\.png/i,
  );
  assert.match(html, /<h1>Start with the facts\.<\/h1>/i);
  assert.match(html, /href="\/cases\/nozzlegate"/i);
  assert.match(html, /href="\/cases\/payment-surcharges"/i);
  assert.match(html, /href="\/cases\/warranty-terms"/i);
  assert.doesNotMatch(html, /#nozzlegate|#cardfees|#warrantyterms/i);
  assert.doesNotMatch(html, />CASE 0[1-3]</i);
  assert.doesNotMatch(
    html,
    /Product representation|Pricing and checkout|Terms and consumer rights/i,
  );
  assert.match(html, /Company confirmed/i);
  assert.match(html, /Privately confirmed/i);
  assert.match(html, /Terms under review/i);
  assert.match(html, /2–3% card fee/i);
  assert.match(html, /Bondtech added a 2–3% card fee\./i);
  assert.match(
    html,
    /Bondtech’s warranty says 90 days\. Consumer rights can be a lot longer\./i,
  );
  assert.match(html, /Open the reporting guide/i);
  assert.match(html, /Contribute evidence/i);
  assert.match(html, /Details &amp; evidence/i);
  assert.match(html, />Issues<\/a>/i);
  assert.doesNotMatch(
    html,
    /The units shipped with the INDX are not truly hardened|Every claim should be verifiable|Read the contribution guide|This is a living record/i,
  );
  assert.match(
    html,
    /made with a little spite by[\s\S]*href="https:\/\/daddie\.dev"/i,
  );
  assert.doesNotMatch(
    html,
    /Independent record · Bondtech INDX|Bondtech, documented|Current dossier status|codex-preview|Your site is taking shape|react-loading-skeleton/i,
  );
});

test("ships favicon and Discord icon assets", async () => {
  const svg = await readFile(
    new URL("../app/icon.svg", import.meta.url),
    "utf8",
  );
  assert.match(svg, /viewBox="0 0 512 512"/i);
  assert.match(svg, /#0b0b0d/i);
  assert.match(svg, /#f7f7f8/i);
  assert.match(svg, /#a79fff/i);

  const favicon = await readFile(
    new URL("../app/favicon.ico", import.meta.url),
  );
  assert.equal(favicon.readUInt16LE(0), 0, "ICO reserved field");
  assert.equal(favicon.readUInt16LE(2), 1, "ICO image type");
  assert.equal(favicon.readUInt16LE(4), 3, "ICO image count");

  const discordIcon = await readFile(
    new URL("../public/brand/discord-server-icon.png", import.meta.url),
  );
  assert.equal(
    discordIcon.subarray(1, 4).toString("ascii"),
    "PNG",
    "Discord icon should be a PNG",
  );
  assert.equal(discordIcon.readUInt32BE(16), 512);
  assert.equal(discordIcon.readUInt32BE(20), 512);

  const appleIcon = await readFile(
    new URL("../app/apple-icon.png", import.meta.url),
  );
  assert.equal(appleIcon.readUInt32BE(16), 180);
  assert.equal(appleIcon.readUInt32BE(20), 180);

  const builtDiscordIcon = await readFile(
    new URL(
      "../dist/client/brand/discord-server-icon.png",
      import.meta.url,
    ),
  );
  assert.deepEqual(builtDiscordIcon, discordIcon);
});

test("server-renders a cited case file", async () => {
  const html = await htmlFor("/cases/nozzlegate");

  assert.match(html, /Nozzlegate issue \| Nozzlegate/i);
  assert.match(html, /30–32 HRC/i);
  assert.match(html, /<h1>What happened<\/h1>/i);
  assert.doesNotMatch(html, /class="article-hero"/i);
  assert.doesNotMatch(html, /aria-label="Case snapshot"/i);
  assert.match(html, /Documents and statements/i);
  assert.match(html, /<details class="case-disclosure"/i);
  assert.doesNotMatch(html, /<details class="case-disclosure"[^>]* open/i);
  assert.match(html, /INDX – Hardened Nozzles Update/i);
  assert.match(html, /17 July position/i);
  assert.match(html, /proper hardened nozzles will be available/i);
  assert.match(
    html,
    /href="\/evidence\/bondtech-discord-hardness-exchange-2026-07-17"/i,
  );
  assert.match(
    html,
    /href="\/evidence\/bondtech-discord-hardened-statement-2026-07-23"/i,
  );
  assert.match(
    html,
    /href="\/evidence\/bondtech-support-email-thread-2026-07-17"/i,
  );
  assert.match(html, /aria-label="Rendered evidence records"/i);
  assert.match(html, /class="case-record-strip case-record-strip--stacked"/i);
  assert.match(html, /17 July — hardness exchange/i);
  assert.match(html, /23 July — company statement/i);
  assert.match(html, /17 July — support email thread/i);
  assert.doesNotMatch(html, />Record 0[1-9]</i);
  assert.doesNotMatch(html, /rendered transcript|rendered record/i);
  // Two strip cards plus two evidence-row links for the Discord records; one
  // strip card plus two evidence-row links for the email thread.
  assert.equal((html.match(/>Discord transcript</gi) ?? []).length, 4);
  assert.equal((html.match(/>Email thread</gi) ?? []).length, 3);
  assert.match(
    html,
    /The same explanation was given privately, twelve days before the public update/i,
  );
  assert.match(
    html,
    /A buyer asked Bondtech to tell its customers and records no reply/i,
  );
  assert.match(html, /We cannot verify a negative/i);
  assert.match(
    html,
    /A community member says criticism was followed by a Discord ban/i,
  );
  assert.match(html, /reported moderation action/i);
  assert.match(html, /not proof of a policy to suppress criticism/i);
  assert.match(html, /any messages were deleted/i);
  assert.match(
    html,
    /href="https:\/\/xcancel\.com\/ChazMakes\/status\/2082458067426242868"/i,
  );
  assert.doesNotMatch(
    html,
    /href="\/evidence\/bondtech-discord-[^"]+\.md"/i,
  );
  assert.match(html, /Legal context/i);
  assert.match(html, /id="remedy"/i);
  assert.match(
    html,
    /class="case-remedy__routes case-remedy__routes--two-column"/i,
  );
  assert.match(html, /Refund paths/i);
  assert.match(html, /2 paths/i);
  assert.match(html, /Ask the seller to complete the return and refund/i);
  assert.match(html, /Identify the seller responsible for your order/i);
  assert.match(html, /Two physical return paths/i);
  assert.match(html, /Product not assembled or installed/i);
  assert.match(html, /Product already assembled or installed/i);
  assert.match(html, /PATH(?:\s|<!-- -->)*1/i);
  assert.match(html, /PATH(?:\s|<!-- -->)*2/i);
  assert.match(html, /prepaid tracked return or collection method/i);
  assert.match(
    html,
    /A seller-paid return after termination does not automatically guarantee payment for your time/i,
  );
  assert.match(
    html,
    /cannot reasonably be expected to keep the rest of the purchase/i,
  );
  assert.match(html, /notice within two months after you noticed it is always timely/i);
  assert.match(
    html,
    /Neither provision automatically requires seller-performed removal or payment for my time/i,
  );
  assert.match(
    html,
    /consumer returns the goods “at the seller(?:'|&#x27;)s expense”/i,
  );
  assert.match(html, /ska det ske på näringsidkarens bekostnad/i);
  assert.match(
    html,
    /Swedish damages rules can cover actual expenses, income loss and other loss caused by the defect/i,
  );
  assert.match(html, /class="case-remedy__assist"/i);
  assert.match(html, /Stuck on the wording\? Ask me in the Discord\./i);
  assert.match(
    html,
    /I run this site, and I will help you get your refund for free, to the best of my ability/i,
  );
  assert.match(
    html,
    /I am another consumer helping out, not a lawyer. This is not legal advice or legal representation/i,
  );
  assert.match(html, /href="https:\/\/discord\.gg\/d4QBX7z4zp"/i);
  assert.match(html, /Join the Nozzlegate Discord/i);
  assert.match(html, /Option 1: Boxed return/i);
  assert.match(html, /Option 2: Installed return/i);
  assert.match(html, /Option 3: Replacement or price reduction/i);
  assert.match(html, /EMAIL DRAFT(?:\s|<!-- -->)*1/i);
  assert.match(html, /EMAIL DRAFT(?:\s|<!-- -->)*2/i);
  assert.match(html, /EMAIL DRAFT(?:\s|<!-- -->)*3/i);
  assert.match(html, /The INDX has not been assembled or installed/i);
  assert.match(html, /A shipping label is not a disassembly service/i);
  assert.match(html, /I do not want to dismantle it myself because the reversal is cumbersome and carries risk/i);
  assert.match(html, /Get complete terms before accepting a return arrangement/i);
  assert.match(html, /For a voluntary return, do not dispatch until you accept suitable written terms/i);
  assert.match(html, /For a voluntary return, do not dismantle until you accept a safe, suitable written plan/i);
  assert.match(html, /Before I confirm any arrangement or dispatch the product/i);
  assert.match(html, /I do not accept a return arrangement or authorize dismantling/i);
  assert.match(html, /I will state in writing whether I accept it/i);
  assert.match(html, /An alternative is not agreed unless I accept its full terms in writing/i);
  assert.doesNotMatch(html, /I accept your offer to return the complete INDX/i);
  assert.match(html, /Keeping the kit: request replacement or a price reduction/i);
  assert.match(html, /This request does not accept a different or incomplete proposal and does not waive other rights or remedies/i);
  assert.match(html, /I do not accept a different or incomplete proposal unless I confirm its full terms in writing/i);
  assert.match(html, /A buyer outside the EU may still use Swedish remedies if Swedish law governs the purchase/i);
  assert.match(html, /Citizenship alone does not determine whether Swedish law applies/i);
  assert.match(html, /If I selected a price reduction, I rely on/i);
  assert.match(html, /ARN only handles claims subject to Swedish legislation/i);
  assert.match(html, /Bondtech AB is a Swedish company registered in Värnamo/i);
  assert.match(html, /Bought directly from Bondtech AB\? Apply to ARN after a refusal or no answer/i);
  assert.match(html, /Bondtech’s Swedish location does not by itself put a foreign reseller purchase under Swedish law or ARN/i);
  assert.match(html, /U\.S\. cardholders: request a partial card dispute for the unresolved amount/i);
  assert.match(html, /ask to dispute only \$\[AMOUNT\], not the full transaction/i);
  assert.match(html, /Do not describe the purchase as unauthorized/i);
  assert.match(html, /some network rules require a return or attempted return/i);
  assert.match(html, /ask \[PAYMENT PROVIDER\] to open a partial dispute or chargeback for only/i);
  assert.match(html, /I will not dispute the full transaction while keeping the product/i);
  assert.equal((html.match(/Copy template/gi) ?? []).length, 3);
  assert.match(html, /U\.S\. buyers can keep the factual refund-offer/i);
  assert.match(html, /verify the rules where you live before sending/i);
  assert.match(
    html,
    /https:\/\/eur-lex\.europa\.eu\/eli\/dir\/2019\/771\/oj\/eng/i,
  );
  assert.match(html, /https:\/\/www\.usa\.gov\/online-purchase-complaints/i);
  assert.match(html, /https:\/\/www\.bondtech\.se\/shop\/imprint\//i);
  assert.match(html, /https:\/\/www\.consumerfinance\.gov\/ask-cfpb\/how-can-i-get-a-refund-on-a-product-or-service-i-purchased-with-my-credit-card-en-1969\//i);
  assert.match(html, /https:\/\/www\.visa\.com\/en-us\/support\/business\/dispute-resolution/i);
  assert.match(html, /https:\/\/www\.mastercard\.us\/content\/dam\/public\/mastercardcom\/na\/global-site\/documents\/chargeback-guide\.pdf/i);
  assert.match(html, /https:\/\/www\.konsumentverket\.se\/ekonomi\/kortreklamation\//i);
  assert.match(html, /https:\/\/www\.konsumentverket\.se\/ekonomi\/invandningsratt\//i);
  assert.match(html, /https:\/\/www\.arn\.se\/om-arn\/Languages\/english-what-is-arn\//i);
  assert.match(html, /\[ORDER NUMBER\]/i);
  assert.match(html, /\[YOUR NAME\]/i);
  assert.match(
    html,
    /Ask for a refund or report the issue to Konsumentverket\./i,
  );
  assert.match(
    html,
    /The refund steps pursue your personal claim with the seller\./i,
  );
});

test("keeps long-form case pages readable in dark mode", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(css, /--accent:\s*#a79fff/i);
  assert.match(css, /--gold:\s*var\(--accent\)/i);
  assert.match(css, /--red-text:\s*#ff6b66/i);
  assert.match(
    css,
    /:root\s*{[^}]*--background:\s*#0b0b0d[^}]*--foreground:\s*#f7f7f8/is,
  );
  assert.doesNotMatch(css, /\.article-layout\s*{[^}]*--background:/is);
  assert.doesNotMatch(css, /--background:\s*#f6f5fa/i);
  assert.match(css, /:root\s*{[^}]*--copy-measure:\s*68ch/is);
  assert.match(
    css,
    /\.prose p\s*{[^}]*max-width:\s*var\(--copy-measure\)/is,
  );
  assert.match(
    css,
    /\.case-summary\s*{[^}]*max-width:\s*none[^}]*margin:\s*0 0 68px/is,
  );
  assert.match(css, /\.case-grid\s*{[^}]*align-items:\s*stretch/is);
  assert.match(css, /\.case-card\s*{[^}]*height:\s*100%/is);
  assert.match(css, /\.case-card__link\s*{[^}]*height:\s*100%/is);
  assert.match(css, /\.case-card__deck\s*{[^}]*margin:\s*14px 0 16px/is);
  assert.match(
    css,
    /\.case-card__link\s*{[^}]*min-height:\s*0[^}]*padding:\s*20px/is,
  );
  assert.match(
    css,
    /\.status--neutral\s*{[^}]*color:\s*var\(--foreground-soft\)/is,
  );
  assert.doesNotMatch(css, /#ffd700|rgb\(255 215 0/i);
  assert.doesNotMatch(
    css,
    /@media \(max-width: 980px\)[\s\S]{0,400}\.site-nav\s*{\s*display:\s*none/is,
  );
});

test("keeps active component styles canonical", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  const firstMediaQuery = css.indexOf("@media");
  const baseCss =
    firstMediaQuery === -1 ? css : css.slice(0, firstMediaQuery);

  for (const selector of [
    "\\.page-hero",
    "\\.case-card__footer",
    "\\.evidence-levels article",
  ]) {
    assert.equal(
      (baseCss.match(new RegExp(`^${selector}\\s*\\{`, "gm")) ?? []).length,
      1,
      `${selector} should have one canonical base rule`,
    );
  }

  assert.doesNotMatch(css, /Less noise, more hierarchy/i);
  assert.doesNotMatch(
    baseCss,
    /\.evidence-levels article\s*{[^}]*min-height/is,
  );
  assert.doesNotMatch(
    baseCss,
    /\.wordmark > \.wordmark__slash\s*{[^}]*!important/is,
  );
  assert.doesNotMatch(
    baseCss,
    /\.issue-guide__steps \.issue-guide__answer\s*{[^}]*!important/is,
  );
});

test("renders Discord Markdown as readable evidence records", async () => {
  const exchange = await htmlFor(
    "/evidence/bondtech-discord-hardness-exchange-2026-07-17",
  );

  assert.match(exchange, /17 July Discord record \| Nozzlegate/i);
  assert.match(exchange, /The “hardened” nozzle exchange/i);
  assert.match(exchange, /Maintainer-verified transcript/i);
  assert.match(
    exchange,
    /class="transcript-status transcript-status--verified"/i,
  );
  assert.match(exchange, /Verified transcript/i);
  assert.match(exchange, /Verified by the site operator/i);
  assert.match(exchange, /submitted by a trusted contributor/i);
  assert.match(exchange, /20(?:<!-- -->)? recorded messages/i);
  assert.match(exchange, /Community member 1/i);
  assert.match(exchange, /Attributed company response/i);
  assert.match(
    exchange,
    /class="transcript-message transcript-message--company"/i,
  );
  assert.match(exchange, /View raw source \(\.md\)/i);
  assert.match(
    exchange,
    /href="\/evidence\/bondtech-discord-hardness-exchange-2026-07-17\.md"/i,
  );

  const statement = await htmlFor(
    "/evidence/bondtech-discord-hardened-statement-2026-07-23",
  );

  assert.match(statement, /23 July Discord record \| Nozzlegate/i);
  assert.match(statement, /not what we promised/i);
  assert.match(statement, /Maintainer-verified transcript/i);
  assert.match(
    statement,
    /class="transcript-status transcript-status--verified"/i,
  );
  assert.match(statement, /Verified transcript/i);
  assert.match(statement, /Verified by the site operator/i);
  assert.match(statement, /submitted by a trusted contributor/i);
  assert.match(statement, /2(?:<!-- -->)? recorded messages/i);
  assert.match(statement, /Follow-up included in the submitted transcript/i);
});

test("renders the support email thread as a redacted mail record", async () => {
  const html = await htmlFor(
    "/evidence/bondtech-support-email-thread-2026-07-17",
  );

  assert.match(html, /17 July support email record \| Nozzlegate/i);
  assert.match(html, /The support ticket behind the screenshot/i);
  assert.match(html, /Maintainer-verified transcript/i);
  assert.match(html, /Email record/i);
  assert.doesNotMatch(html, /not a native Discord export/i);
  assert.match(html, /It is not a downloadable mail file/i);
  assert.match(html, /<dt>Helpdesk thread<\/dt>/i);
  assert.match(html, /7(?:<!-- -->)? messages in the thread/i);

  assert.match(html, /aria-label="Mail envelope"/i);
  assert.match(html, /<dt>Subject<\/dt>/i);
  assert.match(html, /<dt>Buyer address<\/dt>/i);
  assert.match(html, /Name and email address redacted/i);
  assert.match(html, /Zendesk helpdesk ticket, number redacted/i);

  assert.match(html, /Hi \[redacted\],/i);
  assert.match(html, /Ticket opener, redacted at their request/i);
  assert.match(html, /Signed “Founder, Bondtech AB”/i);
  assert.doesNotMatch(html, /Unattributed record note/i);

  assert.match(html, /fully hardened\s*\(~60 HRC\) steel version/i);
  assert.match(
    html,
    /removed the &quot;hardened&quot; wording from the product page/i,
  );
  assert.match(html, /The reply that the sender records as unanswered/i);
  assert.match(html, /Please communicate this with your customers/i);
  assert.match(
    html,
    /href="\/evidence\/bondtech-support-email-thread-2026-07-17\.md"/i,
  );
});

test("keeps the support email record free of sender identifiers", async () => {
  const record = await readFile(
    new URL(
      "../content/transcripts/bondtech-support-email-thread-2026-07-17.md",
      import.meta.url,
    ),
    "utf8",
  );

  // Assert on shape, never on the redacted values: this test file is public.
  const addresses = new Set(
    [
      ...record.matchAll(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi),
    ].map((match) => match[0].toLowerCase()),
  );
  assert.deepEqual(
    [...addresses],
    ["support@bondtech.se"],
    "only the published company support address may appear",
  );

  // Helpdesk ticket numbers and encoded ticket codes are support tokens. The
  // helpdesk writes them as "Your request (NNNNN)" in the body and as a
  // bracketed code in the footer, so assert on those shapes rather than on
  // digits, which a product URL or a price would trip for the wrong reason.
  assert.doesNotMatch(record, /request\s*\(\s*\d+\s*\)/i);
  assert.doesNotMatch(record, /ticket\s*#?\s*\d{4,}/i);
  assert.doesNotMatch(record, /\[[A-Z0-9]{4,}-[A-Z0-9]{4,}\]/);

  // A pasted MIME part would arrive as a long base64 run.
  assert.doesNotMatch(record, /[A-Za-z0-9+/]{60,}={0,2}/);

  // Safe Links wrappers embed mailbox and tenant identifiers.
  assert.doesNotMatch(record, /safelinks\.protection\.outlook\.com/i);

  assert.equal((record.match(/Hi \[redacted\],/g) ?? []).length, 2);

  for (const directory of ["app", "content", "evidence", "public"]) {
    const entries = await readdir(new URL(`../${directory}`, import.meta.url), {
      recursive: true,
    });
    assert.ok(
      !entries.some((entry) => entry.toLowerCase().endsWith(".eml")),
      `${directory} must not contain a raw mail file`,
    );
  }
});

test("keeps the raw support email Markdown URL available", async () => {
  const response = await render(
    "/evidence/bondtech-support-email-thread-2026-07-17.md",
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/markdown\b/i,
  );
  const markdown = await response.text();
  assert.match(markdown, /^---\r?\ntitle: Bondtech support email thread/);
  assert.match(markdown, /recordKind: email/);
  assert.match(markdown, /redacted at the sender’s request/i);
});

test("keeps raw Markdown transcript URLs available", async () => {
  const response = await render(
    "/evidence/bondtech-discord-hardness-exchange-2026-07-17.md",
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/markdown\b/i,
  );
  const markdown = await response.text();
  assert.match(markdown, /^---\r?\ntitle: Bondtech Discord hardness exchange/);
  assert.match(markdown, /Community usernames are redacted/i);
  assert.match(markdown, /verified by the site operator/i);
});

test("links contributors to the GitHub project", async () => {
  const html = await htmlFor("/contribute");

  assert.match(html, /Open the GitHub project/i);
  assert.match(
    html,
    /href="https:\/\/github\.com\/GoByeBye\/nozzlegate"/i,
  );
  assert.match(html, /Join the Nozzlegate Discord/i);
  assert.match(html, /https:\/\/discord\.gg\/d4QBX7z4zp/i);
  assert.doesNotMatch(html, /discord(?:app)?\.com\/users\//i);
  assert.match(html, /mailto:contact\.nozzlegate@f22\.no/i);
  assert.match(html, /website itself does not submit or store messages/i);
  assert.match(html, /href="\/privacy"/i);
  assert.match(html, /Corrections are welcome\./i);
  assert.match(html, /id="ai-disclosure"/i);
  assert.match(html, /AI disclosure\./i);
  assert.match(
    html,
    /AI output is never treated as a source or independent verification/i,
  );
  assert.match(html, /href="\/contribute#ai-disclosure"/i);
});

test("server-renders the privacy notice", async () => {
  const html = await htmlFor("/privacy");

  assert.match(html, /<title>Privacy notice \| Nozzlegate<\/title>/i);
  assert.match(html, /Privacy without surveillance/i);
  assert.match(html, /Cloudflare Worker/i);
  assert.match(html, /deployed directly as a Cloudflare Worker/i);
  assert.match(html, /Workers Logs and traces are disabled/i);
  assert.match(html, /does not retain Cloudflare Workers invocation logs/i);
  assert.match(html, /No automated decision-making or profiling/i);
  assert.match(html, /mailto:contact\.nozzlegate@f22\.no/i);
  assert.match(
    html,
    /https:\/\/www\.cloudflare\.com\/cloudflare-customer-dpa\//i,
  );
  assert.match(
    html,
    /https:\/\/developers\.cloudflare\.com\/fundamentals\/reference\/policies-compliances\/cloudflare-cookies\//i,
  );
  assert.doesNotMatch(html, /discord(?:app)?\.com\/users\//i);
  assert.doesNotMatch(html, /OpenAI|ChatGPT Sites/i);
});

test("pins Cloudflare runtime behavior and disables persisted logs and traces", async () => {
  const config = JSON.parse(
    await readFile(
      new URL("../dist/server/wrangler.json", import.meta.url),
      "utf8",
    ),
  );

  assert.equal(config.compatibility_date, "2026-05-15");
  assert.equal(config.observability?.enabled, false);
  assert.equal(config.observability?.logs?.enabled, false);
  assert.equal(config.observability?.logs?.invocation_logs, false);
  assert.equal(config.observability?.logs?.persist, false);
  assert.equal(config.observability?.traces?.enabled, false);
  assert.equal(config.observability?.traces?.persist, false);
  assert.equal(config.workers_dev, false);
  assert.equal(config.preview_urls, false);
  assert.equal(config.images, undefined);
});

test("keeps editorial case records in Markdown", async () => {
  for (const slug of [
    "nozzlegate",
    "payment-surcharges",
    "warranty-terms",
  ]) {
    const markdown = await readFile(
      new URL(`../content/cases/${slug}.md`, import.meta.url),
      "utf8",
    );

    assert.match(markdown, /^---\r?\nslug:/);
    assert.match(markdown, /\nsources:\r?\n/);
    assert.match(markdown, /\nreportTemplate:/);
    if (slug === "payment-surcharges" || slug === "nozzlegate") {
      assert.match(markdown, /\nremedy:\r?\n/);
      const remedyBlock = markdown.match(
        /\nremedy:\r?\n[\s\S]*?(?=\nopenQuestions:)/,
      )?.[0];
      assert.ok(remedyBlock, `${slug} remedy block should be present`);
      if (slug === "payment-surcharges") {
        assert.match(remedyBlock, /\n  emailTemplate: \|-/);
        assert.doesNotMatch(
          remedyBlock,
          /Forbruker|\bamounts?\b|\[FEE AMOUNT\]|\[TOTAL CHARGED\]|\$|€|\b(?:USD|EUR|SEK|NOK)\b/i,
        );
      } else {
        assert.doesNotMatch(remedyBlock, /\u2014/);
        assert.match(remedyBlock, /\n  paths:\r?\n/);
        assert.match(remedyBlock, /\n  assist:\r?\n/);
        assert.match(remedyBlock, /https:\/\/discord\.gg\/d4QBX7z4zp/);
        assert.match(remedyBlock, /\n  templates:\r?\n/);
        assert.equal(
          (remedyBlock.match(/\n      emailTemplate: \|-/g) ?? []).length,
          3,
        );
        assert.equal(
          (remedyBlock.match(/title: Product (?:not|already)/g) ?? []).length,
          2,
        );
        assert.match(remedyBlock, /\[ORDER NUMBER\]/i);
        assert.match(remedyBlock, /\[YOUR NAME\]/i);
        assert.doesNotMatch(
          remedyBlock,
          /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
        );
      }
    }
  }

  for (const page of ["home", "report", "contribute", "privacy"]) {
    const markdown = await readFile(
      new URL(`../content/pages/${page}.md`, import.meta.url),
      "utf8",
    );

    assert.match(markdown, /^---\r?\nmetadata:/);
  }
});

test("redacts community usernames from the public Discord transcript", async () => {
  const transcript = await readFile(
    new URL(
      "../content/transcripts/bondtech-discord-hardness-exchange-2026-07-17.md",
      import.meta.url,
    ),
    "utf8",
  );

  assert.match(transcript, /Community member 1/i);
  assert.match(transcript, /\*\*Gustav — 17 July 2026/i);
  const attributedSpeakers = [
    ...transcript.matchAll(
      /^\*\*(.+?) — 17 July 2026, \d{2}:\d{2}\*\*$/gm,
    ),
  ].map((match) => match[1]);

  assert.ok(attributedSpeakers.length > 0);
  assert.ok(
    attributedSpeakers.every(
      (speaker) =>
        speaker === "Gustav" || /^Community member \d+$/.test(speaker),
    ),
    "every dated speaker must be the company respondent or a neutral label",
  );
});

test("server-renders the submitted Sweden payment-fee comparison", async () => {
  const html = await htmlFor("/cases/payment-surcharges");

  assert.match(html, /Buyers privately confirmed/i);
  assert.doesNotMatch(html, /case-remedy__routes--two-column/i);
  assert.doesNotMatch(html, /class="case-remedy__assist"/i);
  assert.doesNotMatch(html, /class="article-hero"/i);
  assert.doesNotMatch(html, /aria-label="Case snapshot"/i);
  assert.match(html, /Sweden selected/i);
  assert.match(html, /28\.01 kr/i);
  assert.match(html, /Fee for PayPal/i);
  assert.match(html, /€4\.45/i);
  assert.match(html, /\$15\.02/i);
  assert.match(html, /Fee for Credit Card \(Stripe\)/i);
  assert.match(html, /bondtech-sweden-checkout-card-selected\.png/i);
  assert.match(html, /bondtech-sweden-checkout-paypal-selected\.png/i);
  assert.match(html, /bondtech-eu-card-fee-checkout\.png/i);
  assert.match(html, /bondtech-usd-card-fee-order-summary\.png/i);
  assert.match(html, /authorized, redacted copy showing the date and card scheme can be provided/i);
  assert.match(
    html,
    /completed US-dollar card receipt also retained its displayed fee/i,
  );
  assert.doesNotMatch(
    html,
    /Does a completed card order retain the 28\.01 kr fee/i,
  );
  assert.match(
    html,
    /completed card orders retained the fee across Visa, Mastercard and American Express/i,
  );
  assert.doesNotMatch(
    html,
    /Was the selected card a covered Visa or Mastercard consumer card/i,
  );
  assert.doesNotMatch(
    html,
    /Can a buyer authorize a redacted receipt showing the date and card scheme/i,
  );
  assert.doesNotMatch(
    html,
    /Norway buyer|Norwegian buyer|Bondtech Norway order/i,
  );
  assert.match(html, /2 questions/i);
  assert.match(
    html,
    /src="\/evidence\/bondtech-sweden-checkout-card-selected\.png"/i,
  );
  assert.doesNotMatch(html, /\/_vinext\/image\?/i);
  assert.match(html, /Your Europe \/ European Union/i);
  assert.match(
    html,
    /EU\/EEA consumer debit and credit cards cannot carry a surcharge/i,
  );
  assert.match(html, /Article 62\(4\) of Directive \(EU\) 2015\/2366/i);
  assert.match(
    html,
    /shall not request charges for the use of payment instruments/i,
  );
  assert.match(
    html,
    /En betalningsmottagare får inte ta ut någon avgift av betalaren/i,
  );
  assert.match(
    html,
    /commercial or corporate cards and some three-party card schemes/i,
  );
  assert.match(
    html,
    /the payee pays the charges levied by his payment service provider/i,
  );
  assert.doesNotMatch(
    html,
    /The Sweden images establish the checkout state/i,
  );
  assert.match(html, /id="remedy"/i);
  assert.match(html, /Refund path/i);
  assert.doesNotMatch(html, /Recovery path/i);
  assert.match(html, /Ask Bondtech to refund the card fee/i);
  assert.match(html, /This is a fee-only refund request/i);
  assert.match(html, /not a citizenship test/i);
  assert.match(
    html,
    /check the consumer and payment rules where you live and where the payment was made/i,
  );
  assert.match(
    html,
    /otherwise adapt the draft to your local regulations/i,
  );
  assert.match(
    html,
    /https:\/\/eur-lex\.europa\.eu\/eli\/dir\/2015\/2366\/oj\/eng/i,
  );
  assert.match(
    html,
    /https:\/\/eur-lex\.europa\.eu\/eli\/reg\/2015\/751\/oj\/eng/i,
  );
  assert.match(html, /https:\/\/www\.efta\.int\/eea-lex\/32015l2366/i);
  assert.match(html, /https:\/\/www\.efta\.int\/eea-lex\/32015r0751/i);
  assert.match(html, /Fourteen calendar days is a reasonable practical deadline/i);
  assert.match(html, /not a special statutory refund period/i);
  assert.match(html, /href="mailto:order@bondtech\.se"/i);
  assert.match(html, /https:\/\/www\.bondtech\.se\/contact\//i);
  assert.match(
    html,
    /https:\/\/commission\.europa\.eu\/topics\/consumers\/consumer-rights-and-complaints\/resolve-your-consumer-complaint\/european-consumer-centres-network-ecc-net_en/i,
  );
  assert.match(
    html,
    /If you live in the EU, Iceland or Norway/i,
  );
  assert.match(
    html,
    /https:\/\/www\.konsumentverket\.se\/om-oss\/anmala-till-konsumentverket\//i,
  );
  assert.match(html, /Find your European Consumer Centre/i);
  assert.match(html, /Card-fee refund email/i);
  assert.match(
    html,
    /requesting a refund of the card fee charged on Order/i,
  );
  assert.doesNotMatch(html, /requesting a partial refund of/i);
  assert.match(
    html,
    /En betalningsmottagare får inte ta ut någon avgift av betalaren/i,
  );
  assert.match(html, /I am not cancelling or returning the underlying order/i);
  assert.doesNotMatch(html, /\bOrder #\d{4,}\b/i);
});

test("documents AI-assisted work and human responsibility", async () => {
  const notice = await readFile(
    new URL("../NOTICE.md", import.meta.url),
    "utf8",
  );

  assert.match(notice, /^# Project notices/m);
  assert.match(notice, /^## AI-assisted work/m);
  assert.match(notice, /Human maintainers decide what is\s+published/i);
  assert.match(
    notice,
    /AI output is never treated as a source or independent verification/i,
  );
});

test("server-renders the reporting guide and official form link", async () => {
  const html = await htmlFor("/report");

  assert.match(html, /Report it to Konsumentverket\./i);
  assert.match(html, /Reporting a Swedish company/i);
  assert.match(
    html,
    /reporting Bondtech AB to Konsumentverket, Sweden’s consumer authority/i,
  );
  assert.match(html, /Who receives the report\?/i);
  assert.match(html, /Your report goes to Konsumentverket/i);
  assert.match(html, /Open the Konsumentverket form/i);
  assert.match(html, /You do not need to be Swedish or an EU\/EEA citizen/i);
  assert.match(
    html,
    /Foreign consumers can report conduct by Bondtech AB/i,
  );
  assert.doesNotMatch(html, /For buyers in Sweden/i);
  assert.match(
    html,
    /https:\/\/anmalan\.konsumentverket\.se\/flow\/anmalning-start/i,
  );
  assert.match(html, /Steps 1–2: choose the report category/i);
  assert.match(html, /not either\/or choices/i);
  assert.match(
    html,
    /Gör ett val inom marknadsföring och avtalsvillkor/i,
  );
  assert.match(html, /Choose an area/i);
  assert.match(html, /Marketing and contract terms/i);
  assert.match(
    html,
    /Choose an option under marketing and contract terms/i,
  );
  assert.match(
    html,
    /Contracts, pricing, sales methods and marketing/i,
  );
  assert.match(html, /Steps 3–7: choose what you are reporting/i);
  assert.doesNotMatch(html, />CASE 0[1-3]</i);
  assert.match(html, /Bondtech sold the nozzle as hardened/i);
  assert.match(html, /Bondtech added a card or PayPal fee/i);
  assert.match(html, /Bondtech’s terms say the warranty lasts 90 days/i);
  for (const step of ["1", "2", "3", "4", "5", "6", "7"]) {
    assert.match(
      html,
      new RegExp(`class="(?:route-map|issue-guide)__number">${step}<`, "i"),
    );
  }
  assert.match(
    html,
    /class="button button--solid"[^>]*href="https:\/\/anmalan\.konsumentverket\.se\/flow\/anmalning-start"/i,
  );
  assert.match(html, /Why report to Konsumentverket\?/i);
  assert.match(html, /class="report-followups"/i);
  assert.doesNotMatch(html, /class="why-report-section"/i);
  assert.doesNotMatch(html, /class="remedy-section"/i);
  assert.match(html, /spot repeated problems and decide where to investigate/i);
  assert.match(
    html,
    /https:\/\/www\.konsumentverket\.se\/marknadsratt-foretag\/konsumentverkets-tillsyn\//i,
  );
  assert.match(
    html,
    /do not guarantee an investigation or recover your refund/i,
  );
  assert.equal(
    (html.match(/<details class="issue-guide"/gi) ?? []).length,
    3,
  );
  assert.doesNotMatch(html, /<details class="issue-guide"[^>]* open/i);
  assert.match(html, /Reklam på en webbplats/i);
  assert.match(html, /Köp via en webbplats/i);
  assert.match(html, /Påstående på en förpackning/i);
  assert.match(html, /Skicka min anmälan/i);
  assert.match(html, /up to 10 files/i);
  assert.match(html, /10 MB per file/i);
  assert.match(html, /Jag vill anmäla anonymt/i);
  assert.match(html, /Bondtech AB \(org\.nr 556995-5643\)/i);
  assert.match(html, /does not send personal feedback/i);
});

test("opens the reporting guide selected by the URL fragment", async () => {
  const opener = await readFile(
    new URL("../app/components/HashGuideOpener.tsx", import.meta.url),
    "utf8",
  );

  assert.match(opener, /window\.location\.hash\.slice\(1\)/i);
  assert.match(opener, /target instanceof HTMLDetailsElement/i);
  assert.match(opener, /guide\.open = guide === target/i);
  assert.match(opener, /addEventListener\("toggle", keepOneGuideOpen\)/i);
  assert.match(opener, /addEventListener\("hashchange", openMatchingGuide\)/i);
});

test("opens a case disclosure selected by a same-page link or URL fragment", async () => {
  const opener = await readFile(
    new URL("../app/components/HashDisclosureOpener.tsx", import.meta.url),
    "utf8",
  );

  assert.match(opener, /window\.location\.hash\.slice\(1\)/i);
  assert.match(opener, /target instanceof HTMLDetailsElement/i);
  assert.match(opener, /classList\.contains\("case-disclosure"\)/i);
  assert.match(opener, /target\.open = true/i);
  assert.match(opener, /closest<HTMLAnchorElement>\('a\[href\^="#"\]'\)/i);
  assert.match(
    opener,
    /document\.addEventListener\("click", openLinkedDisclosure\)/i,
  );
  assert.match(
    opener,
    /window\.addEventListener\("hashchange", openMatchingDisclosure\)/i,
  );
});
