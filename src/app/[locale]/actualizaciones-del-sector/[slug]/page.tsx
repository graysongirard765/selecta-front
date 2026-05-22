import { notFound } from "next/navigation";

import { getTranslations } from "next-intl/server";

import { getArticle, getArticleSlugs } from "@/features/articles";

import { ArticleContentSection, ArticleHeroSection } from "./components";
import styles from "./page.module.scss";

type ArticlePageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export default async function SectorUpdateArticlePage({
  params,
}: ArticlePageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations("sectorUpdatesArticlePage");
  const article = await getArticle({ slug, locale });

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <ArticleHeroSection
        title={article.title}
        backLabel={t("back", { fallback: "Back" })}
      />
      <ArticleContentSection
        article={article}
        tocLabel={t("toc", { fallback: "Table of contents" })}
      />
    </div>
  );
}
