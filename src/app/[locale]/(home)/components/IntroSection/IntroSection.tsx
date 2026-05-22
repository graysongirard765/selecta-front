import { useTranslations } from 'next-intl';

import styles from './IntroSection.module.scss';

export const IntroSection = () => {
  const t = useTranslations('homePage');
  const step = t('introStep', { fallback: '01 / Inicio' });
  const title = t('introTitle', { fallback: 'Comienza con una vision mas clara' });
  const questionLineOne = t('introQuestionLineOne', {
    fallback: 'Cuando empiezas a buscar una empresa que te ofrezca un servicio',
  });
  const questionLineTwo = t('introQuestionLineTwo', {
    fallback: 'de inversion la primera pregunta suele ser:',
  });
  const questionHighlight = t('introQuestionHighlight', { fallback: 'Donde?' });
  const bodyPrimary = t('introBodyPrimary', {
    fallback:
      'Encontrar la respuesta normalmente implica gastar mucho tiempo en diferentes webs, buscar resenas y descripciones que muchas veces no alcanzamos a entender o desconocemos.',
  });
  const bodySecondary = t('introBodySecondary', {
    fallback:
      'En Selecta, te ayudamos a que la eleccion sea facil y comoda ayudandote durante todo el proceso para que puedas elegir con una vision mas clara antes de tomar una decision.',
  });
  const cta = t('introCta', { fallback: 'Encontrar un broker' });

  return (
    <section className={styles.section} id="intro">
      <div className="container">
        <div className={styles.heading}>
          <p className={styles.kicker}>{step}</p>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={styles.card}>
          <div className={styles.question}>
            <p>{questionLineOne}</p>
            <p>
              {questionLineTwo} <strong>{questionHighlight}</strong>
            </p>
          </div>

          <div className={styles.copy}>
            <p>{bodyPrimary}</p>
            <p>{bodySecondary}</p>
            <a href="#brokers" className={styles.link}>
              <span>{cta}</span>
              <span className={styles.linkArrow} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
