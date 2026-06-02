import styles from './IntroSection.module.scss';

type IntroSectionProps = {
  kicker: string;
  title: string;
  body: string;
};

export const IntroSection = ({ kicker, title, body }: IntroSectionProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.circles} aria-hidden="true">
        <span className={styles.circleLarge} />
        <span className={styles.circleMedium} />
        <span className={styles.circleHighlight} />
        <span className={styles.circleHighlightInner} />
      </div>
      <div className="container">
        <div className={styles.content}>
          <p className={styles.kicker}>{kicker}</p>
          <h2 className={styles.title}>{title}</h2>

        </div>
      </div>
    </section>
  );
};
