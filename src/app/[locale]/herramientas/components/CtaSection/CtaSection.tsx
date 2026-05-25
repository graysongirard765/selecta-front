import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";

import styles from "./CtaSection.module.scss";

export const CtaSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations("toolsPage");
  const homePrefix = locale === "es" ? "" : `/${locale}`;
  const brokersHref = `${homePrefix}/#brokers`;
  const updatesHref = `${homePrefix}/actualizaciones-del-sector`;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.content}>
          <p className={styles.kicker}>
            {t("ctaKicker", { fallback: "CONTINUAR LA INVESTIGACIÓN" })}
          </p>
          <p className={styles.body}>
            {t("ctaBody", {
              fallback:
                "Las herramientas analíticas pueden complementar los listados de brokers y la información del sector disponible en la plataforma.",
            })}
          </p>

          <div className={styles.actions}>
            <a href={brokersHref} className={`${styles.button} ${styles.buttonFilled}`}>
              <span>{t("ctaPrimary", { fallback: "Encontrar un broker" })}</span>
              <Image
                src="/images/home/updates-arrow.svg"
                alt=""
                aria-hidden="true"
                width={14}
                height={14}
              />
            </a>
            <a href={updatesHref} className={`${styles.button} ${styles.buttonOutline}`}>
              <span>
                {t("ctaSecondary", {
                  fallback: "Actualizaciones del sector",
                })}
              </span>
              <Image
                src="/images/home/updates-arrow.svg"
                alt=""
                aria-hidden="true"
                width={14}
                height={14}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
