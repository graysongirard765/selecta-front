import { ContactDetailsSection, HeroSection } from "./components";
import styles from "./page.module.scss";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <ContactDetailsSection />
    </div>
  );
}
