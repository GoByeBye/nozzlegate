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
  assert.match(html, /What Bondtech sold\./i);
  assert.match(html, /What owners[\s\S]*got\./i);
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

  for (const page of ["home", "report", "contribute"]) {
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
  assert.match(
    html,
    /https:\/\/anmalan\.konsumentverket\.se\/flow\/anmalning-start/i,
  );
  assert.match(html, /Pick the issue you had/i);
  assert.match(html, /<details class="report-template"/i);
  assert.doesNotMatch(html, /<details class="report-template"[^>]* open/i);
  assert.match(html, /Bondtech AB \(org\.nr 556995-5643\)/i);
  assert.match(html, /does not resolve your personal compensation claim/i);
});
