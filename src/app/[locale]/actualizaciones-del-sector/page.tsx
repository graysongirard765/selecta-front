//import type { Metadata } from "next";

import {
  ArticlesSection,
  ExploreSection,
  HeroSection,
  ServicesSection,
} from "./components";
import styles from "./page.module.scss";

/*export const metadata: Metadata = {
  title: 'Noticias y actualizaciones sobre brokers y trading | Silecta',
  description: 'Mantente al día sobre plataformas de trading, cambios en brokers, herramientas analíticas y evolución del mercado financiero.',
};*/

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
