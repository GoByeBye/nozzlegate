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
    /bondtech-discord-hardness-exchange-2026-07-17\.md/i,
  );
  assert.match(
    html,
    /bondtech-discord-hardened-statement-2026-07-23\.md/i,
  );
  assert.match(html, /Legal context/i);
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
  assert.equal(config.images?.binding, "IMAGES");
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
      "../public/evidence/bondtech-discord-hardness-exchange-2026-07-17.md",
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

  assert.match(html, /Checkout captured/i);
  assert.match(html, /Sweden selected/i);
  assert.match(html, /28\.01 kr/i);
  assert.match(html, /Fee for PayPal/i);
  assert.match(html, /€4\.45/i);
  assert.match(html, /Fee for Credit Card \(Stripe\)/i);
  assert.match(html, /bondtech-sweden-checkout-card-selected\.png/i);
  assert.match(html, /bondtech-sweden-checkout-paypal-selected\.png/i);
  assert.match(html, /bondtech-eu-card-fee-checkout\.png/i);
  assert.match(html, /Your Europe \/ European Union/i);
  assert.match(html, /evidence still stops at checkout/i);
});

test("server-renders the reporting guide and official form link", async () => {
  const html = await htmlFor("/report");

  assert.match(html, /Report it to Konsumentverket\./i);
  assert.match(html, /Reporting a Swedish company/i);
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
