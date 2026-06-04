import { useTranslations } from 'next-intl';

import { ContactFormContacts } from '@/features/contact-form/ui/ContactFormContacts';

import { WEBSITE_EMAIL } from '@/shared/lib/constants/constants';

import styles from './ContactSection.module.scss';

export const ContactSection = () => {
  const t = useTranslations('homePage.contact');
  const step = t('step', { fallback: '09 / Contacto' });
  const eyebrow = t('eyebrow', { fallback: 'Contactar con el equipo' });
  const title = t('title', { fallback: 'Aqui para ayudar' });
  const description = t('description', {
    fallback:
      'Si necesitas aclaraciones o resolver dudas sobre como funciona la plataforma, puedes contactar directamente con el equipo.',
  });
  const note = t('note', {
    fallback:
      'Tu informacion de contacto solo se utilizara para responder a tu consulta. Silecta no comparte informacion personal con terceros.',
  });

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className={styles.shell}>
          <div className={styles.copy}>
            <p className={styles.step}>{step}</p>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <a href={`mailto:${WEBSITE_EMAIL}`} className={styles.email}>
              {WEBSITE_EMAIL}
            </a>
            <p className={styles.note}>{note}</p>
          </div>

          <div className={styles.formWrap}>
            <ContactFormContacts />
          </div>
        </div>
      </div>
    </section>
  );
};
