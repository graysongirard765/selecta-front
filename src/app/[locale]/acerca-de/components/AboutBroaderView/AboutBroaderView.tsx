import Link from 'next/link';

import { useTranslations } from 'next-intl';

import styles from './AboutBroaderView.module.scss';

export const AboutBroaderView = () => {
  const t = useTranslations('AboutPageBroaderView');
  const subtitle = t('subtitle', {
    fallback: 'Una visión más amplia del entorno de trading',
  });
  const title = t('title', {
    fallback:
      'Los servicios de trading continúan cambiando a medida que evoluciona la tecnología de trading y se amplía el acceso al mercado.',
  });
  const description = t('description', {
    fallback:
      'Las plataformas introducen nuevos instrumentos, actualizan el software de trading y ajustan las características de las cuentas con el tiempo. Seguir estos desarrollos puede proporcionar contexto adicional al revisar las plataformas de corretaje y sus entornos operativos.',
  });

  const rightSubtitle = t('rightSubtitle', {
    fallback: 'Seguir explorando',
  });

  const rightDesciption = t('rightDesciption', {
    fallback:
      'Si necesitas aclaraciones mientras exploras plataformas, bancos, Etf o utilizas sus herramientas analíticas, puedes ponerte en contacto a través de la página de contacto.',
  });

  const linkTitle = t('linkTitle', {
    fallback: 'Ir a Contacto',
  });

  return (
    <section className={styles.about_broader}>
      <div className="container">
        <div className={styles.about_broader__row}>
          <div>
            <p className={styles.about_broader__subtitle}>{subtitle}</p>
            <h2 className={styles.about_broader__title}>{title}</h2>
            <p className={styles.about_broader__description}>{description}</p>
          </div>

          <div>
            <p className={styles.about_broader__right_subtitle}>{rightSubtitle}</p>
            <p className={styles.about_broader__right_description}>{rightDesciption}</p>
            <Link className={styles.about_broader__link} href={'/contacto'}>
              {linkTitle} <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
