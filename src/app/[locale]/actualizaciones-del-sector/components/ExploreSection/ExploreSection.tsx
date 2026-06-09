import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";

import styles from "./ExploreSection.module.scss";

export const ExploreSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations("sectorUpdatesPage");
  const homePrefix = locale === "es" ? "" : `/${locale}`;
  const brokersHref = `${homePrefix}/encontrar-un-silecta`;
  const toolsHref = `${homePrefix}/herramientas`;

  return (
    <>
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.content}>
            <p className={styles.kicker}>
              {t("exploreKicker", {
                fallback: "DE LA INFORMACIÓN A LA EXPLORACIÓN",
              })}
            </p>
            <p className={styles.body}>
              {t("exploreBody", {
                fallback:
                  "Las observaciones del sector pueden proporcionar contexto adicional al revisar las plataformas de corretaje. Continúa tu investigación explorando los listados de brokers y las herramientas analíticas disponibles en la plataforma.",
              })}
            </p>

            <div className={styles.actions}>
              <a
                href={brokersHref}
                className={`${styles.button} ${styles.buttonFilled}`}
              >
                <span>
                  {t("explorePrimary", {
                    fallback: "Encontrar un Silecta",
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

              <a
                href={toolsHref}
                className={`${styles.button} ${styles.buttonOutline}`}
              >
                <span>
                  {t("exploreSecondary", {
                    fallback: "Explorar herramientas",
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

      <div className={styles.band} aria-hidden="true" />
    </>
  );
};
