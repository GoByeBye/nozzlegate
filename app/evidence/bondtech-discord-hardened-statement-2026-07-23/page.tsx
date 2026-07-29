import type { Metadata } from "next";
import { TranscriptViewer } from "../../components/TranscriptViewer";
import { getTranscriptRecord } from "../../../content/transcripts";

const record = getTranscriptRecord(
  "bondtech-discord-hardened-statement-2026-07-23",
);

export const metadata: Metadata = {
  title: "23 July Discord record",
  description: record.deck,
};

export default function HardenedStatementTranscriptPage() {
  return <TranscriptViewer record={record} />;
}
