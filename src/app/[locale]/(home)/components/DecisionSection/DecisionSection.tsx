import { useTranslations } from 'next-intl';

import styles from './DecisionSection.module.scss';

type DecisionCard = {
  step: string;
  title: string;
  body: string;
};

export const DecisionSection = () => {
  const t = useTranslations('homePage.decision');

  const cards: readonly DecisionCard[] = [
    {
      step: t('explore.step', { fallback: '01' }),
      title: t('explore.title', { fallback: 'Explora' }),
      body: t('explore.body', {
        fallback:
          'Revisar el funcionamiento de las plataformas y la información disponible sobre ellas.',
      }),
    },
    {
      step: t('compare.step', { fallback: '02' }),
      title: t('compare.title', { fallback: 'Compara' }),
      body: t('compare.body', {
        fallback: 'Examinar las diferencias y calificaciones entre todas las recomendaciones.',
      }),
    },
    {
      step: t('select.step', { fallback: '03' }),
      title: t('select.title', { fallback: 'Selecciona' }),
      body: t('select.body', {
        fallback: 'Identificar cuál de ellas se puede ajustar a tus preferencias de trading.',
      }),
    },
  ] as const;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <p className={styles.step}>{t('step', { fallback: '05 / Decidir' })}</p>

          <h2 className={styles.title}>
            <span>{t('titleLine1', { fallback: 'Pasar de la búsqueda' })}</span>
            <span>{t('titleLine2', { fallback: 'a la selección' })}</span>
          </h2>
        </div>

        <p className={styles.description}>
          {t('subtitle', {
            fallback: 'La selección se desarrolla en tres pasos',
          })}
        </p>

        <div className={styles.grid}>
          {cards.map((card) => (
            <article key={card.step} className={styles.card}>
              <span className={styles.cardAccent} />
              <p className={styles.cardStep}>{card.step}</p>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardBody}>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
