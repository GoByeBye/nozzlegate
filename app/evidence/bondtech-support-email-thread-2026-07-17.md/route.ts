import { getTranscriptRecord } from "../../../content/transcripts";

const record = getTranscriptRecord("bondtech-support-email-thread-2026-07-17");

export function GET() {
  return new Response(record.rawMarkdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition":
        'inline; filename="bondtech-support-email-thread-2026-07-17.md"',
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}
