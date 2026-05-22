import type { ArticleDetail } from "@/features/articles";

import styles from "./ArticleContentSection.module.scss";

type ArticleContentSectionProps = {
  article: ArticleDetail;
  tocLabel: string;
};

export const ArticleContentSection = ({
  article,
  tocLabel,
}: ArticleContentSectionProps) => {


  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.main}>
            {article.introHtml ? (
              <article className={styles.card}>
                <div
                  className={styles.richText}
                  dangerouslySetInnerHTML={{ __html: article.introHtml }}
                />
              </article>
            ) : null}

            {article.sections.map((section) => (
              <article key={section.id} id={section.id} className={styles.card}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <div
                  className={styles.richText}
                  dangerouslySetInnerHTML={{ __html: section.html }}
                />
              </article>
            ))}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.tocCard}>
              <nav className={styles.tocList} aria-label={tocLabel}>
                {article.sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className={styles.tocLink}>
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
