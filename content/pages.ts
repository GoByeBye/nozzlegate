import { parse } from "yaml";
import contributeDocument from "./pages/contribute.md?raw";
import homeDocument from "./pages/home.md?raw";
import privacyDocument from "./pages/privacy.md?raw";
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

type TranslatedNumberedItem = NumberedItem & {
  titleTranslation: string;
  textTranslation: string;
};

export type HomeContent = {
  metadata: PageMetadata;
  caseSection: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  community: {
    eyebrow: string;
    title: string;
    text: string;
    note: string;
    label: string;
    href: string;
    iconAlt: string;
  };
  actions: Array<{
    label: string;
    text: string;
    href: string;
  }>;
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
  whyReport: {
    eyebrow: string;
    title: string;
    text: string;
    note: string;
    action: string;
    href: string;
  };
  sharedRoute: {
    eyebrow: string;
    title: string;
    intro: string;
    verified: string;
    items: TranslatedNumberedItem[];
  };
  guideSection: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  issueGuides: Array<{
    caseSlug: string;
    title: string;
    summary: string;
    fields: Array<{
      label: string;
      value: string;
    }>;
    encounter: string;
    encounterNote: string;
    date: string;
    attachments: string[];
  }>;
  finish: {
    files: string;
    affected: string;
    contact: string;
    summary: string;
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
    githubAction: string;
    githubHref: string;
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
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    note: string;
    privacyAction: string;
    privacyHref: string;
    methods: Array<{
      label: string;
      value: string;
      text: string;
      action: string;
      href: string;
      external: boolean;
    }>;
  };
  correction: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  license: {
    eyebrow: string;
    title: string;
    aiDisclosure: string;
    text: string;
  };
};

export type PrivacyContent = {
  metadata: PageMetadata;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    updated: string;
  };
  facts: Array<{
    label: string;
    value: string;
    text: string;
  }>;
  sections: Array<{
    id: string;
    number: string;
    title: string;
    paragraphs: string[];
    links?: Array<{
      label: string;
      href: string;
    }>;
  }>;
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
export const privacyContent = parsePage<PrivacyContent>(
  privacyDocument,
  "content/pages/privacy.md",
);
