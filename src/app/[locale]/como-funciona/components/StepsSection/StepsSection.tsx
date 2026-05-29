import styles from "./StepsSection.module.scss";

export type StepItem = {
  step: string;
  title: string;
  body: string;
  dark?: boolean;
  ctas?: readonly {
    label: string;
    href: string;
    filled?: boolean;
  }[];
  bullets?: readonly string[];
  bottomBody?: string;
};

type StepsSectionProps = {
  steps: readonly StepItem[];
};

export const StepsSection = ({ steps }: StepsSectionProps) => {
  return (
    <>
      {steps.map((item, index) => (
        <section
          key={item.step}
          className={`${styles.section} ${
            item.dark ? styles.sectionDark : styles.sectionLight
          }`}
        >
          <div className="container">
            <div className={styles.shell}>
              <p className={styles.kicker}>{item.step}</p>
              <div className={styles.columns}>
                <div className={styles.numberWrap} aria-hidden="true">
                  <span className={styles.number}>{`0${index + 1}`}</span>
                </div>

                <div className={styles.content}>
                  <h2 className={styles.title}>{item.title}</h2>
                  <div className={styles.body} dangerouslySetInnerHTML={{ __html: item.body }} />

                  {item.bullets ? (
                    <div className={styles.list}>
                      {item.bullets.map((bullet) => (
                        <div key={bullet} className={styles.listItem}>
                          <span className={styles.listDot} />
                          <span className={styles.listText}>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {item.bottomBody ? (
                    <div className={styles.body} dangerouslySetInnerHTML={{ __html: item.bottomBody }} />
                  ) : null}

                  {item.ctas ? (
                    <div className={styles.actions}>
                      {item.ctas.map((cta) => (
                        <a
                          key={cta.label}
                          href={cta.href}
                          className={`${styles.button} ${
                            cta.filled
                              ? styles.buttonFilled
                              : styles.buttonOutline
                          }`}
                        >
                          <span>{cta.label}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M2.91663 6.99984H11.0833M7.58329 2.9165L11.6666 6.99984L7.58329 11.0832"
                              stroke="#1E2218"
                              strokeWidth="1.16667"
                              strokeLinecap="round"
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};
