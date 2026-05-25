import {
  CtaSection,
  HeroSection,
  ToolsSection,
  UsageSection,
} from "./components";
import styles from "./page.module.scss";

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
