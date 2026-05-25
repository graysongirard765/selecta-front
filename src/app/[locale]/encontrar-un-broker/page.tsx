import { BrokerHero } from './components';
import { BrokerListings } from './components';
import { FindABrokerReviewing } from './components';
import { FindABrokerTools } from './components';
import { FindABrokerPlatformSelect } from './components';
import { FindABrokerPlatforms } from './components';

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
