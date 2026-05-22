import {
  ArticlesSection,
  ExploreSection,
  HeroSection,
  ServicesSection,
} from "./components";
import styles from "./page.module.scss";

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
