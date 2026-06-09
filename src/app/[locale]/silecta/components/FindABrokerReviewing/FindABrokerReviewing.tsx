import Image from 'next/image';

import { useTranslations } from 'next-intl';

import styles from './FindABrokerReviewing.module.scss';

export const FindABrokerReviewing = () => {
  const t = useTranslations('FindABrokerPageReviewing');
  const title = t('title', { fallback: 'Qué buscar al revisar brokers' });
  const description = t('description', {
    fallback:
      'Al explorar los listados de plataformas, los inversores suelen prestar atención a varios aspectos prácticos de una plataforma. Estos elementos ayudan a crear una imagen más clara de cómo difieren los entornos de inversión.',
  });

  const items = [
    {
      id: 'execution',
      title: t('itemTitleOne', { fallback: 'Entorno de ejecución' }),
      description: t('itemDescriptionOne', {
        fallback:
          'Infraestructura que respalda el procesamiento de órdenes y las operaciones de trading.',
      }),
      icon: 'environment.svg',
    },
    {
      id: 'costs',
      title: t('itemTitleTwo', { fallback: 'Costes de trading' }),
      description: t('itemDescriptionTwo', {
        fallback: 'Spreads, comisiones y cargos habituales relacionados con la cuenta.',
      }),
      icon: 'costs.svg',
    },
    {
      id: 'platform',
      title: t('itemTitleThree', { fallback: 'Acceso a la plataforma' }),
      description: t('itemDescriptionThree', {
        fallback:
          'Disponibilidad del software de trading en web, escritorio y dispositivos móviles.',
      }),
      icon: 'platform.svg',
    },
    {
      id: 'opinion',
      title: t('itemTitleFour', { fallback: 'Opinión pública' }),
      description: t('itemDescriptionFour', {
        fallback: 'Reseñas compartidas por traders en plataformas independientes.',
      }),
      icon: 'opinion.svg',
    },
  ];

  return (
    <section className={styles.find_broker_reviewing}>
      <div className="container">
        <div className={styles.find_broker_reviewing__top}>
          <h2 className={styles.find_broker_reviewing__title}>{title}</h2>
          <p className={styles.find_broker_reviewing__description}>{description}</p>
        </div>

        <ul className={styles.find_broker_reviewing__list}>
          {items?.map((item, index) => (
            <li key={item.id} className={styles.find_broker_reviewing__item}>
              <div className={styles.find_broker_reviewing__item_top}>
                <span className={styles.find_broker_reviewing__item_number}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className={styles.find_broker_reviewing__item_title}>{item.title}</h3>

                <p className={styles.find_broker_reviewing__item_description}>{item.description}</p>
              </div>

              <div className={styles.find_broker_reviewing__item_icon}>
                <Image
                  src={`/icons/${item.icon}`}
                  alt="Image"
                  width={22}
                  height={22}
                  loading="lazy"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
