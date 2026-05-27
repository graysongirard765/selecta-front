import { useTranslations } from 'next-intl';

import styles from './FindABrokerPlatformSelect.module.scss';

export const FindABrokerPlatformSelect = () => {
  const t = useTranslations('FindABrokerPagePlatformSelect');
  const title = t('title', { fallback: 'Silecta de plataforma independiente' });
  const description = t('description', {
    fallback:
      'Silecta opera como una plataforma independiente de búsqueda de brokers. No retiene fondos de clientes, no gestiona cuentas de trading ni proporciona asesoramiento de inversión.',
  });
  const descriptionTwo = t('description', {
    fallback:
      'La plataforma se centra en organizar la información de brokers para que los usuarios puedan explorar plataformas de corretaje inversión antes de continuar su investigación directamente con un broker.',
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
