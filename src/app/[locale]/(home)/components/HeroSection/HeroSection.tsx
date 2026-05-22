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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2.91663 6.99984H11.0833M7.58329 2.9165L11.6666 6.99984L7.58329 11.0832"
                stroke="#030303"
                strokeWidth="1.16667"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
