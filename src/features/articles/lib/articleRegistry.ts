export const articleRegistry = [
  {
    order: 1,
    slug: "el-camino-que-siguen-los-inversores-al-elegir-un-broker",
    image: "/images/sector-updates/articles/article-01.jpg",
  },
  {
    order: 2,
    slug: "herramientas-analiticas-apoyan-la-comparativa",
    image: "/images/sector-updates/articles/article-02.jpg",
  },
  {
    order: 3,
    slug: "la-informacion-estructurada-facilita-la-seleccion",
    image: "/images/sector-updates/articles/article-03.jpg",
  },
] as const;

export type ArticleSlug = (typeof articleRegistry)[number]["slug"];
