import type { Metadata } from "next";

import { AboutHero } from './components';
import { AboutResources } from './components';
import { AboutProcess } from './components';
import { AboutInformation } from './components';
import { AboutInvestigation } from './components';
import { AboutBroaderView } from './components';

export const metadata: Metadata = {
  title: 'Silecta | Plataforma independiente de investigación financiera',
  description:
    'Conoce Silecta, una plataforma independiente que organiza información, herramientas y recursos para explorar servicios financieros con mayor claridad.',
  alternates: {
    canonical: '/acerca-de',
  },
};

export default function FindABrokerPage() {
  return (
    <>
      <AboutHero />
      <AboutResources />
      <AboutProcess />
      <AboutInformation />
      <AboutInvestigation />
      <AboutBroaderView />
    </>
  );
}
