import Image from 'next/image';

import { getLocale, getTranslations } from 'next-intl/server';

import { getArticles } from '@/features/articles';
import { Link } from '@/i18n/navigation';

import styles from './UpdatesSection.module.scss';

export const UpdatesSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations('homePage.updates');
  const cards = await getArticles({ locale });
  const articleLabelPrefix = t('articleLabelPrefix', { fallback: 'Artículo' });
  const readLabel = t('readArticle', { fallback: 'Leer artículo' });

  return (
    <section id="updates" className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <div className={styles.copy}>
            <p className={styles.step}>{t('step', { fallback: '06 / Actualizaciones' })}</p>
            <p className={styles.eyebrow}>
              {t('eyebrow', { fallback: 'El mercado global avanza, nosotros también.' })}
            </p>

            <h2 className={styles.title}>
              <span>{t('titleLine1', { fallback: 'Qué está cambiando' })}</span>
              <span>{t('titleLine2', { fallback: 'en las plataformas' })}</span>
            </h2>

            <p className={styles.description}>
              {t('description', {
                fallback:
                  'Mantente informado sobre los cambios en las plataformas. Explora nuevas herramientas, actualizaciones de noticias y cambios en el acceso al mercado.',
              })}
            </p>
            <Link href="/actualizaciones-del-sector" className={styles.cta}>
              <span>{t('cta', { fallback: 'Ver todas las actualizaciones' })}</span>
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
        </div>

        <div className={styles.grid}>
          {cards.map((card) => {
            const number = card.order.toString().padStart(2, '0');
            const numberDark = card.order === 3;

            return (
            <article key={card.slug} className={styles.card}>
              <div className={styles.imageShell}>
                <Link href={`/actualizaciones-del-sector/${card.slug}`} className={styles.imageWrap}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className={styles.image}
                  />

                  <span className={`${styles.badge} ${numberDark ? styles.badgeDark : ''}`}>
                    {`${articleLabelPrefix} ${number}`}
                  </span>

                  <span className={`${styles.cardNumber} ${numberDark ? styles.cardNumberDark : ''}`}>
                    {number}
                  </span>
                </Link>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardBody}>{card.excerpt}</p>
              </div>

              <Link href={`/actualizaciones-del-sector/${card.slug}`} className={styles.cardLink}>
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
          )})}
        </div>
      </div>
    </section>
  );
};
