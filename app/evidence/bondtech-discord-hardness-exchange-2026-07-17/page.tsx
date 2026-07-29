import type { Metadata } from "next";
import { TranscriptViewer } from "../../components/TranscriptViewer";
import { getTranscriptRecord } from "../../../content/transcripts";

const record = getTranscriptRecord(
  "bondtech-discord-hardness-exchange-2026-07-17",
);

export const metadata: Metadata = {
  title: "17 July Discord record",
  description: record.deck,
};

export default function HardnessExchangeTranscriptPage() {
  return <TranscriptViewer record={record} />;
}
