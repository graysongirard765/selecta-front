import type { Metadata } from 'next';

import {
  BrokersSection,
  CalculatorSection,
  ComparisonSection,
  ContactSection,
  DecisionSection,
  HeatmapSection,
  HeroSection,
  IntroSection,
  PlatformSection,
  ReviewsSection,
  UpdatesSection,
} from './components';
import styles from './page.module.scss';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <IntroSection />
      <BrokersSection />
      <ComparisonSection />
      <HeatmapSection />
      <ReviewsSection />
      <DecisionSection />
      <CalculatorSection />
      <div className={styles.waveBand} aria-hidden="true" />
      <UpdatesSection />
      <PlatformSection />
      <ContactSection />
    </div>
  );
}
