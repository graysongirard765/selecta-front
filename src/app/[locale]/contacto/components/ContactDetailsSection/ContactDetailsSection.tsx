import Image from "next/image";

import { getTranslations } from "next-intl/server";

import { ContactFormContacts } from "@/features/contact-form/ui/ContactFormContacts";

import { WEBSITE_EMAIL, WEBSITE_PHONE } from "@/shared/lib/constants/constants";

import styles from "./ContactDetailsSection.module.scss";

const CONTACT_EMAIL = WEBSITE_EMAIL;
const CONTACT_PHONE_DISPLAY = WEBSITE_PHONE;
const CONTACT_PHONE_HREF = WEBSITE_PHONE;

export const ContactDetailsSection = async () => {
  const t = await getTranslations("contactPage");

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.infoColumn}>
          <div className={styles.copy}>
            <p className={styles.kicker}>
              {t("contact.kicker", { fallback: "Datos de contacto" })}
            </p>

            <div className={styles.textBlock}>
        
              <p className={styles.description}>
                {t("contact.description", {
                  fallback:
                    "Si prefieres una comunicación directa, puedes ponerte en contacto con el equipo utilizando los datos de contacto a continuación.",
                })}
              </p>
            </div>
          </div>

          <div className={styles.contactList}>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.contactItem}>
              <span className={styles.iconWrap}>
                <Image
                  src="/images/contact/icon-mail.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </span>
              <span className={styles.contactText}>
                <span className={styles.contactLabel}>
                  {t("contact.emailLabel", {
                    fallback: "CORREO ELECTRÓNICO",
                  })}
                </span>
                <span className={styles.contactValue}>{CONTACT_EMAIL}</span>
              </span>
            </a>

            <a href={`tel:${CONTACT_PHONE_HREF}`} className={styles.contactItem}>
              <span className={styles.iconWrap}>
                <Image
                  src="/images/contact/icon-phone.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </span>
              <span className={styles.contactText}>
                <span className={styles.contactLabel}>
                  {t("contact.phoneLabel", { fallback: "TELÉFONO" })}
                </span>
                <span className={styles.contactValue}>{CONTACT_PHONE_DISPLAY}</span>
              </span>
            </a>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.privacyCard}>
            <p className={styles.privacyTitle}>
              {t("contact.privacyTitle", {
                fallback: "Silecta de privacidad",
              })}
            </p>
            <p className={styles.privacyBody}>
              {t("contact.privacyBody", {
                fallback:
                  "Tu información de contacto solo se utilizará para responder a tu consulta. Silecta no comparte información personal con terceros.",
              })}
            </p>
          </div>
        </div>

        <div className={styles.formColumn}>
          <ContactFormContacts variant="contactPage" />
        </div>
      </div>
    </section>
  );
};
