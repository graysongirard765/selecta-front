import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getPolicy } from "@/features/policies";

import { PolicyContentSection, PolicyHeroSection } from "../policies/components";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  alternates: {
    canonical: "/politica-de-privacidad",
  },
};

type PrivacyPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const t = await getTranslations("policyPage");
  const policy = await getPolicy({
    slug: "politica-de-privacidad",
    locale,
  });

  if (!policy) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <PolicyHeroSection
        title={policy.title}
      />
      <PolicyContentSection
        policy={policy}
        tocLabel={t("toc", { fallback: "Table of contents" })}
      />
    </div>
  );
}
