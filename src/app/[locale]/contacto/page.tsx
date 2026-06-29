import type { Metadata } from "next";

import { ContactDetailsSection, HeroSection } from "./components";
import styles from "./page.module.scss";

/*export const metadata: Metadata = {
  title: 'Contacto y soporte sobre brokers y plataformas | Silecta',
  description: 'Contacta con el equipo de Silecta para resolver dudas sobre brokers, plataformas de trading y herramientas analíticas.',
};*/

export const metadata: Metadata = {
  alternates: {
    canonical: '/contacto',
  },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <ContactDetailsSection />
    </div>
  );
}
