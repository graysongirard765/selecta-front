import { useTranslations } from 'next-intl';

import styles from './FindABrokerPlatformSelect.module.scss';

export const FindABrokerPlatformSelect = () => {
  const t = useTranslations('FindABrokerPagePlatformSelect');
  const title = t('title', { fallback: 'Silecta de plataforma independiente' });
  const description = t('description1', {
    fallback:
      'Silecta opera como una plataforma independiente. No retiene fondos de clientes, no gestiona cuentas de trading ni proporciona asesoramiento de inversión.',
  });
  const descriptionTwo = t('description2', {
    fallback:
      'La plataforma se centra en organizar la informacion para que los usuarios puedan explorar las diferentes opciones que tienen antes de centrarse en una única opción',
  });

  return (
    <section className={styles.find_broker_platform}>
      <div className="container">
        <h2 className={styles.find_broker_platform__title}>{title}</h2>
        <div className={styles.find_broker_platform__description}>
          <p>{description}</p>
          <p>{descriptionTwo}</p>
        </div>
      </div>
    </section>
  );
};
