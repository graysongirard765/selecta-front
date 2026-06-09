import Image from 'next/image';
import Link from 'next/link';

import { getLocale, getTranslations } from 'next-intl/server';

import { getArticles } from '@/features/articles';

import styles from './FindABrokerPlatforms.module.scss';

const HOME_ARTICLE_IMAGES: Record<number, string> = {
  1: "/images/home/articles/article-01.jpg",
  2: "/images/home/articles/article-02.jpg",
  3: "/images/home/articles/article-03.jpg",
};

export const FindABrokerPlatforms = async () => {
  const t = await getTranslations('FindABrokerPlatforms');
  const locale = await getLocale();
  const articles = await getArticles({ locale });
  const articleLabelPrefix = "Artículo";
  const readLabel = "Leer artículo";
  

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
          {articles.map((article) => {
            const number = article.order.toString().padStart(2, "0");
            const darkNumber = article.order === 3;
            const image = HOME_ARTICLE_IMAGES[article.order] ?? article.image;
            const href = `/actualizaciones-del-sector/${article.slug}`;

            return (
              <article key={article.slug} className={styles.card}>
                <div className={styles.imageShell}>
                  <Link
                    href={href}
                    className={styles.imageWrap}
                    aria-label={article.title}
                  >
                    <Image
                      src={image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className={styles.image}
                    />

                    <span
                      className={`${styles.badge} ${
                        darkNumber ? styles.badgeDark : ""
                      }`}
                    >
                      {`${articleLabelPrefix} ${number}`}
                    </span>

                    <span
                      className={`${styles.cardNumber} ${
                        darkNumber ? styles.cardNumberDark : ""
                      }`}
                    >
                      {number}
                    </span>
                  </Link>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  <p className={styles.cardBody}>{article.excerpt}</p>
                </div>

                <Link href={href} className={styles.cardLink}>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};
