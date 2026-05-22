import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";

import { getArticles } from "@/features/articles";

import styles from "./ArticlesSection.module.scss";

import { Link } from "@/i18n/navigation";

export const ArticlesSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations("sectorUpdatesPage");
  const articles = await getArticles({ locale });
  const articleLabelPrefix = t("articlesLabelPrefix", {
    fallback: "Artículo",
  });
  const readLabel = t("articlesRead", { fallback: "Leer artículo" });

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.kicker}>
            {t("articlesKicker", {
              fallback: "ACTUALIZACIONES RECIENTES",
            })}
          </p>
          <h2 className={styles.title}>
            {t("articlesTitle", {
              fallback: "Qué está cambiando en las plataformas",
            })}
          </h2>
        </div>

        <div className={styles.grid}>
          {articles.map((article) => {
            const number = article.order.toString().padStart(2, "0");
            const darkNumber = article.order === 3;

            return (
              <article key={article.slug} className={styles.card}>
                <Link
                  href={`/actualizaciones-del-sector/${article.slug}`}
                  className={styles.imageWrap}
                  aria-label={article.title}
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className={styles.image}
                  />
                  <span
                    className={`${styles.badge} ${darkNumber ? styles.badgeDark : ""}`}
                  >
                    {`${articleLabelPrefix} ${number}`}
                  </span>
                  <span
                    className={`${styles.number} ${darkNumber ? styles.numberDark : ""}`}
                    aria-hidden="true"
                  >
                    {number}
                  </span>
                </Link>

                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  <p className={styles.cardBody}>{article.excerpt}</p>
                </div>

                <Link
                  href={`/actualizaciones-del-sector/${article.slug}`}
                  className={styles.cardLink}
                >
                  <span>{readLabel}</span>
                  <Image
                    src="/images/home/updates-arrow.svg"
                    alt=""
                    aria-hidden="true"
                    width={14}
                    height={14}
                  />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
