export type PolicyLocale = "es" | "en";

export type PolicySlug =
  | "terminos-y-condiciones"
  | "politica-de-privacidad"
  | "politica-de-cookies";

export type PolicySection = {
  id: string;
  title: string;
  html: string;
};

export type PolicyDetail = {
  slug: PolicySlug;
  locale: PolicyLocale;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  introHtml: string;
  sections: PolicySection[];
};
