import { cache } from "react";

import matter from "gray-matter";
import { marked } from "marked";
import fs from "node:fs/promises";
import path from "node:path";

import { articleRegistry, type ArticleSlug } from "@/features/articles/lib/articleRegistry";
import type { ArticleDetail, ArticleListItem, ArticleLocale, ArticleSection } from "@/features/articles/model/types";

const CONTENT_ROOT = path.join(process.cwd(), "src", "features", "articles", "lib");
const DEFAULT_LOCALE: ArticleLocale = "es";
const SUPPORTED_LOCALES = new Set<ArticleLocale>(["es", "en"]);

type ArticleFrontmatter = {
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/(^-|-$)/g, "");

const normalizeHeading = (value: string) =>
  value.replace(/\*+/g, "").replace(/\s+/g, " ").trim();

const resolveLocale = (locale?: string): ArticleLocale =>
  SUPPORTED_LOCALES.has(locale as ArticleLocale) ? (locale as ArticleLocale) : DEFAULT_LOCALE;

const getArticlePath = (locale: ArticleLocale, slug: ArticleSlug) =>
  path.join(CONTENT_ROOT, locale, `${slug}.md`);

const parseSections = (markdown: string): {
  introHtml: string;
  sections: ArticleSection[];
} => {
  const tokens = marked.lexer(markdown);
  const intro: string[] = [];
  const sections: Array<{ title: string; body: string[] }> = [];
  let currentSection: { title: string; body: string[] } | null = null;

  for (const token of tokens) {
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

const readArticleFile = cache(async (slug: ArticleSlug, locale: ArticleLocale) => {
  const requestedPath = getArticlePath(locale, slug);

  try {
    return await fs.readFile(requestedPath, "utf8");
  } catch {
    if (locale === DEFAULT_LOCALE) {
      throw new Error(`Missing article markdown for slug "${slug}" in locale "${locale}".`);
    }

    return fs.readFile(getArticlePath(DEFAULT_LOCALE, slug), "utf8");
  }
});

const parseArticle = async (
  slug: ArticleSlug,
  locale: ArticleLocale,
  order: number,
): Promise<ArticleDetail> => {
  const rawFile = await readArticleFile(slug, locale);
  const { data, content } = matter(rawFile);
  const frontmatter = data as ArticleFrontmatter;
  const articleMeta = articleRegistry.find((article) => article.slug === slug);
  const { introHtml, sections } = parseSections(content);

  return {
    slug,
    order,
    locale,
    image: articleMeta?.image ?? "",
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    seoTitle: frontmatter.seoTitle,
    seoDescription: frontmatter.seoDescription,
    introHtml,
    sections,
  };
};

export const getArticles = async ({
  locale = DEFAULT_LOCALE,
}: {
  locale?: string;
} = {}): Promise<ArticleListItem[]> => {
  const resolvedLocale = resolveLocale(locale);

  const articles = await Promise.all(
    articleRegistry.map(async (article) => {
      const parsed = await parseArticle(article.slug, resolvedLocale, article.order);
      return {
        slug: parsed.slug,
        order: parsed.order,
        locale: parsed.locale,
        image: parsed.image,
        title: parsed.title,
        excerpt: parsed.excerpt,
        seoTitle: parsed.seoTitle,
        seoDescription: parsed.seoDescription,
      } satisfies ArticleListItem;
    }),
  );

  return articles.sort((left, right) => left.order - right.order);
};

export const getArticle = async ({
  slug,
  locale = DEFAULT_LOCALE,
}: {
  slug: string;
  locale?: string;
}): Promise<ArticleDetail | null> => {
  const article = articleRegistry.find((item) => item.slug === slug);

  if (!article) {
    return null;
  }

  return parseArticle(article.slug, resolveLocale(locale), article.order);
};

export const getArticleSlugs = () => articleRegistry.map((article) => article.slug);
