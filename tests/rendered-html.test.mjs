import assert from "node:assert/strict";
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
  assert.match(html, /The record[\s\S]*is the[\s\S]*point/i);
  assert.match(html, /Three claims\. Three evidence trails\./i);
  assert.match(html, /href="\/cases\/nozzlegate"/i);
  assert.match(html, /href="\/cases\/payment-surcharges"/i);
  assert.match(html, /href="\/cases\/warranty-terms"/i);
  assert.match(html, /made with hate by[\s\S]*href="https:\/\/daddie\.dev"/i);
  assert.doesNotMatch(
    html,
    /codex-preview|Your site is taking shape|react-loading-skeleton/i,
  );
});

test("server-renders a cited case file", async () => {
  const html = await htmlFor("/cases/nozzlegate");

  assert.match(html, /Case 01 — Nozzlegate \| Nozzlegate/i);
  assert.match(html, /Sold as hardened\. Shipped as something else\./i);
  assert.match(html, /30–32 HRC/i);
  assert.match(html, /Read the record yourself/i);
  assert.match(html, /INDX – Hardened Nozzles Update/i);
  assert.match(html, /Analysis · not legal advice/i);
});

test("server-renders the reporting guide and official form link", async () => {
  const html = await htmlFor("/report");

  assert.match(html, /Make the paper trail impossible to ignore\./i);
  assert.match(
    html,
    /https:\/\/anmalan\.konsumentverket\.se\/flow\/anmalning-start/i,
  );
  assert.match(html, /Three Swedish report templates/i);
  assert.match(html, /Bondtech AB \(org\.nr 556995-5643\)/i);
  assert.match(html, /Konsumentverket report is a tip for market supervision/i);
});
