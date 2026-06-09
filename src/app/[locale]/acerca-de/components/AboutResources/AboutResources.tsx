import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import styles from './AboutResources.module.scss';

export const AboutResources = () => {
  const t = useTranslations('AboutPageResources');
  const subtitle = t('subtitle', { fallback: 'Un entorno, varias perspectivas' });
  const title = t('title', { fallback: 'Tres recursos integrados en una sola plataforma.' });

  const items = [
    {
      id: 'execution',
      title: t('itemTitleOne', { fallback: 'Listados de diferentes firmas y productos' }),
      description: t('itemDescriptionOne', {
        fallback:
          'Perfiles estructurados que presentan las plataformas de trading en una sola vista general.',
      }),
      icon: 'candle.svg',
      link: 'silecta',
      linkTitle: 'Silecta',
    },
    {
      id: 'costs',
      title: t('itemTitleTwo', { fallback: 'Observaciones del sector' }),
      description: t('itemDescriptionTwo', {
        fallback:
          'Artículos que cubren desarrollos de plataformas, actualizaciones de infraestructura y cambios en el entorno.',
      }),
      icon: 'building.svg',
      link: 'actualizaciones-del-sector',
      linkTitle: 'Actualizaciones del sector',
    },
    {
      id: 'platform',
      title: t('itemTitleThree', { fallback: 'Utilidades analíticas' }),
      description: t('itemDescriptionThree', {
        fallback:
          'Herramientas interactivas que permiten a los usuarios examinar parámetros de trading y supuestos de estrategia.',
      }),
      icon: 'chart.svg',
      link: 'herramientas',
      linkTitle: 'Herramientas',
    },
  ];

  return (
    <section className={styles.about_resources}>
      <div className="container">
        <div className={styles.about_resources__top}>
          <p className={styles.about_resources__subtitle}>{subtitle}</p>
          <h2 className={styles.about_resources__title}>{title}</h2>
        </div>

        <ul className={styles.about_resources__list}>
          {items?.map((item) => (
            <li key={item.id} className={styles.about_resources__item}>
              <div className={styles.about_resources__item_top}>
                <div className={styles.about_resources__item_icon}>
                  <Image
                    src={`/icons/${item.icon}`}
                    alt="Image"
                    width={20}
                    height={20}
                    loading="lazy"
                  />
                </div>

                <p className={styles.about_resources__item_subtitle}>{item.title}</p>
              </div>

              <div className={styles.about_resources__item_bottom}>
                <div>
                  <h3 className={styles.about_resources__item_title}>{item.title}</h3>

                  <p className={styles.about_resources__item_description}>{item.description}</p>
                </div>

                <Link className={styles.about_resources__item_link} href={item.link}>
                  {item.linkTitle} →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
