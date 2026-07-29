import { parse } from "yaml";
import contributeDocument from "./pages/contribute.md?raw";
import homeDocument from "./pages/home.md?raw";
import reportDocument from "./pages/report.md?raw";

type PageMetadata = {
  title: string;
  description: string;
};

type NumberedItem = {
  number: string;
  title: string;
  text: string;
};

export type HomeContent = {
  metadata: PageMetadata;
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLead: string;
    headlineEmphasis: string;
    intro: string;
    primaryAction: string;
    secondaryAction: string;
  };
  docket: {
    label: string;
    reference: string;
    markTop: string;
    markBottom: string;
    stats: Array<{ label: string; value: string }>;
    verifiedLabel: string;
    verifiedDate: string;
    verifiedDisplay: string;
  };
  caseSection: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  confirmation: {
    label: string;
    quote: string;
    sourceLabel: string;
    action: string;
    href: string;
  };
  standardsSection: {
    eyebrow: string;
    title: string;
    intro: string;
    action: string;
    standards: NumberedItem[];
  };
  reportBanner: {
    eyebrow: string;
    title: string;
    text: string;
    action: string;
  };
};

export type ReportContent = {
  metadata: PageMetadata;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    action: string;
    href: string;
  };
  notice: {
    title: string;
    text: string;
    action: string;
    href: string;
  };
  stepsSection: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  steps: NumberedItem[];
  routeMap: {
    eyebrow: string;
    title: string;
    items: NumberedItem[];
  };
  templatesSection: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  remedy: {
    eyebrow: string;
    title: string;
    text: string;
    links: Array<{ label: string; href: string }>;
  };
};

type ContributionStep = {
  number: string;
  title: string;
  text?: string;
  textBefore?: string;
  code?: string;
  textAfter?: string;
};

export type ContributeContent = {
  metadata: PageMetadata;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    action: string;
  };
  notice: {
    title: string;
    text: string;
  };
  evidenceSection: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  evidenceLevels: Array<{
    level: string;
    title: string;
    examples: string;
  }>;
  guide: {
    eyebrow: string;
    title: string;
    steps: ContributionStep[];
  };
  correction: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  license: {
    eyebrow: string;
    title: string;
    text: string;
  };
};

function parsePage<T extends object>(document: string, filename: string): T {
  const match = document.match(
    /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/,
  );

  if (!match) {
    throw new Error(
      `Invalid page Markdown: ${filename} must start with YAML front matter`,
    );
  }

  const parsed = parse(match[1], { uniqueKeys: true });

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(
      `Invalid page Markdown: ${filename} front matter must be an object`,
    );
  }

  return parsed as T;
}

export const homeContent = parsePage<HomeContent>(
  homeDocument,
  "content/pages/home.md",
);
export const reportContent = parsePage<ReportContent>(
  reportDocument,
  "content/pages/report.md",
);
export const contributeContent = parsePage<ContributeContent>(
  contributeDocument,
  "content/pages/contribute.md",
);
