import { useTranslations } from 'next-intl';

import { StockHeatmap } from '@/shared/ui/components';

import styles from './HeatmapSection.module.scss';

export const HeatmapSection = () => {
  const t = useTranslations('homePage.heatmap');

  return (
    <section id="heatmap" className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <p className={styles.step}>{t('step', { fallback: '04 / Heat Map' })}</p>
          <h2 className={styles.title}>
            {t('title', { fallback: 'Qué está ocurriendo en el mercado ahora' })}
          </h2>
        </div>

        <p className={styles.description}>
          {t('description', {
            fallback:
              'El heat map permite visualizar rápidamente qué activos, sectores o mercados están registrando mayor actividad y cómo se distribuyen los movimientos dentro del mercado.',
          })}
        </p>

        <div className={styles.frame}>
          <span className={styles.divider} aria-hidden="true" />
          <div className={styles.widget}>
            <StockHeatmap />
          </div>
        </div>
      </div>
    </section>
  );
};
