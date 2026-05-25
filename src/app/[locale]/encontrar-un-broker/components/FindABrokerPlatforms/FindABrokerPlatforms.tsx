import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { usePlatformsData } from '@/shared/lib/hooks/usePlatformsData';

import styles from './FindABrokerPlatforms.module.scss';

export const FindABrokerPlatforms = () => {
  const { cards, readLabel } = usePlatformsData();

  const t = useTranslations('FindABrokerPlatforms');

  return (
    <section id="updates" className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <div className={styles.copy}>
            <h2 className={styles.title}>
              {t('title', { fallback: 'Mantente actualizado sobre las plataformas' })}
            </h2>

            <p className={styles.description}>
              {t('description', {
                fallback:
                  'Los servicios de brokers y los entornos de trading continúan evolucionando. Seguir los desarrollos del sector puede proporcionar contexto adicional al explorar plataformas de inversión.',
              })}
            </p>
          </div>

          <Link href="/" className={styles.cta}>
            <span>{t('link', { fallback: 'Ver actualizaciones del sector' })}</span>
            <Image
              src="/images/home/updates-arrow.svg"
              alt=""
              aria-hidden="true"
              width={14}
              height={14}
              className={styles.arrow}
            />
          </Link>
        </div>

        <div className={styles.grid}>
          {cards.map((card) => (
            <article key={card.key} className={styles.card}>
              <div className={styles.imageShell}>
                <div className={styles.imageWrap}>
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className={styles.image}
                  />

                  <span className={`${styles.badge} ${card.numberDark ? styles.badgeDark : ''}`}>
                    {card.label}
                  </span>

                  <span
                    className={`${styles.cardNumber} ${card.numberDark ? styles.cardNumberDark : ''}`}
                  >
                    {card.number}
                  </span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardBody}>{card.body}</p>
              </div>

              <Link href="/" className={styles.cardLink}>
                <span>{readLabel}</span>
                <Image
                  src="/images/home/updates-arrow.svg"
                  alt=""
                  aria-hidden="true"
                  width={14}
                  height={14}
                  className={styles.arrow}
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
