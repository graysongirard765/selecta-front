import Image from 'next/image';

import { useTranslations } from 'next-intl';

import styles from './UpdatesSection.module.scss';

type UpdateCard = {
  key: 'article01' | 'article02' | 'article03';
  image: string;
  alt: string;
  label: string;
  number: string;
  numberDark?: boolean;
  title: string;
  body: string;
};

export const UpdatesSection = () => {
  const t = useTranslations('homePage.updates');

  const cards: readonly UpdateCard[] = [
    {
      key: 'article01',
      image: '/images/home/articles/article-01.jpg',
      alt: t('article01.alt', { fallback: 'Invierte a largo y corto plazo.' }),
      label: t('article01.label', { fallback: 'Artículo 01' }),
      number: '01',
      title: t('article01.title', { fallback: 'Invierte a largo y corto plazo.' }),
      body: t('article01.body', {
        fallback:
          'Elige una Plataforma que te permita adaptar tu inversión en función de tus necesidades ya sean a largo o corto plazo que aumente tus posibilidades de obtener rentabilidad.',
      }),
    },
    {
      key: 'article02',
      image: '/images/home/articles/article-02.jpg',
      alt: t('article02.alt', {
        fallback: 'Realiza aportaciones o reinvierte beneficios con comodidad.',
      }),
      label: t('article02.label', { fallback: 'Artículo 02' }),
      number: '02',
      title: t('article02.title', {
        fallback: 'Realiza aportaciones o reinvierte beneficios con comodidad.',
      }),
      body: t('article02.body', {
        fallback:
          'Las herramientas analíticas ayudan a los inversores a revisar características clave de las plataformas, como los costes de tarifas, las condiciones y el tiempo de ejecución.',
      }),
    },
    {
      key: 'article03',
      image: '/images/home/articles/article-03.jpg',
      alt: t('article03.alt', { fallback: 'Invierte y paga comisiones bajas por ello.' }),
      label: t('article03.label', { fallback: 'Artículo 03' }),
      number: '03',
      numberDark: true,
      title: t('article03.title', { fallback: 'Invierte y paga comisiones bajas por ello.' }),
      body: t('article03.body', {
        fallback:
          'El activo más rentable es pagar comisiones bajas por realizar tu inversión, no puedes controlar si el mercado sube o baja, pero si puedes controlar lo que pagas por ello.',
      }),
    },
  ] as const;

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
          </div>

          <a href="#top" className={styles.cta}>
            <span>{t('cta', { fallback: 'Ver todas las actualizaciones' })}</span>
            <Image
              src="/images/home/updates-arrow.svg"
              alt=""
              aria-hidden="true"
              width={14}
              height={14}
              className={styles.arrow}
            />
          </a>
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

                  <span className={`${styles.cardNumber} ${card.numberDark ? styles.cardNumberDark : ''}`}>
                    {card.number}
                  </span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardBody}>{card.body}</p>
              </div>

              <a href="#top" className={styles.cardLink}>
                <span>{readLabel}</span>
                <Image
                  src="/images/home/updates-arrow.svg"
                  alt=""
                  aria-hidden="true"
                  width={14}
                  height={14}
                  className={styles.arrow}
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
