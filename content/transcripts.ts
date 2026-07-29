import { parse } from "yaml";
import hardenedStatementDocument from "./transcripts/bondtech-discord-hardened-statement-2026-07-23.md?raw";
import hardnessExchangeDocument from "./transcripts/bondtech-discord-hardness-exchange-2026-07-17.md?raw";

export const transcriptSlugs = [
  "bondtech-discord-hardness-exchange-2026-07-17",
  "bondtech-discord-hardened-statement-2026-07-23",
] as const;

export type TranscriptSlug = (typeof transcriptSlugs)[number];

export type TranscriptMessage = {
  speaker: string;
  timestamp?: string;
  role: "company" | "community" | "unattributed";
  paragraphs: string[];
};

export type TranscriptSection = {
  title: string;
  messages: TranscriptMessage[];
};

export type TranscriptContextBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "notice"; paragraphs: string[] };

export type TranscriptRecord = {
  slug: TranscriptSlug;
  title: string;
  displayTitle: string;
  deck: string;
  recordType: string;
  attributedCompanyRespondent: string;
  attributedChannel: string;
  attributedDate: string;
  attributedTime: string;
  timezone: string;
  submitted: string;
  verification: string;
  privacy?: string;
  rawHref: string;
  rawMarkdown: string;
  context: TranscriptContextBlock[];
  sections: TranscriptSection[];
  messageCount: number;
};

const transcriptDocuments: Record<
  TranscriptSlug,
  { markdown: string; rawHref: string }
> = {
  "bondtech-discord-hardness-exchange-2026-07-17": {
    markdown: hardnessExchangeDocument,
    rawHref:
      "/evidence/bondtech-discord-hardness-exchange-2026-07-17.md",
  },
  "bondtech-discord-hardened-statement-2026-07-23": {
    markdown: hardenedStatementDocument,
    rawHref:
      "/evidence/bondtech-discord-hardened-statement-2026-07-23.md",
  },
};

function invariant(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(`Invalid transcript Markdown: ${message}`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function requireString(
  value: Record<string, unknown>,
  key: string,
  slug: TranscriptSlug,
) {
  invariant(
    typeof value[key] === "string" && value[key].length > 0,
    `${slug}.${key} must be a non-empty string`,
  );
  return value[key] as string;
}

function splitDocument(document: string, slug: TranscriptSlug) {
  const match = document.match(
    /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/,
  );
  invariant(match, `${slug}.md must start with YAML front matter`);

  const frontMatter = parse(match[1], { uniqueKeys: true });
  invariant(isRecord(frontMatter), `${slug} front matter must be an object`);

  return {
    frontMatter,
    body: document.slice(match[0].length),
  };
}

function quoteParagraphs(lines: string[]) {
  const paragraphs: string[] = [];
  let words: string[] = [];

  const flush = () => {
    if (words.length) {
      paragraphs.push(words.join(" ").trim());
      words = [];
    }
  };

  for (const line of lines) {
    const content = line.replace(/^>\s?/, "").trim();
    if (!content) {
      flush();
      continue;
    }
    words.push(content);
  }

  flush();
  return paragraphs;
}

function parseContext(lines: string[]) {
  const blocks: TranscriptContextBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line || line.startsWith("# ")) {
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "heading", text: line.slice(3).trim() });
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quoted: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoted.push(lines[index].trim());
        index += 1;
      }
      blocks.push({ type: "notice", paragraphs: quoteParagraphs(quoted) });
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].trim().startsWith("#") &&
      !lines[index].trim().startsWith(">")
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

function parseSpeaker(
  header: string,
  companyRespondent: string,
): Pick<TranscriptMessage, "speaker" | "timestamp" | "role"> {
  const divider = header.indexOf(" — ");
  const speaker = divider >= 0 ? header.slice(0, divider).trim() : header;
  const timestamp =
    divider >= 0 ? header.slice(divider + 3).trim() : undefined;

  if (speaker === companyRespondent) {
    return { speaker, timestamp, role: "company" };
  }

  if (/^Community member \d+$/i.test(speaker)) {
    return { speaker, timestamp, role: "community" };
  }

  return { speaker, timestamp, role: "unattributed" };
}

function parseTranscriptSections(
  lines: string[],
  companyRespondent: string,
) {
  const sections: TranscriptSection[] = [];
  let section: TranscriptSection | undefined;
  let header: string | undefined;
  let quoted: string[] = [];

  const flushMessage = () => {
    if (!section || !header) {
      return;
    }

    const paragraphs = quoteParagraphs(quoted);
    invariant(paragraphs.length > 0, `"${header}" has no quoted message`);
    section.messages.push({
      ...parseSpeaker(header, companyRespondent),
      paragraphs,
    });
    header = undefined;
    quoted = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const sectionMatch = line.match(/^##\s+(.+)$/);
    if (sectionMatch) {
      flushMessage();
      section = { title: sectionMatch[1].trim(), messages: [] };
      sections.push(section);
      continue;
    }

    if (!section) {
      continue;
    }

    const headerMatch = line.match(/^\*\*(.+)\*\*$/);
    if (headerMatch) {
      flushMessage();
      header = headerMatch[1].trim();
      continue;
    }

    if (header && line.startsWith(">")) {
      quoted.push(line);
    }
  }

  flushMessage();
  invariant(sections.length > 0, "must include a Transcript section");
  invariant(
    sections.every((entry) => entry.messages.length > 0),
    "every transcript section must contain a message",
  );
  return sections;
}

function parseTranscriptRecord(slug: TranscriptSlug): TranscriptRecord {
  const source = transcriptDocuments[slug];
  const { frontMatter, body } = splitDocument(source.markdown, slug);
  const companyRespondent = requireString(
    frontMatter,
    "attributedCompanyRespondent",
    slug,
  );
  const transcriptIndex = body.search(/^## Transcript\s*$/m);
  invariant(transcriptIndex >= 0, `${slug} must include ## Transcript`);

  const contextLines = body.slice(0, transcriptIndex).split(/\r?\n/);
  const transcriptLines = body.slice(transcriptIndex).split(/\r?\n/);
  const sections = parseTranscriptSections(
    transcriptLines,
    companyRespondent,
  );
  const attributedTime =
    frontMatter.attributedTimeRange ??
    frontMatter.attributedFirstTimestamp;
  invariant(
    typeof attributedTime === "string" && attributedTime.length > 0,
    `${slug} must include an attributed time or time range`,
  );

  return {
    slug,
    title: requireString(frontMatter, "title", slug),
    displayTitle: requireString(frontMatter, "displayTitle", slug),
    deck: requireString(frontMatter, "deck", slug),
    recordType: requireString(frontMatter, "recordType", slug),
    attributedCompanyRespondent: companyRespondent,
    attributedChannel: requireString(
      frontMatter,
      "attributedChannel",
      slug,
    ),
    attributedDate: requireString(frontMatter, "attributedDate", slug),
    attributedTime,
    timezone: requireString(frontMatter, "timezone", slug),
    submitted: requireString(frontMatter, "submitted", slug),
    verification: requireString(frontMatter, "verification", slug),
    privacy:
      typeof frontMatter.privacy === "string"
        ? frontMatter.privacy
        : undefined,
    rawHref: source.rawHref,
    rawMarkdown: source.markdown,
    context: parseContext(contextLines),
    sections,
    messageCount: sections.reduce(
      (total, entry) => total + entry.messages.length,
      0,
    ),
  };
}

export const transcriptRecords = transcriptSlugs.map(parseTranscriptRecord);

export function getTranscriptRecord(slug: TranscriptSlug) {
  const record = transcriptRecords.find((entry) => entry.slug === slug);
  invariant(record, `unknown transcript "${slug}"`);
  return record;
}
