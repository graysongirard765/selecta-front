import type { Metadata } from "next";

import { ContactDetailsSection, HeroSection } from "./components";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: 'Silecta | Contacto y soporte',
  description:
    'Contacta con el equipo de Silecta para resolver dudas sobre la plataforma, sus herramientas y la información disponible en el sitio.',
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
