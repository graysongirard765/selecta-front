import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { useBrokersData } from '@/shared/lib/hooks/useBrokersData';

import styles from './BrokersSection.module.scss';

export const BrokersSection = () => {
  const t = useTranslations('homePage.brokers');

  const { cards } = useBrokersData();

  return (
    <section className={styles.section} id="brokers">
      <div className="container">
        <div className={styles.heading}>
          <p className={styles.kicker}>{t('step', { fallback: '02 / Entender' })}</p>
          <h2 className={styles.title}>
            {t('titleLine1', { fallback: 'Conoce tus opciones' })}
            <br />
            {t('titleLine2', { fallback: 'reales a la hora de decidir.' })}
          </h2>
        </div>

        <div className={styles.grid}>
          {cards.map((card) => (
            <article
              key={card.key}
              className={[
                styles.card,
                styles[`card${card.key[0].toUpperCase()}${card.key.slice(1)}`],
                //card.dark ? styles.cardDark : '',
                //card.large ? styles.cardLarge : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className={styles.cardTop}>
                <Link href={card.link || ''} target="_blank" rel="noopener noreferrer" className={styles.logoBadge}>
                  <Image
                    src={card.logo}
                    alt={card.logoAlt}
                    width={card.logoWidth}
                    height={card.logoHeight}
                    className={styles.logoImage}
                  />
                </Link>

                <div className={styles.verified}>
                  <span className={styles.verifiedDot} />
                  <span>{card.badge}</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{card.name}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>

              <div className={styles.specs}>
                {card.specs.map((spec) => (
                  <div key={`${card.key}-${spec.label}`} className={styles.specRow}>
                    <span className={styles.specLabel}>{spec.label}</span>
                    <strong className={styles.specValue}>{spec.value}</strong>
                  </div>
                ))}
              </div>

              <div className={styles.tags}>
                {card.tags.map((tag) => (
                  <span key={`${card.key}-${tag}`} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* {card.rating ? (
                <div className={styles.ratingRow}>
                  <span className={styles.ratingStars}>★★★★★</span>
                  <span className={styles.ratingText}>{card.rating}</span>
                </div>
              ) : null} */}
            </article>
          ))}
        </div>

        <p className={styles.footerNote}>
          {t('closing', {
            fallback:
              'Determina si alguna de estas compañías puede cubrir tus necesidades informándote de una forma clara, rápida y precisa. Consulta sus servicios, costes y productos en un solo clic.',
          })}
        </p>
      </div>
    </section>
  );
};
