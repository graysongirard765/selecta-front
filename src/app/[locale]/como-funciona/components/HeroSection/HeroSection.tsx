import styles from './HeroSection.module.scss';

type HeroSectionProps = {
  kicker: string;
  title: string;
  description: string;
};

export const HeroSection = ({ kicker, title, description }: HeroSectionProps) => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className="container">
        <div className={styles.content}>
          <p className={styles.kicker}>{kicker}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </section>
  );
};
