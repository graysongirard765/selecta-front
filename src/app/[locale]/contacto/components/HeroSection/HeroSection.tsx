import { getTranslations } from "next-intl/server";

import styles from "./HeroSection.module.scss";

export const HeroSection = async () => {
  const t = await getTranslations("contactPage");

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.kicker}>
            {t("hero.kicker", { fallback: "SELECTA · CONTACTO" })}
          </p>
          <h1 className={styles.title}>
            {t("hero.title", { fallback: "Hablemos." })}
          </h1>
          <p className={styles.description}>
            {t("hero.description", {
              fallback:
                "Pueden surgir preguntas al explorar los listados de brokers, revisar la información de las plataformas o navegar por las diferentes secciones del sitio web. Si algo en la plataforma requiere aclaración, puedes contactar directamente con el equipo.",
            })}
          </p>
        </div>
      </div>
    </section>
  );
};
