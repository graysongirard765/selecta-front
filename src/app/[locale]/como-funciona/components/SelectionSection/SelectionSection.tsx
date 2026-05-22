import styles from './SelectionSection.module.scss';

type SelectionSectionProps = {
  kicker: string;
  body: string;
};

export const SelectionSection = ({ kicker, body }: SelectionSectionProps) => {
  return (
    <>
      <section className={styles.image} aria-hidden="true" />

      <section className={styles.textSection}>
        <div className="container">
          <div className={styles.content}>
            <span className={styles.divider} />
            <p className={styles.kicker}>{kicker}</p>
            <p className={styles.body}>{body}</p>
          </div>
        </div>
      </section>
    </>
  );
};
