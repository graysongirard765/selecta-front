"use client";

import { useEffect, useState } from "react";

import type { PolicyDetail } from "@/features/policies";

import styles from "./PolicyContentSection.module.scss";

type PolicyContentSectionProps = {
  policy: PolicyDetail;
  tocLabel: string;
};

export const PolicyContentSection = ({
  policy,
  tocLabel,
}: PolicyContentSectionProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(
    policy.sections[0]?.id ?? null,
  );

  useEffect(() => {
    const sectionIds = policy.sections.map((section) => section.id);
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sectionElements.length === 0) {
      return;
    }

    const currentHash = window.location.hash.replace("#", "");
    if (currentHash && sectionIds.includes(currentHash)) {
      setTimeout(() => {
        setActiveSection(currentHash);
      }, 100);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) =>
              right.intersectionRatio - left.intersectionRatio ||
              left.boundingClientRect.top - right.boundingClientRect.top,
          );

        const nextActiveSection = visibleEntries[0]?.target.id;
        if (nextActiveSection) {
          setActiveSection(nextActiveSection);
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [policy.sections]);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.main}>
            {policy.introHtml ? (
              <article className={styles.card}>
                <div
                  className={styles.richText}
                  dangerouslySetInnerHTML={{ __html: policy.introHtml }}
                />
              </article>
            ) : null}

            {policy.sections.map((section) => (
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
                {policy.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`${styles.tocLink} ${
                      activeSection === section.id ? styles.tocLinkActive : ""
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
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
