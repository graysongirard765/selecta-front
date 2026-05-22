import {
  BrokersSection,
  ComparisonSection,
  ContactSection,
  DecisionSection,
  HeroSection,
  IntroSection,
  PlatformSection,
  ReviewsSection,
  UpdatesSection,
} from './components';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <IntroSection />
      <BrokersSection />
      <ComparisonSection />
      <ReviewsSection />
      <DecisionSection />
      <div className={styles.waveBand} aria-hidden="true" />
      <UpdatesSection />
      <PlatformSection />
      <ContactSection />
    </div>
  );
}
