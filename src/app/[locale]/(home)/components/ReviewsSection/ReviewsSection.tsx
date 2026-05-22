import Image from 'next/image';

import { useTranslations } from 'next-intl';

import styles from './ReviewsSection.module.scss';

type ReviewCard = {
  key: 'maria' | 'javier' | 'lucia';
  initials: string;
  name: string;
  source: string;
  rating: string;
  quote: string;
  showTrustpilotIcon?: boolean;
  emphasizeName?: boolean;
  sourceOnNextLine?: boolean;
};

export const ReviewsSection = () => {
  const t = useTranslations('homePage.reviews');

  const cards: readonly ReviewCard[] = [
    {
      key: 'maria',
      initials: 'MA',
      name: t('maria.name', { fallback: 'María A.' }),
      source: t('maria.source', { fallback: 'Trustpilot' }),
      rating: t('maria.rating', { fallback: '4.7 / 5' }),
      quote: t('maria.quote', {
        fallback:
          '“Las condiciones de ejecución y las comisiones se ven con claridad, sin tener que saltar entre webs.”',
      }),
      showTrustpilotIcon: true,
    },
    {
      key: 'javier',
      initials: 'JP',
      name: t('javier.name', { fallback: 'Javier P.' }),
      source: t('javier.source', { fallback: 'Trustpilot' }),
      rating: t('javier.rating', { fallback: '4.9 / 5' }),
      quote: t('javier.quote', {
        fallback: '“Miré cuatro brokers en un rato. La comparación estructurada ayuda a decidir sin prisa.”',
      }),
      showTrustpilotIcon: true,
      emphasizeName: true,
    },
    {
      key: 'lucia',
      initials: 'LO',
      name: t('lucia.name', { fallback: 'Lucía O.' }),
      source: t('lucia.source', { fallback: 'Google Reviews' }),
      rating: t('lucia.rating', { fallback: '5.0 / 5' }),
      quote: t('lucia.quote', {
        fallback: '“Selecta no me vende nada. Me organiza la información y me deja elegir con calma.”',
      }),
      sourceOnNextLine: true,
    },
  ] as const;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.shell}>
          <div className={styles.copy}>
            <p className={styles.step}>{t('step', { fallback: '04 / Verificar' })}</p>

            <h2 className={styles.title}>
              <span>{t('titleLine1', { fallback: 'Perspectivas' })}</span>
              <span>{t('titleLine2', { fallback: 'externas de' })}</span>
              <span>{t('titleLine3', { fallback: 'comunidades' })}</span>
              <span>{t('titleLine4', { fallback: 'de trading' })}</span>
            </h2>

            <p className={styles.description}>
              {t('description', {
                fallback:
                  'Las plataformas de brokers se discuten con frecuencia en plataformas de reseñas independientes donde los traders comparten sus experiencias.',
              })}
            </p>

            <p className={styles.note}>
              {t('note', {
                fallback:
                  'Estas perspectivas externas pueden proporcionar una ayuda adicional para entender y valorar el servicio antes de realizar una elección.',
              })}
            </p>
          </div>

          <div className={styles.cards}>
            {cards.map((card) => (
              <article key={card.key} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.avatar}>{card.initials}</span>

                  <div className={styles.meta}>
                    <p className={`${styles.name} ${card.emphasizeName ? styles.nameStrong : ''}`}>
                      {card.name}
                    </p>

                    {card.showTrustpilotIcon ? (
                      <div className={styles.sourceRow}>
                        <Image
                          src="/images/home/trustpilot-star.svg"
                          alt=""
                          aria-hidden="true"
                          width={13}
                          height={12}
                          className={styles.sourceIcon}
                        />
                        <span className={styles.source}>{card.source}</span>
                      </div>
                    ) : card.sourceOnNextLine ? (
                      <p className={styles.sourceBlock}>· {card.source}</p>
                    ) : (
                      <p className={styles.source}>{card.source}</p>
                    )}
                  </div>

                  <span className={styles.ratingPill}>
                    <span className={styles.ratingDot} />
                    <span className={styles.ratingText}>{card.rating}</span>
                  </span>
                </div>

                <p className={styles.quote}>{card.quote}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
