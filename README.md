# nozzlegate.com

A minimal static landing page for nozzlegate.com, built with vinext and
Cloudflare-compatible tooling.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

The page lives under `app/`, while `.openai/hosting.json` stores the Sites
deployment metadata.

`cloudflare-worker.js` is the direct Cloudflare Worker entry point used for the
public deployment.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build and verify the rendered landing page
