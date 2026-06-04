import { useLocale, useTranslations } from "next-intl";

import styles from "./PlatformSection.module.scss";

export const PlatformSection = () => {
  const t = useTranslations("homePage.platform");
  const locale = useLocale();
  const homePrefix = locale === "es" ? "" : `/${locale}`;
  const aboutHref = `${homePrefix}/acerca-de`;
  const step = t("step", { fallback: "08 / Nuestra plataforma" });
  const title = t("title", { fallback: "Estructura independiente" });
  const cardTitle = t("cardTitle", { fallback: "Un recurso independiente" });
  const lead = t("lead", {
    fallback:
      "Silecta es un recurso independiente dedicado a organizar la informacion de brokers y los desarrollos del sector.",
  });
  const body = t("body", {
    fallback:
      "No actua como broker ni gestiona cuentas de trading. Su proposito es presentar la informacion de las diferentes alternativas dentro de una estructura mas clara que facilite la exploracion y la comparacion.",
  });
  const metaPrimary = t("metaPrimary", {
    fallback: "Plataforma · Independiente",
  });
  const metaSecondary = t("metaSecondary", { fallback: "Est. 2026" });
  const cta = t("cta", { fallback: "Acerca de la plataforma" });

  return (
    <section id="platform" className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <p className={styles.step}>{step}</p>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <article className={styles.card}>
          <div className={styles.copy}>
            <p className={styles.kicker}>{cardTitle}</p>
            <p className={styles.lead}>{lead}</p>
          </div>

          <div className={styles.bodyWrap}>
            <p className={styles.body}>{body}</p>

            <div className={styles.meta}>
              <span>{metaPrimary}</span>
              <span>{metaSecondary}</span>
            </div>
          </div>

          <a href={aboutHref} className={styles.cta}>
            <span>{cta}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2.91663 6.99984H11.0833M7.58329 2.9165L11.6666 6.99984L7.58329 11.0832"
                stroke="#030303"
                strokeWidth="1.16667"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </article>
      </div>
    </section>
  );
};
