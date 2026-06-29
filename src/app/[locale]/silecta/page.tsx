import type { Metadata } from "next";

import { BrokerHero } from './components';
import { BrokerListings } from './components';
import { FindABrokerReviewing } from './components';
import { FindABrokerTools } from './components';
import { FindABrokerPlatformSelect } from './components';
import { FindABrokerPlatforms } from './components';

/*export const metadata: Metadata = {
  title: 'Comparador de brokers y plataformas de trading | Silecta',
  description: 'Explora brokers online, revisa plataformas de trading, compara costes, mercados y opiniones de usuarios en un entorno estructurado.',
};*/

export const metadata: Metadata = {
  alternates: {
    canonical: '/silecta',
  },
};

export default function FindABrokerPage() {
  return (
    <>
      <BrokerHero />
      <BrokerListings />
      <FindABrokerReviewing />
      <FindABrokerTools />
      <FindABrokerPlatformSelect />
      <FindABrokerPlatforms />
    </>
  );
}
