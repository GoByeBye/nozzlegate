import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  assert.match(html, /Bondtech,/i);
  assert.match(html, /documented\./i);
  assert.match(html, /Start with the facts\./i);
  assert.match(html, /Every claim should be verifiable\./i);
  assert.match(html, /href="\/cases\/nozzlegate"/i);
  assert.match(html, /href="\/cases\/payment-surcharges"/i);
  assert.match(html, /href="\/cases\/warranty-terms"/i);
  assert.match(
    html,
    /made with spite &amp; anger by[\s\S]*href="https:\/\/daddie\.dev"/i,
  );
  assert.doesNotMatch(
    html,
    /codex-preview|Your site is taking shape|react-loading-skeleton/i,
  );
});

test("server-renders a cited case file", async () => {
  const html = await htmlFor("/cases/nozzlegate");

  assert.match(html, /Case 01 — Nozzlegate \| Nozzlegate/i);
  assert.match(
    html,
    /Sold as hardened\. Bondtech later said they weren’t\./i,
  );
  assert.match(html, /30–32 HRC/i);
  assert.match(html, /What happened/i);
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
  assert.match(html, /Read rendered transcript/i);
  assert.match(html, /aria-label="Rendered Discord transcripts"/i);
  assert.match(html, /17 July — hardness exchange/i);
  assert.match(html, /23 July — company statement/i);
  assert.match(html, /Open transcript/i);
  assert.doesNotMatch(
    html,
    /href="\/evidence\/bondtech-discord-[^"]+\.md"/i,
  );
  assert.match(html, /Legal context/i);
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
  assert.match(html, /https:\/\/discord\.gg\/7Aqk5x8kFc/i);
  assert.doesNotMatch(html, /Daddie0/i);
  assert.match(html, /mailto:contact\.nozzlegate@f22\.no/i);
  assert.match(html, /website itself does not submit or store messages/i);
  assert.match(html, /href="\/privacy"/i);
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
  assert.doesNotMatch(html, /Daddie0/i);
  assert.doesNotMatch(html, /OpenAI|ChatGPT Sites/i);
});

test("disables persisted Cloudflare Worker logs and traces", async () => {
  const config = JSON.parse(
    await readFile(
      new URL("../dist/server/wrangler.json", import.meta.url),
      "utf8",
    ),
  );

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
    if (slug === "payment-surcharges") {
      assert.match(markdown, /\nremedy:\r?\n/);
      assert.match(markdown, /\n  emailTemplate: \|-/);
      const remedyBlock = markdown.match(
        /\nremedy:\r?\n[\s\S]*?(?=\nopenQuestions:)/,
      )?.[0];
      assert.ok(remedyBlock, "payment remedy block should be present");
      assert.doesNotMatch(
        remedyBlock,
        /Forbruker|\bamounts?\b|\[FEE AMOUNT\]|\[TOTAL CHARGED\]|\$|€|\b(?:USD|EUR|SEK|NOK)\b/i,
      );
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

  assert.match(html, /Charge privately confirmed/i);
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
    /exact coverage still depends on the card and account/i,
  );
  assert.match(html, /id="remedy"/i);
  assert.match(html, /Ask Bondtech to refund the card fee/i);
  assert.match(html, /This is a fee-only refund request/i);
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
  assert.doesNotMatch(html, /107343/);
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
  assert.match(html, /Start with the same two choices/i);
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
  assert.match(html, /Then follow the matching route/i);
  assert.match(html, /Why report to Konsumentverket\?/i);
  assert.match(html, /basis for supervision of a company/i);
  assert.match(
    html,
    /https:\/\/www\.konsumentverket\.se\/marknadsratt-foretag\/konsumentverkets-tillsyn\//i,
  );
  assert.match(
    html,
    /does not guarantee an investigation, a fix or a refund/i,
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
