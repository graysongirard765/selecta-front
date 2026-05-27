import { getTranslations } from "next-intl/server";

import styles from "./HeroSection.module.scss";

export const HeroSection = async () => {
  const t = await getTranslations("toolsPage");

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.kicker}>
            {t("heroKicker", {
              fallback: "SILECTA · HERRAMIENTAS ANALÍTICAS",
            })}
          </p>
          <h1 className={styles.title}>
            {t("heroTitle", { fallback: "Herramientas." })}
          </h1>
          <p className={styles.description}>
            {t("heroDescription", {
              fallback:
                "Herramientas analíticas disponibles para ayudar a examinar entornos de trading, condiciones de las plataformas y posibles escenarios de estrategia.",
            })}
          </p>
        </div>
      </div>
    </section>
  );
};
