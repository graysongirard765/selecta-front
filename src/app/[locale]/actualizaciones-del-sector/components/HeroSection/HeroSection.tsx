import { getTranslations } from "next-intl/server";

import styles from "./HeroSection.module.scss";

export const HeroSection = async () => {
  const t = await getTranslations("sectorUpdatesPage");
  
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.kicker}>
            {t("heroKicker", {
              fallback: "SILECTA · ACTUALIZACIONES DEL SECTOR",
            })}
          </p>
          <h1 className={styles.title}>
            {t("heroTitle", { fallback: "Actualizaciones del sector." })}
          </h1>
          <p className={styles.description}>
            {t("heroDescription", {
              fallback:
                "Comprende cómo evolucionan las plataformas de corretaje con el tiempo desde cambios tecnológicos hasta transformaciones en la infraestructura de trading y los entornos de las plataformas.",
            })}
          </p>
        </div>
      </div>
    </section>
  );
};
