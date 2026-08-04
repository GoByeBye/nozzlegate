import type { Metadata } from "next";
import { TranscriptViewer } from "../../components/TranscriptViewer";
import { getTranscriptRecord } from "../../../content/transcripts";

const record = getTranscriptRecord("bondtech-support-email-thread-2026-07-17");

export const metadata: Metadata = {
  title: "17 July support email record",
  description: record.deck,
};

export default function SupportEmailThreadPage() {
  return <TranscriptViewer record={record} />;
}
