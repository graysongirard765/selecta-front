import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import LocalCompoundingCalculator from '@/shared/ui/components/LocalCompoundingCalculator';

import styles from './CalculatorSection.module.scss';

export const CalculatorSection = () => {
  const t = useTranslations('homePage.calculator');

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.top}>
            <div className={styles.info}>
              <div className={styles.heading}>
                <p className={styles.kicker}>
                  {t('step', { fallback: '06 / Herramienta destacada' })}
                </p>
                <p className={styles.subtitle}>
                  {t('subtitle', { fallback: '¿Cuánto podría crecer tu inversión con el tiempo?' })}
                </p>
                <h2 className={styles.title}>{t('title', { fallback: 'Calculadora de inversión' })}</h2>
              </div>

              <div className={styles.description}>
                <p>
                  {t('bodyPrimary', {
                    fallback:
                      'Antes de elegir una plataforma de inversión, muchos usuarios quieren entender cómo podrían evolucionar sus ahorros a largo plazo. Esta calculadora permite explorar distintos escenarios utilizando un capital inicial, una rentabilidad estimada y un periodo de tiempo determinado.',
                  })}
                </p>
                <p>
                  {t('bodySecondary', {
                    fallback:
                      'Modifica los valores y observa cómo pequeños cambios pueden influir en el resultado final a lo largo de los años.',
                  })}
                </p>
              </div>
            </div>

            <div className={styles.calculator}>
              <LocalCompoundingCalculator />
            </div>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.footer}>
            <p className={styles.footerText}>
              {t('footer', {
                fallback:
                  'Las simulaciones pueden ayudar a comprender mejor el impacto del crecimiento compuesto y aportar una perspectiva adicional al comparar plataformas de inversión y servicios financieros.',
              })}
            </p>

            <Link href="/herramientas" className={styles.footerLink}>
              {t('cta', { fallback: 'Explorar más herramientas' })}
              <Image src="/icons/arrow-right.svg" alt="" width={14} height={14} loading="lazy" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
