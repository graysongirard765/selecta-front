import type { Metadata } from "next";

import {
  ArticlesSection,
  ExploreSection,
  HeroSection,
  ServicesSection,
} from "./components";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: 'Silecta | Actualizaciones sobre inversión y mercados financieros',
  description:
    'Mantente informado sobre plataformas de inversión, innovación financiera, herramientas, tendencias del mercado y novedades del sector.',
  alternates: {
    canonical: '/actualizaciones-del-sector',
  },
};

export default async function SectorUpdatesPage() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <ArticlesSection />
      <ServicesSection />
      <ExploreSection />
    </div>
  );
}
