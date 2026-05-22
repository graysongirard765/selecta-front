export type ArticleLocale = "es" | "en";

export type ArticleSection = {
  id: string;
  title: string;
  html: string;
};

export type ArticleListItem = {
  slug: string;
  order: number;
  locale: ArticleLocale;
  image: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
};

export type ArticleDetail = ArticleListItem & {
  introHtml: string;
  sections: ArticleSection[];
};
