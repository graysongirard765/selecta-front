import { useTranslations } from 'next-intl';

import styles from './AboutHero.module.scss';

export const AboutHero = () => {
  const t = useTranslations('AboutPageHero');
  const subtitle = t('subtitle', { fallback: 'SELECTA · ACERCA DE' });
  const title = t('title', { fallback: 'Un lugar donde la investigación se integra' });
  const description = t('description', {
    fallback:
      'La investigación de brokers a menudo requiere consultar múltiples fuentes. Selecta reúne la información de brokers y el contexto del sector en un solo lugar para facilitar la exploración.',
  });

  return (
    <section className={styles.about_hero}>
      <div className="container">
        <div className={styles.about_hero__inner}>
          <p className={styles.about_hero__subtitle}>{subtitle}</p>
          <h1 className={styles.about_hero__title}>{title}</h1>
          <p className={styles.about_hero__description}>{description}</p>
        </div>
      </div>
    </section>
  );
};
