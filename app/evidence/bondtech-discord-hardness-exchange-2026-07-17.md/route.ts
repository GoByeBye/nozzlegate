import { getTranscriptRecord } from "../../../content/transcripts";

const record = getTranscriptRecord(
  "bondtech-discord-hardness-exchange-2026-07-17",
);

export function GET() {
  return new Response(record.rawMarkdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition":
        'inline; filename="bondtech-discord-hardness-exchange-2026-07-17.md"',
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}
