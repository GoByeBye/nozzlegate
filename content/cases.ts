import { parse } from "yaml";
import nozzlegateDocument from "./cases/nozzlegate.md?raw";
import paymentSurchargesDocument from "./cases/payment-surcharges.md?raw";
import warrantyTermsDocument from "./cases/warranty-terms.md?raw";

export const caseSlugs = [
  "nozzlegate",
  "payment-surcharges",
  "warranty-terms",
] as const;

export type CaseSlug = (typeof caseSlugs)[number];

export type SourceKind =
  | "Company"
  | "Law"
  | "Authority"
  | "Archive"
  | "Community"
  | "Evidence";

export type CaseSource = {
  id: string;
  title: string;
  publisher: string;
  href: string;
  kind: SourceKind;
  checked: string;
};

export type CitedText = {
  text: string;
  sourceIds?: string[];
};

export type CaseFile = {
  slug: CaseSlug;
  number: string;
  shortTitle: string;
  category: string;
  title: string;
  deck: string;
  status: string;
  statusTone: "confirmed" | "documented" | "analysis";
  statusNote: string;
  updated: string;
  readTime: string;
  leadFact: string;
  leadLabel: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  summary: CitedText[];
  evidence: Array<{
    label: string;
    title: string;
    text: string;
    sourceIds: string[];
    image?: {
      src: string;
      alt: string;
      caption: string;
      width: number;
      height: number;
    };
  }>;
  timeline: Array<{
    date: string;
    title: string;
    text: string;
    sourceIds: string[];
  }>;
  legalTitle: string;
  legalAnalysis: CitedText[];
  openQuestions: string[];
  sources: CaseSource[];
  reportTemplate: string;
};

const sourceKinds = new Set<SourceKind>([
  "Company",
  "Law",
  "Authority",
  "Archive",
  "Community",
  "Evidence",
]);

const caseDocuments: Record<CaseSlug, string> = {
  nozzlegate: nozzlegateDocument,
  "payment-surcharges": paymentSurchargesDocument,
  "warranty-terms": warrantyTermsDocument,
};

function invariant(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(`Invalid case Markdown: ${message}`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasString(
  value: Record<string, unknown>,
  key: string,
  location: string,
) {
  invariant(
    typeof value[key] === "string" && value[key].length > 0,
    `${location}.${key} must be a non-empty string`,
  );
}

function assertStringArray(value: unknown, location: string) {
  invariant(Array.isArray(value), `${location} must be an array`);
  invariant(
    value.every((item) => typeof item === "string" && item.length > 0),
    `${location} must contain only non-empty strings`,
  );
}

function assertCitedText(value: unknown, location: string) {
  invariant(isRecord(value), `${location} must be an object`);
  hasString(value, "text", location);
  if (value.sourceIds !== undefined) {
    assertStringArray(value.sourceIds, `${location}.sourceIds`);
  }
}

function assertSourceIds(
  sourceIds: string[] | undefined,
  knownSourceIds: Set<string>,
  location: string,
) {
  for (const sourceId of sourceIds ?? []) {
    invariant(
      knownSourceIds.has(sourceId),
      `${location} cites unknown source "${sourceId}"`,
    );
  }
}

function extractFrontMatter(document: string, slug: CaseSlug) {
  const match = document.match(
    /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/,
  );
  invariant(match, `${slug}.md must start with YAML front matter`);
  return match[1];
}

function parseCaseFile(slug: CaseSlug): CaseFile {
  const parsed = parse(extractFrontMatter(caseDocuments[slug], slug), {
    uniqueKeys: true,
  });
  invariant(isRecord(parsed), `${slug}.md front matter must be an object`);

  for (const key of [
    "slug",
    "number",
    "shortTitle",
    "category",
    "title",
    "deck",
    "status",
    "statusNote",
    "updated",
    "readTime",
    "leadFact",
    "leadLabel",
    "legalTitle",
    "reportTemplate",
  ]) {
    hasString(parsed, key, slug);
  }

  invariant(parsed.slug === slug, `${slug}.md has mismatched slug`);
  invariant(
    parsed.statusTone === "confirmed" ||
      parsed.statusTone === "documented" ||
      parsed.statusTone === "analysis",
    `${slug}.statusTone is not supported`,
  );

  invariant(Array.isArray(parsed.metrics), `${slug}.metrics must be an array`);
  for (const [index, metric] of parsed.metrics.entries()) {
    const location = `${slug}.metrics[${index}]`;
    invariant(isRecord(metric), `${location} must be an object`);
    hasString(metric, "value", location);
    hasString(metric, "label", location);
  }

  invariant(Array.isArray(parsed.summary), `${slug}.summary must be an array`);
  parsed.summary.forEach((item, index) =>
    assertCitedText(item, `${slug}.summary[${index}]`),
  );

  invariant(
    Array.isArray(parsed.evidence),
    `${slug}.evidence must be an array`,
  );
  for (const [index, item] of parsed.evidence.entries()) {
    const location = `${slug}.evidence[${index}]`;
    invariant(isRecord(item), `${location} must be an object`);
    for (const key of ["label", "title", "text"]) {
      hasString(item, key, location);
    }
    assertStringArray(item.sourceIds, `${location}.sourceIds`);

    if (item.image !== undefined) {
      invariant(isRecord(item.image), `${location}.image must be an object`);
      for (const key of ["src", "alt", "caption"]) {
        hasString(item.image, key, `${location}.image`);
      }
      invariant(
        Number.isInteger(item.image.width) && item.image.width > 0,
        `${location}.image.width must be a positive integer`,
      );
      invariant(
        Number.isInteger(item.image.height) && item.image.height > 0,
        `${location}.image.height must be a positive integer`,
      );
    }
  }

  invariant(
    Array.isArray(parsed.timeline),
    `${slug}.timeline must be an array`,
  );
  for (const [index, item] of parsed.timeline.entries()) {
    const location = `${slug}.timeline[${index}]`;
    invariant(isRecord(item), `${location} must be an object`);
    for (const key of ["date", "title", "text"]) {
      hasString(item, key, location);
    }
    assertStringArray(item.sourceIds, `${location}.sourceIds`);
  }

  invariant(
    Array.isArray(parsed.legalAnalysis),
    `${slug}.legalAnalysis must be an array`,
  );
  parsed.legalAnalysis.forEach((item, index) =>
    assertCitedText(item, `${slug}.legalAnalysis[${index}]`),
  );
  assertStringArray(parsed.openQuestions, `${slug}.openQuestions`);

  invariant(Array.isArray(parsed.sources), `${slug}.sources must be an array`);
  const sourceIds = new Set<string>();
  for (const [index, source] of parsed.sources.entries()) {
    const location = `${slug}.sources[${index}]`;
    invariant(isRecord(source), `${location} must be an object`);
    for (const key of ["id", "title", "publisher", "href", "checked"]) {
      hasString(source, key, location);
    }
    invariant(
      typeof source.kind === "string" &&
        sourceKinds.has(source.kind as SourceKind),
      `${location}.kind is not supported`,
    );
    invariant(
      !sourceIds.has(source.id as string),
      `${location}.id "${source.id as string}" is duplicated`,
    );
    sourceIds.add(source.id as string);
  }

  for (const [index, item] of parsed.summary.entries()) {
    assertSourceIds(
      (item as CitedText).sourceIds,
      sourceIds,
      `${slug}.summary[${index}]`,
    );
  }
  for (const [index, item] of parsed.evidence.entries()) {
    assertSourceIds(
      (item as CaseFile["evidence"][number]).sourceIds,
      sourceIds,
      `${slug}.evidence[${index}]`,
    );
  }
  for (const [index, item] of parsed.timeline.entries()) {
    assertSourceIds(
      (item as CaseFile["timeline"][number]).sourceIds,
      sourceIds,
      `${slug}.timeline[${index}]`,
    );
  }
  for (const [index, item] of parsed.legalAnalysis.entries()) {
    assertSourceIds(
      (item as CitedText).sourceIds,
      sourceIds,
      `${slug}.legalAnalysis[${index}]`,
    );
  }

  return Object.freeze(parsed) as CaseFile;
}

export const caseFiles = caseSlugs.map(parseCaseFile);

export function getCaseFile(slug: CaseSlug) {
  const caseFile = caseFiles.find((entry) => entry.slug === slug);

  if (!caseFile) {
    throw new Error(`Unknown case file: ${slug}`);
  }

  return caseFile;
}
