import type { Metadata } from "next";

import {
  CtaSection,
  HeroSection,
  ToolsSection,
  UsageSection,
} from "./components";
import styles from "./page.module.scss";

/*export const metadata: Metadata = {
  title: 'Herramientas de trading y calculadoras de inversión | Silecta',
  description: 'Utiliza calculadoras de riesgo, costes y proyección de capital para analizar estrategias y condiciones de trading.',
};*/

export const metadata: Metadata = {
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
