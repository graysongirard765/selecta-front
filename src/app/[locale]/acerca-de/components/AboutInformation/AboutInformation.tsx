import { useTranslations } from 'next-intl';

import styles from './AboutInformation.module.scss';

export const AboutInformation = () => {
  const t = useTranslations('AboutPageInformation');
  const subtitle = t('subtitle', { fallback: 'Qué información se suele revisar' });
  const title = t('title', {
    fallback: 'Los elementos clave que los traders examinan al explorar plataformas de corretaje.',
  });
  const description = t('description', {
    fallback:
      'Cuando los traders exploran plataformas de corretaje, la atención suele centrarse en varios aspectos prácticos del entorno de la plataforma.',
  });

  const items = [
    {
      id: 'execution-infrastructure',
      title: t('itemTitleOne', { fallback: 'Infraestructura de ejecución' }),
      description: t('itemDescriptionOne', {
        fallback:
          'Sistemas de procesamiento de órdenes y el entorno técnico que respalda la ejecución de operaciones.',
      }),
      icon: '⬡',
    },
    {
      id: 'trading-conditions',
      title: t('itemTitleTwo', { fallback: 'Condiciones de trading' }),
      description: t('itemDescriptionTwo', {
        fallback:
          'Spreads, comisiones, costes de financiación y otros parámetros relacionados con la actividad de trading.',
      }),
      icon: '◈',
    },
    {
      id: 'platform-access',
      title: t('itemTitleThree', { fallback: 'Acceso a la plataforma' }),
      description: t('itemDescriptionThree', {
        fallback: 'Disponibilidad del software de trading en entornos web, móvil y de escritorio.',
      }),
      icon: '◇',
    },
    {
      id: 'public-opinion',
      title: t('itemTitleFour', { fallback: 'Opinión pública' }),
      description: t('itemDescriptionFour', {
        fallback: 'Experiencias compartidas por traders en plataformas de reseñas externas.',
      }),
      icon: '○',
    },
  ];

  return (
    <section className={styles.about_information}>
      <div className="container">
        <div className={styles.about_information__top}>
          <div>
            <p className={styles.about_information__subtitle}></p>
            <h2 className={styles.about_information__title}>{subtitle}</h2>
          </div>

          <p className={styles.about_information__description}>{description}</p>
        </div>

        <ul className={styles.about_information__list}>
          {items?.map((item) => (
            <li key={item.id} className={styles.about_information__item}>
              <div className={styles.about_information__item_top}>
                <div className={styles.about_information__item_icon}>{item.icon}</div>

                <div>
                  <p className={styles.about_information__item_title}>{item.title}</p>

                  <p className={styles.about_information__item_description}>{item.description}</p>
                </div>
              </div>

              <div className={styles.about_information__item_bottom}>
                <p className={styles.about_information__item_description}>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
