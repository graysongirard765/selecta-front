import Image from 'next/image';

import { useTranslations } from 'next-intl';

import styles from './ComparisonSection.module.scss';

export const ComparisonSection = () => {
  const t = useTranslations('homePage.comparison');
  const cards = [
    {
      step: t('execution.step', { fallback: '01' }),
      title: t('execution.title', { fallback: 'Entorno de ejecucion' }),
      body: t('execution.body', {
        fallback:
          'Infraestructura que respalda el procesamiento de ordenes y las operaciones de trading.',
      }),
      icon: '/images/home/comparison/execution.svg',
    },
    {
      step: t('costs.step', { fallback: '02' }),
      title: t('costs.title', { fallback: 'Costes de trading' }),
      body: t('costs.body', { fallback: 'Comisiones, tarifas y costes habituales de la cuenta.' }),
      icon: '/images/home/comparison/costs.svg',
    },
    {
      step: t('platform.step', { fallback: '03' }),
      title: t('platform.title', { fallback: 'Plataforma' }),
      body: t('platform.body', {
        fallback:
          'Desde la plataforma acceso a tu cartera de inversion, noticias y diferentes ordenes.',
      }),
      icon: '/images/home/comparison/platform.svg',
    },
    {
      step: t('reviews.step', { fallback: '04' }),
      title: t('reviews.title', { fallback: 'Opinion de los clientes' }),
      body: t('reviews.body', {
        fallback:
          'Resenas de usuarios disponibles en plataformas independientes que califican el servicio.',
      }),
      icon: '/images/home/comparison/reviews.svg',
    },
  ] as const;

  return (
    <section id="compare" className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <p className={styles.step}>{t('step', { fallback: '03 / Comparar' })}</p>
          <h2 className={styles.title}>
            {t('title', { fallback: 'Elementos a tener en cuenta a la hora de elegir.' })}
          </h2>
        </div>

        <p className={styles.description}>
          {t('description', {
            fallback:
              'Al revisar plataformas o brokers, normalmente se comparan varios aspectos practicos que resumiremos a continuacion.',
          })}
        </p>

        <div className={styles.grid}>
          {cards.map((card) => (
            <article key={card.step} className={styles.card}>
              <div className={styles.cardCopy}>
                <p className={styles.cardStep}>{card.step}</p>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardBody}>{card.body}</p>
              </div>
              <Image src={card.icon} alt={card.title} width={42} height={42} />
            </article>
          ))}
        </div>

        <p className={styles.note}>
          {t('note', {
            fallback:
              'Estos elementos ayudan a formar una vision mas clara de como se diferencian las plataformas entre todas ellas y cual nos puede ofrecer un servicio mucho mas personalizado.',
          })}
        </p>
      </div>
    </section>
  );
};
