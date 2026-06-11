import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";

import { getArticles } from "@/features/articles";

import styles from "./UpdatesSection.module.scss";

import { Link } from "@/i18n/navigation";

const HOME_ARTICLE_IMAGES: Record<number, string> = {
  1: "/images/home/articles/article-01.jpg",
  2: "/images/home/articles/article-02.jpg",
  3: "/images/home/articles/article-03.jpg",
};

export const UpdatesSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations("homePage.updates");
  const articles = await getArticles({ locale });
  const updatesHref = "/actualizaciones-del-sector";
  const articleLabelPrefix = t("articleLabelPrefix", {
    fallback: "Artículo",
  });
  const readLabel = t("readArticle", {
    fallback: "Leer artículo",
  });

  return (
    <section id="updates" className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <div className={styles.copy}>
            <p className={styles.step}>
              {t("step", { fallback: "08 / Actualizaciones" })}
            </p>
            <p className={styles.eyebrow}>
              {t("eyebrow", {
                fallback: "El mercado global avanza, nosotros también.",
              })}
            </p>

            <h2 className={styles.title}>
              <span>{t("titleLine1", { fallback: "Qué está cambiando" })}</span>
              <span>{t("titleLine2", { fallback: "en las plataformas" })}</span>
            </h2>

            <p className={styles.description}>
              {t("description", {
                fallback:
                  "Mantente informado sobre los cambios en las plataformas. Explora nuevas herramientas, actualizaciones de noticias y cambios en el acceso al mercado.",
              })}
            </p>
          </div>

          <Link href={updatesHref} className={styles.cta}>
            <span>{t("cta", { fallback: "Ver todas las actualizaciones" })}</span>
            <Image
              src="/images/home/updates-arrow.svg"
              alt=""
              aria-hidden="true"
              width={14}
              height={14}
              className={styles.arrow}
            />
          </Link>
        </div>

        <div className={styles.grid}>
          {articles.map((article) => {
            const number = article.order.toString().padStart(2, "0");
            const darkNumber = article.order === 3;
            const image = HOME_ARTICLE_IMAGES[article.order] ?? article.image;
            const href = `/actualizaciones-del-sector/${article.slug}`;

            return (
              <article key={article.slug} className={styles.card}>
                <div className={styles.imageShell}>
                  <Link
                    href={href}
                    className={styles.imageWrap}
                    aria-label={article.title}
                  >
                    <Image
                      src={image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className={styles.image}
                    />

                    <span
                      className={`${styles.badge} ${
                        darkNumber ? styles.badgeDark : ""
                      }`}
                    >
                      {`${articleLabelPrefix} ${number}`}
                    </span>

                    <span
                      className={`${styles.cardNumber} ${
                        darkNumber ? styles.cardNumberDark : ""
                      }`}
                    >
                      {number}
                    </span>
                  </Link>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  <p className={styles.cardBody}>{article.excerpt}</p>
                </div>

                <Link href={href} className={styles.cardLink}>
                  <span>{readLabel}</span>
                  <Image
                    src="/images/home/updates-arrow.svg"
                    alt=""
                    aria-hidden="true"
                    width={14}
                    height={14}
                    className={styles.arrow}
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
