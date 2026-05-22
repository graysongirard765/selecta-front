import Image from "next/image";

import styles from "./ArticleHeroSection.module.scss";

import { Link } from "@/i18n/navigation";

type ArticleHeroSectionProps = {
  title: string;
  backLabel: string;
};

export const ArticleHeroSection = ({
  title,
  backLabel,
}: ArticleHeroSectionProps) => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.content}>
          <Link href="/actualizaciones-del-sector" className={styles.backLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M11.083 7.00001H2.91634M6.41634 11.0833L2.33301 7.00001L6.41634 2.91668"
                stroke="white"
                strokeWidth="1.16667"
                strokeLinecap="round"
              />
            </svg>
            <span>{backLabel}</span>
          </Link>

          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>
    </section>
  );
};
