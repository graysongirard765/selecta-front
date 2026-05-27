import fs from "node:fs/promises";
import path from "node:path";

import { cache } from "react";
import { marked } from "marked";

import { policyRegistry } from "@/features/policies/lib/policyRegistry";
import type {
  PolicyDetail,
  PolicyLocale,
  PolicySection,
  PolicySlug,
} from "@/features/policies/model/types";

const CONTENT_ROOT = path.join(process.cwd(), "src", "features", "policies", "lib");
const DEFAULT_LOCALE: PolicyLocale = "es";
const SUPPORTED_LOCALES = new Set<PolicyLocale>(["es", "en"]);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/(^-|-$)/g, "");

const normalizeHeading = (value: string) =>
  value.replace(/\*+/g, "").replace(/\s+/g, " ").trim();

const stripMarkdown = (value: string) =>
  value
    .replace(/^#+\s*/gm, "")
    .replace(/\*+/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

const resolveLocale = (locale?: string): PolicyLocale =>
  SUPPORTED_LOCALES.has(locale as PolicyLocale)
    ? (locale as PolicyLocale)
    : DEFAULT_LOCALE;

const getPolicyPath = (locale: PolicyLocale, fileName: string) =>
  path.join(CONTENT_ROOT, locale, fileName);

const readPolicyFile = cache(async (fileName: string, locale: PolicyLocale) => {
  const requestedPath = getPolicyPath(locale, fileName);

  try {
    return await fs.readFile(requestedPath, "utf8");
  } catch {
    if (locale === DEFAULT_LOCALE) {
      throw new Error(
        `Missing policy markdown "${fileName}" in locale "${locale}".`,
      );
    }

    return fs.readFile(getPolicyPath(DEFAULT_LOCALE, fileName), "utf8");
  }
});

const parseSections = (markdown: string): {
  title: string;
  excerpt: string;
  introHtml: string;
  sections: PolicySection[];
} => {
  const tokens = marked.lexer(markdown);
  const intro: string[] = [];
  const sections: Array<{ title: string; body: string[] }> = [];
  let pageTitle = "";
  let excerpt = "";
  let currentSection: { title: string; body: string[] } | null = null;

  for (const token of tokens) {
    if (!pageTitle && token.type === "heading" && token.depth === 1) {
      pageTitle = normalizeHeading(token.text);
      continue;
    }

    if (token.type === "heading" && token.depth === 2) {
      if (currentSection) {
        sections.push(currentSection);
      }

      currentSection = {
        title: normalizeHeading(token.text),
        body: [],
      };
      continue;
    }

    if (!excerpt && token.type === "paragraph") {
      excerpt = stripMarkdown(token.text);
    }

    if (!currentSection) {
      intro.push(token.raw ?? "");
      continue;
    }

    currentSection.body.push(token.raw ?? "");
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return {
    title: pageTitle,
    excerpt,
    introHtml: (marked.parse(intro.join("").trim()) as string).trim(),
    sections: sections
      .map((section) => ({
        id: slugify(section.title),
        title: section.title,
        html: (marked.parse(section.body.join("").trim()) as string).trim(),
      }))
      .filter((section) => section.title && section.html),
  };
};

const parsePolicy = async (
  slug: PolicySlug,
  locale: PolicyLocale,
): Promise<PolicyDetail> => {
  const meta = policyRegistry.find((policy) => policy.slug === slug);

  if (!meta) {
    throw new Error(`Unknown policy slug "${slug}".`);
  }

  const rawFile = await readPolicyFile(meta.fileName, locale);
  const { title, excerpt, introHtml, sections } = parseSections(rawFile);

  return {
    slug,
    locale,
    title,
    excerpt,
    seoTitle: title,
    seoDescription: excerpt,
    introHtml,
    sections,
  };
};

export const getPolicy = async ({
  slug,
  locale = DEFAULT_LOCALE,
}: {
  slug: string;
  locale?: string;
}): Promise<PolicyDetail | null> => {
  const match = policyRegistry.find((policy) => policy.slug === slug);

  if (!match) {
    return null;
  }

  return parsePolicy(match.slug, resolveLocale(locale));
};

export const getPolicySlugs = () => policyRegistry.map((policy) => policy.slug);
