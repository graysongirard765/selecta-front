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
  const howItWorksHref = `${homePrefix}/como-funciona`;
  const updatesHref = `${homePrefix}/actualizaciones-del-sector`;
  const toolsHref = `${homePrefix}/herramientas`;
  const brokersHref = `${homePrefix}/encontrar-un-silecta`;
  const aboutHref = `${homePrefix}/acerca-de`;
  const contactHref = `${homePrefix}/contacto`;
  const termsHref = `${homePrefix}/terminos-y-condiciones`;
  const privacyHref = `${homePrefix}/politica-de-privacidad`;
  const cookiesHref = `${homePrefix}/politica-de-cookies`;
  const legalTerms = t("terms", { fallback: "Terminos y condiciones" });
  const legalPrivacy = t("privacy", { fallback: "Politica de privacidad" });
  const legalCookies = t("cookies", { fallback: "Politica de cookies" });
  const navItems: readonly NavItem[] = [
    {
      href: `${homePrefix || "/"}`,
      label: t("home", { fallback: "Inicio" }),
      isRoute: true,
    },
    {
      href: howItWorksHref,
      label: t("howItWorks", { fallback: "Como funciona" }),
      isRoute: true,
    },
    {
      href: brokersHref,
      label: t("findBroker", { fallback: "Encontrar un Silecta" }),
      isRoute: true,
    },
    {
      href: updatesHref,
      label: t("updates", { fallback: "Actualizaciones del sector" }),
      isRoute: true,
    },
    {
      href: toolsHref,
      label: t("tools", { fallback: "Herramientas" }),
      isRoute: true,
    },
    {
      href: aboutHref,
      label: t("about", { fallback: "Acerca de" }),
      isRoute: true,
    },
    {
      href: contactHref,
      label: t("contact", { fallback: "Contacto" }),
      isRoute: true,
    },
  ] as const;

  const year = new Date().getFullYear();
  const copyright = t("copyright", {
    fallback: "Todos los derechos reservados.",
  });

  return (
    <footer className={styles.footer}>
      <div className={styles.banner}>
        <div className="container">
          <div className={styles.bannerInner}>
            <span className={styles.bannerDot} aria-hidden="true" />
            <p className={styles.bannerText}>
              {t("banner", {
                fallback:
                  "Silecta es una plataforma independiente sobre desarrollos del mercado. No retenemos fondos de clientes ni proporcionamos asesoramiento de inversion.",
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
                  alt="Silecta"
                  width={220}
                  height={65}
                />
              </Link>
              <div className={styles.description}>
                <p className={styles.descriptionStrong}>
                  {t("descriptionLead", {
                    fallback:
                      "Plataforma independiente de descubrimiento de bancos, plataformas o Etf.",
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M2.91663 6.99984H11.0833M7.58329 2.9165L11.6666 6.99984L7.58329 11.0832"
                    stroke="#ffffff"
                    strokeWidth="1.16667"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>

            <div className={styles.metaColumns}>
              <div className={styles.column}>
                <p className={styles.label}>
                  {t("navigationLabel", { fallback: "Navegacion" })}
                </p>
                <div className={styles.linkList}>
                  {navItems.map((item) =>
                    item.isRoute ? (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={styles.link}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        key={item.href}
                        href={item.href}
                        className={styles.link}
                      >
                        {item.label}
                      </a>
                    ),
                  )}
                </div>
              </div>

              <div className={styles.column}>
                <p className={styles.label}>
                  {t("legalLabel", { fallback: "Legal" })}
                </p>
                <div className={styles.linkList}>
                  <Link href={termsHref} className={styles.link}>
                    {legalTerms}
                  </Link>
                  <Link href={privacyHref} className={styles.link}>
                    {legalPrivacy}
                  </Link>
                  <Link href={cookiesHref} className={styles.link}>
                    {legalCookies}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <p className={styles.copyright}>
              © {year} Silecta. {copyright}
            </p>
          </div>
        </div>
      </div>
      <Image
        src="/images/footer-logo.svg"
        alt="Silecta"
        width={1534}
        height={400}
        className={styles.footerBottomLogo}
      />
    </footer>
  );
};
