import { getTranslations } from "next-intl/server";

import styles from "./UsageSection.module.scss";

export const UsageSection = async () => {
  const t = await getTranslations("toolsPage");

  return (
    <>
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.columns}>
            <div className={styles.left}>
              <p className={styles.kicker}>
                {t("usageKicker", {
                  fallback: "USO DE HERRAMIENTAS ANALÍTICAS",
                })}
              </p>
              <p className={styles.lead}>
                {t("usageLead", {
                  fallback:
                    "Estas utilidades permiten a los usuarios examinar diferentes parámetros relacionados con los entornos de trading y los supuestos de estrategia.",
                })}
              </p>
            </div>

            <div className={styles.right}>
              <p className={styles.body}>
                {t("usageBody", {
                  fallback:
                    "Están diseñadas para apoyar la investigación y la exploración de escenarios, no para proporcionar asesoramiento de inversión.",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.band} aria-hidden="true" />
    </>
  );
};
