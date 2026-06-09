//import type { Metadata } from "next";

import { AboutHero } from './components';
import { AboutResources } from './components';
import { AboutProcess } from './components';
import { AboutInformation } from './components';
import { AboutInvestigation } from './components';
import { AboutBroaderView } from './components';

/*export const metadata: Metadata = {
  title: 'Plataforma independiente de comparación de brokers | Silecta',
  description: 'Conoce cómo Silecta organiza información de brokers, herramientas y análisis del sector para facilitar la investigación.',
};*/

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
