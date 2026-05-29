import Image from "next/image";

import { getTranslations } from "next-intl/server";

import styles from "./ServicesSection.module.scss";

export const ServicesSection = async () => {
  const t = await getTranslations("sectorUpdatesPage");
  const items = [
    {
      icon: "/images/sector-updates/icons/platform-updates.svg",
      title: t("servicesTitlePlatformUpdates", {
        fallback: "Actualizaciones de la plataforma",
      }),
      body: t("servicesBodyPlatformUpdates", {
        fallback:
          "El software de trading evoluciona con nuevas funciones, actualizaciones de la interfaz y entornos de ejecución mejorados.",
      }),
    },
    {
      icon: "/images/sector-updates/icons/new-tools.svg",
      title: t("servicesTitleNewTools", {
        fallback: "Nuevas herramientas de trading",
      }),
      body: t("servicesBodyNewTools", {
        fallback:
          "Las plataformas introducen herramientas analíticas adicionales, funciones de automatización y utilidades de la plataforma.",
      }),
    },
    {
      icon: "/images/sector-updates/icons/market-access.svg",
      title: t("servicesTitleMarketAccess", {
        fallback: "Ampliación del acceso al mercado",
      }),
      body: t("servicesBodyMarketAccess", {
        fallback:
          "Los inversores pueden añadir gradualmente nuevas clases de activos como acciones, ETF, criptomonedas o derivados.",
      }),
    },
    {
      icon: "/images/sector-updates/icons/service-adjustments.svg",
      title: t("servicesTitleAdjustments", {
        fallback: "Ajustes de servicios",
      }),
      body: t("servicesBodyAdjustments", {
        fallback:
          "Las estructuras de cuentas, las capacidades de la plataforma y las funciones disponibles pueden cambiar a medida que las plataformas perfeccionan sus servicios.",
      }),
    },
  ] as const;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div className={styles.copy}>
 
            <h2 className={styles.title}>
              {t("servicesTitle", {
                fallback: "Servicios fiables en el largo plazo",
              })}
            </h2>
          </div>

          <p className={styles.description}>
            {t("servicesDescription", {
              fallback:
                "Las plataformas de inversion suelen ampliar y ajustar sus servicios a medida que evolucionan la tecnología de trading y el acceso al mercado. Con el tiempo, estos cambios pueden incluir:",
            })}
          </p>
        </div>

        <div className={styles.grid}>
          {items.map((item) => (
            <article key={item.title} className={styles.card}>
              <span className={styles.iconWrap} aria-hidden="true">
                <Image src={item.icon} alt="" width={16} height={16} />
              </span>
              <span className={styles.divider} aria-hidden="true" />
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
