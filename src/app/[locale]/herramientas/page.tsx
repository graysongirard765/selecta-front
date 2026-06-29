import type { Metadata } from "next";

import {
  CtaSection,
  HeroSection,
  ToolsSection,
  UsageSection,
} from "./components";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: 'Silecta | Calculadoras y herramientas para invertir',
  description:
    'Explora calculadoras de inversión, simuladores y herramientas analíticas para comprender diferentes escenarios financieros y apoyar tu investigación.',
  alternates: {
    canonical: '/herramientas',
  },
};

export default function ToolsPage() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <ToolsSection />
      <UsageSection />
      <CtaSection />
    </div>
  );
}
