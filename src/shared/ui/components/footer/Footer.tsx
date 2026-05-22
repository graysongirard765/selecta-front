"use client";

import Image from "next/image";

import { useLocale, useTranslations } from "next-intl";

import { WEBSITE_EMAIL } from "@/shared/lib/constants/constants";

import styles from "./Footer.module.scss";

import { Link } from "@/i18n/navigation";

type NavItem = {
  href: string;
  label: string;
  isRoute?: boolean;
};

export const Footer = () => {
  const t = useTranslations("footer");
  const locale = useLocale();
  const homePrefix = locale === "es" ? "" : `/${locale}`;
  const homeAnchor = (hash: string) => `${homePrefix}/#${hash}`;
  const howItWorksHref = `${homePrefix}/como-funciona`;
  const legalTerms = t("terms", { fallback: "Terminos y condiciones" });
  const legalPrivacy = t("privacy", { fallback: "Politica de privacidad" });
  const legalCookies = t("cookies", { fallback: "Politica de cookies" });
  const navItems: readonly NavItem[] = [
    { href: `${homePrefix || "/"}`, label: t("home", { fallback: "Inicio" }), isRoute: true },
    { href: howItWorksHref, label: t("howItWorks", { fallback: "Como funciona" }), isRoute: true },
    {
      href: homeAnchor("brokers"),
      label: t("findBroker", { fallback: "Encontrar un broker" }),
    },
    {
      href: homeAnchor("updates"),
      label: t("updates", { fallback: "Actualizaciones del sector" }),
    },
    { href: homeAnchor("compare"), label: t("tools", { fallback: "Herramientas" }) },
    { href: homeAnchor("platform"), label: t("about", { fallback: "Acerca de" }) },
    { href: homeAnchor("contact"), label: t("contact", { fallback: "Contacto" }) },
  ] as const;

  const year = new Date().getFullYear();
  const copyright = t("copyright", { fallback: "Todos los derechos reservados." });

  return (
    <footer className={styles.footer}>
      <div className={styles.banner}>
        <div className="container">
          <div className={styles.bannerInner}>
            <span className={styles.bannerDot} aria-hidden="true" />
            <p className={styles.bannerText}>
              {t("banner", {
                fallback:
                  "Selecta es una plataforma independiente de busqueda de brokers. No retenemos fondos de clientes ni proporcionamos asesoramiento de inversion.",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.shell}>
          <div className={styles.top}>
            <div className={styles.brandBlock}>
              <Link href="/" className={styles.brand}>
                <Image
                  src="/images/logo.svg"
                  alt="Selecta"
                  width={220}
                  height={65}
                />
              </Link>
              <div className={styles.description}>
                <p className={styles.descriptionStrong}>
                  {t("descriptionLead", {
                    fallback:
                      "Plataforma independiente de descubrimiento de brokers.",
                  })}
                </p>
                <p className={styles.descriptionText}>
                  {t("descriptionBody", {
                    fallback:
                      "Disenada para ayudar a las personas que estan interesados en invertir y ahorrar a identificar plataformas y bancos que ofrezcan las mejores condiciones del mercado.",
                  })}
                </p>
              </div>
              <a href={`mailto:${WEBSITE_EMAIL}`} className={styles.email}>
                <span>{WEBSITE_EMAIL}</span>
                <span className={styles.emailArrow} aria-hidden="true" />
              </a>
            </div>

            <div className={styles.metaColumns}>
              <div className={styles.column}>
                <p className={styles.label}>
                  {t("navigationLabel", { fallback: "Navegacion" })}
                </p>
                <div className={styles.linkList}>
                  {navItems.map((item) => (
                    item.isRoute ? (
                      <Link key={item.href} href={item.href} className={styles.link}>
                        {item.label}
                      </Link>
                    ) : (
                      <a key={item.href} href={item.href} className={styles.link}>
                        {item.label}
                      </a>
                    )
                  ))}
                </div>
              </div>

              <div className={styles.column}>
                <p className={styles.label}>
                  {t("legalLabel", { fallback: "Legal" })}
                </p>
                <div className={styles.linkList}>
                  <span className={styles.link}>{legalTerms}</span>
                  <span className={styles.link}>{legalPrivacy}</span>
                  <span className={styles.link}>{legalCookies}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <p className={styles.copyright}>
              © {year} Selecta.{" "}{copyright}
            </p>
          </div>
        </div>
      </div>
      <Image
        src="/images/footer-logo.svg"
        alt="Selecta"
        width={1534}
        height={400}
        className={styles.footerBottomLogo}
      />
    </footer>
  );
};
