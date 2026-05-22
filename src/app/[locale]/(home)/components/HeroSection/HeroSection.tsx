import { useTranslations } from 'next-intl';

import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  const t = useTranslations('homePage');
  const eyebrow = t('heroEyebrow', { fallback: 'SELECTA · BROKER DISCOVERY' });
  const titleLineOne = t('heroTitleLineOne', { fallback: 'Descubre tu' });
  const titleLineTwo = t('heroTitleLineTwo', { fallback: 'broker.' });
  const description = t('heroDescription', {
    fallback:
      'Encuentra la plataforma, banco o broker que mas se adapte a tu perfil y a tus necesidades.',
  });
  const cta = t('heroPrimaryCta', { fallback: 'Encontrar un broker' });

  return (
    <section className={styles.hero} id="top">
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span>{eyebrow}</span>
          </div>

          <h1 className={styles.title}>
            {titleLineOne}
            <br />
            {titleLineTwo}
          </h1>

          <p className={styles.description}>{description}</p>

          <a href="#brokers" className={styles.cta}>
            <span>{cta}</span>
            <span className={styles.ctaArrow} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
