import { getTranscriptRecord } from "../../../content/transcripts";

const record = getTranscriptRecord(
  "bondtech-discord-hardened-statement-2026-07-23",
);

export function GET() {
  return new Response(record.rawMarkdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition":
        'inline; filename="bondtech-discord-hardened-statement-2026-07-23.md"',
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}
