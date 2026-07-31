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
  displayTitle?: string;
  publisher: string;
  href: string;
  kind: SourceKind;
  checked: string;
};

export type CitedText = {
  text: string;
  sourceIds?: string[];
};

export type CaseActionLink = {
  label: string;
  href: string;
};

export type CaseRemedyItem = CitedText & {
  title: string;
  bullets?: string[];
  links?: CaseActionLink[];
};

export type CaseRemedyTemplate = {
  title: string;
  note: string;
  emailTemplate: string;
};

export type CaseRemedy = {
  title: string;
  intro: CitedText;
  note: string;
  pathsTitle?: string;
  pathsIntro?: string;
  paths?: CaseRemedyItem[];
  steps: CaseRemedyItem[];
  escalationTitle: string;
  escalationIntro: string;
  escalation: CaseRemedyItem[];
  templateTitle?: string;
  templateNote?: string;
  emailTemplate?: string;
  templates?: CaseRemedyTemplate[];
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
  remedy?: CaseRemedy;
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

function assertActionLink(value: unknown, location: string) {
  invariant(isRecord(value), `${location} must be an object`);
  hasString(value, "label", location);
  hasString(value, "href", location);
}

function assertRemedyItem(value: unknown, location: string) {
  assertCitedText(value, location);
  invariant(isRecord(value), `${location} must be an object`);
  hasString(value, "title", location);

  if (value.bullets !== undefined) {
    assertStringArray(value.bullets, `${location}.bullets`);
  }

  if (value.links !== undefined) {
    invariant(Array.isArray(value.links), `${location}.links must be an array`);
    value.links.forEach((link, index) =>
      assertActionLink(link, `${location}.links[${index}]`),
    );
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

  if (parsed.remedy !== undefined) {
    invariant(isRecord(parsed.remedy), `${slug}.remedy must be an object`);
    for (const key of [
      "title",
      "note",
      "escalationTitle",
      "escalationIntro",
    ]) {
      hasString(parsed.remedy, key, `${slug}.remedy`);
    }
    if (parsed.remedy.templates !== undefined) {
      invariant(
        Array.isArray(parsed.remedy.templates) &&
          parsed.remedy.templates.length > 0,
        `${slug}.remedy.templates must be a non-empty array`,
      );
      parsed.remedy.templates.forEach((item, index) => {
        const location = `${slug}.remedy.templates[${index}]`;
        invariant(isRecord(item), `${location} must be an object`);
        for (const key of ["title", "note", "emailTemplate"]) {
          hasString(item, key, location);
        }
      });
    } else {
      for (const key of ["templateTitle", "templateNote", "emailTemplate"]) {
        hasString(parsed.remedy, key, `${slug}.remedy`);
      }
    }
    assertCitedText(parsed.remedy.intro, `${slug}.remedy.intro`);
    const hasRemedyPaths =
      parsed.remedy.pathsTitle !== undefined ||
      parsed.remedy.pathsIntro !== undefined ||
      parsed.remedy.paths !== undefined;
    if (hasRemedyPaths) {
      hasString(parsed.remedy, "pathsTitle", `${slug}.remedy`);
      hasString(parsed.remedy, "pathsIntro", `${slug}.remedy`);
      invariant(
        Array.isArray(parsed.remedy.paths) && parsed.remedy.paths.length > 0,
        `${slug}.remedy.paths must be a non-empty array`,
      );
      parsed.remedy.paths.forEach((item, index) =>
        assertRemedyItem(item, `${slug}.remedy.paths[${index}]`),
      );
    }
    invariant(
      Array.isArray(parsed.remedy.steps) && parsed.remedy.steps.length > 0,
      `${slug}.remedy.steps must be a non-empty array`,
    );
    parsed.remedy.steps.forEach((item, index) =>
      assertRemedyItem(item, `${slug}.remedy.steps[${index}]`),
    );
    invariant(
      Array.isArray(parsed.remedy.escalation) &&
        parsed.remedy.escalation.length > 0,
      `${slug}.remedy.escalation must be a non-empty array`,
    );
    parsed.remedy.escalation.forEach((item, index) =>
      assertRemedyItem(item, `${slug}.remedy.escalation[${index}]`),
    );
  }

  assertStringArray(parsed.openQuestions, `${slug}.openQuestions`);

  invariant(Array.isArray(parsed.sources), `${slug}.sources must be an array`);
  const sourceIds = new Set<string>();
  for (const [index, source] of parsed.sources.entries()) {
    const location = `${slug}.sources[${index}]`;
    invariant(isRecord(source), `${location} must be an object`);
    for (const key of ["id", "title", "publisher", "href", "checked"]) {
      hasString(source, key, location);
    }
    if (source.displayTitle !== undefined) {
      hasString(source, "displayTitle", location);
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
  if (parsed.remedy !== undefined) {
    const remedy = parsed.remedy as CaseRemedy;
    assertSourceIds(
      remedy.intro.sourceIds,
      sourceIds,
      `${slug}.remedy.intro`,
    );
    for (const [index, item] of remedy.steps.entries()) {
      assertSourceIds(
        item.sourceIds,
        sourceIds,
        `${slug}.remedy.steps[${index}]`,
      );
    }
    for (const [index, item] of remedy.escalation.entries()) {
      assertSourceIds(
        item.sourceIds,
        sourceIds,
        `${slug}.remedy.escalation[${index}]`,
      );
    }
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
