import { useTranslations } from 'next-intl';

import styles from './BrokerHero.module.scss';

export const BrokerHero = () => {
  const t = useTranslations('FindABrokerPageHero');
  const title = t('title', { fallback: 'Silecta' });
  const description = t('description', {
    fallback:
      'Explora diferentes plataformas a través de listados organizados y perfiles de brokers estructurados.',
  });

  return (
    <section className={styles.broker_hero}>
      <div className="container">
        <div className={styles.broker_hero__inner}>
          <h1 className={styles.broker_hero__title}>{title}</h1>
          <p className={styles.broker_hero__description}>{description}</p>
        </div>
      </div>
    </section>
  );
};
