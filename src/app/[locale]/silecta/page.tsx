import type { Metadata } from "next";

import { BrokerHero } from './components';
import { BrokerListings } from './components';
import { FindABrokerReviewing } from './components';
import { FindABrokerTools } from './components';
import { FindABrokerPlatformSelect } from './components';
import { FindABrokerPlatforms } from './components';

export const metadata: Metadata = {
  title: 'Silecta | Explora plataformas de inversión y servicios financieros',
  description:
    'Consulta perfiles de plataformas de inversión, compara características, mercados, herramientas y servicios dentro de una estructura clara e independiente.',
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
