import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import LocalCompoundingCalculator from '@/shared/ui/components/LocalCompoundingCalculator';

import styles from './FindABrokerTools.module.scss';

export const FindABrokerTools = () => {
  const t = useTranslations('FindABrokerPageTools');
  const title = t('title', { fallback: 'Herramientas para una elección adecuada' });
  const description = t('description', {
    fallback:
      'Además de los listados de las compañías que ofrecen mejores condiciones de trading y el entorno de la plataforma desde una perspectiva diferente.',
  });
  const link = t('link', {
    fallback: 'Explorar herramientas',
  });

  return (
    <section className={styles.find_broker_tools}>
      <div className="container">
        <div className={styles.find_broker_tools__inner}>
          <div>
            <h2 className={styles.find_broker_tools__title}>{title}</h2>
            <p className={styles.find_broker_tools__description}>{description}</p>
            <Link href={'/herramientas'} className={styles.find_broker_tools__link}>
              {link}
              <Image
                src={`/icons/arrow-right.svg`}
                alt="Image"
                width={14}
                height={14}
                loading="lazy"
              />
            </Link>
          </div>

          <div className={styles.find_broker_tools__right}>
            <LocalCompoundingCalculator />
          </div>
        </div>
      </div>
    </section>
  );
};
