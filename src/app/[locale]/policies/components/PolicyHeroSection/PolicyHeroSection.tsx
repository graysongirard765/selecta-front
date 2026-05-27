import styles from "./PolicyHeroSection.module.scss";


type PolicyHeroSectionProps = {
  title: string;
};

export const PolicyHeroSection = ({
  title,
}: PolicyHeroSectionProps) => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.content}>

          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>
    </section>
  );
};
