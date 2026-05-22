import styles from './ExploreSection.module.scss';

type ExploreSectionProps = {
  kicker: string;
  lead: string;
  body: string;
};

export const ExploreSection = ({ kicker, lead, body }: ExploreSectionProps) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <p className={styles.kicker}>{kicker}</p>
          <p className={styles.lead}>{lead}</p>
          <p className={styles.body}>{body}</p>
        </div>
      </div>
    </section>
  );
};
