import Link from 'next/link';

import { useTranslations } from 'next-intl';

import styles from './AboutInvestigation.module.scss';

export const AboutInvestigation = () => {
  const t = useTranslations('AboutPageInvestigation');
  const subtitle = t('subtitle', {
    fallback: 'Una plataforma diseñada para la exploración',
  });

  const title = t('title', {
    fallback: 'La investigación rara vez sigue un orden estricto.',
  });

  const descriptionOne = t('descriptionOne', {
    fallback:
      'Un usuario puede comenzar revisando listados, mientras que otro puede empezar con herramientas analíticas o con observaciones del sector.',
  });
  const descriptionTwo = t('descriptionTwo', {
    fallback:
      'Dado que los caminos de investigación difieren, Silecta permite moverse entre secciones sin imponer una secuencia fija.',
  });

  const linkTitle = t('linkTitle', {
    fallback: 'Ver cómo funciona',
  });

  const listSubtitle = t('listSubtitle', {
    fallback: 'El papel independiente de Silecta',
  });

  const listDescription = t('listDescription', {
    fallback:
      'Silecta opera como una plataforma independiente. El servicio no abre cuentas de trading, no retiene fondos de clientes, no ejecuta operaciones ni proporciona asesoramiento de inversión. Nuestro papel se limita a:',
  });

  const list = [
    {
      id: 'broker-information',
      title: t('listItemTitleOne', { fallback: 'Organización de las condiciones mas importantes a la hora de elegir' }),
    },
    {
      id: 'industry-observations',
      title: t('listItemTitleOneTwo', { fallback: 'Observaciones del sector' }),
    },
    {
      id: 'research-tools',
      title: t('listItemTitleOneThree', { fallback: 'Herramientas analíticas de investigación' }),
    },
    {
      id: 'external-reviews',
      title: t('listItemTitleOneFour', { fallback: 'Referencias a reseñas externas' }),
    },
  ];

  return (
    <section className={styles.about_investigation}>
      <div className={styles.about_investigation__top}>
        <div>
          <p className={styles.about_investigation__subtitle}>{subtitle}</p>
          <h2 className={styles.about_investigation__title}>{title}</h2>
          <div className={styles.about_investigation__description}>
            <p>{descriptionOne}</p>
            <p>{descriptionTwo}</p>
          </div>
          <Link className={styles.about_investigation__link} href={'/como-funciona'}>
            {linkTitle} <span>→</span>
          </Link>
        </div>

        <div>
          <p className={styles.about_investigation__list_subtitle}>{listSubtitle}</p>

          <p className={styles.about_investigation__list_description}>{listDescription}</p>

          {list?.length > 0 && (
            <ul className={styles.about_investigation__list}>
              {list.map((item) => (
                <li key={item.id} className={styles.about_investigation__list_item}>
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.about_investigation__bottom}></div>
    </section>
  );
};
