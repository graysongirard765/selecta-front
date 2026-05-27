import { useTranslations } from 'next-intl';

import styles from './AboutProcess.module.scss';

export const AboutProcess = () => {
  const t = useTranslations('AboutPageProcess');
  const subtitle = t('subtitle', {
    fallback: 'Por qué la organización cambia el proceso de investigación',
  });

  const descriptionOne = t('descriptionOne', {
    fallback:
      'Las plataformas de brokers rara vez presentan su información de la misma manera. Los costes de trading pueden aparecer en una página, las capacidades de la plataforma en otra y el acceso al mercado en la documentación técnica.',
  });
  const descriptionTwo = t('descriptionTwo', {
    fallback:
      'Cuando estos elementos se analizan dentro de un mismo marco, las diferencias entre plataformas se vuelven más fáciles de identificar.',
  });
  const descriptionThree = t('descriptionThree', {
    fallback:
      'Ese es el principio detrás de Silecta: mantener la información de brokers dentro de un entorno consistente donde las plataformas puedan explorarse sin cambiar constantemente de formato.',
  });

  return (
    <section className={styles.about_process}>
      <div className={styles.about_process__top}></div>
      <div className={styles.about_process__bottom}>
        <p className={styles.about_process__subtitle}>{subtitle}</p>

        <div className={styles.about_process__description_wrapper}>
          <p className={styles.about_process__description}>{descriptionOne}</p>
          <p className={styles.about_process__description}>{descriptionTwo}</p>
          <p className={styles.about_process__description}>{descriptionThree}</p>
        </div>
      </div>
    </section>
  );
};
