import { useTranslations } from 'next-intl';

type BrokerCard = {
  key: 'tradeRepublic' | 'degiro' | 'musenova' | 'capital' | 'etoro';
  name: string;
  description: string;
  badge: string;
  logo: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  specs: readonly {
    label: string;
    value: string;
  }[];
  tags: readonly string[];
  dark?: boolean;
  large?: boolean;
  rating?: string;
  link?: string;
  trustpilot?: string;
};

export const useBrokersData = () => {
  const t = useTranslations('homePage.brokers');

  const cards: readonly BrokerCard[] = [
    {
      key: 'tradeRepublic',
      name: t('tradeRepublic.name', { fallback: 'Trade republic' }),
      description: t('tradeRepublic.description', {
        fallback: 'Bróker de inversión para particulares',
      }),
      badge: t('tradeRepublic.badge', { fallback: 'Verificado' }),
      logo: '/images/home/brokers/trade-republic.svg',
      logoAlt: 'Trade Republic',
      logoWidth: 56,
      logoHeight: 22,
      specs: [
        {
          label: t('labels.markets', { fallback: 'Mercados' }),
          value: t('tradeRepublic.markets', { fallback: 'Acciones · ETFs · Bonos' }),
        },
      ],
      tags: [
        t('tradeRepublic.tag1', { fallback: 'Inversión periódica' }),
        t('tradeRepublic.tag2', { fallback: 'App móvil' }),
        t('tradeRepublic.tag3', { fallback: 'Fraccionadas' }),
      ],
      rating: t('tradeRepublic.rating', { fallback: '4.8 · 12,4k reseñas' }),
      dark: true,
      large: true,
      link: 'https://traderepublic.com/',
      trustpilot: 'https://es.trustpilot.com/review/www.traderepublic.com',
    },

    {
      key: 'degiro',
      name: t('degiro.name', { fallback: 'Degiro' }),
      description: t('degiro.description', {
        fallback: 'Plataforma para inversores independientes',
      }),
      badge: t('degiro.badge', { fallback: 'Verificado' }),
      logo: '/images/home/brokers/degiro.svg',
      logoAlt: 'Degiro',
      logoWidth: 72,
      logoHeight: 10,
      specs: [
        {
          label: t('labels.markets', { fallback: 'Mercados' }),
          value: t('degiro.markets', { fallback: 'Acciones · ETFs · Fondos' }),
        },
      ],
      tags: [
        t('degiro.tag1', { fallback: 'Mercados globales' }),
        t('degiro.tag2', { fallback: 'Largo plazo' }),
        t('degiro.tag3', { fallback: 'Análisis' }),
      ],
      large: true,
      link: 'https://www.degiro.com/',
      trustpilot: 'https://www.trustpilot.com/review/www.degiro.com',
    },

    {
      key: 'musenova',
      name: t('musenova.name', { fallback: 'Musenova' }),
      description: t('musenova.description', { fallback: 'Plataforma multiactivo' }),
      badge: t('musenova.badge', { fallback: 'Verificado' }),
      logo: '/images/home/brokers/musenova.svg',
      logoAlt: 'Musenova',
      logoWidth: 84,
      logoHeight: 16,
      specs: [
        {
          label: t('labels.markets', { fallback: 'Mercados' }),
          value: t('musenova.markets', { fallback: 'Forex · Acciones · Cripto' }),
        },
      ],
      tags: [
        t('musenova.tag1', { fallback: 'Copy trading' }),
        t('musenova.tag2', { fallback: 'Analítica' }),
        t('musenova.tag3', { fallback: '24/7' }),
      ],
      link: 'https://www.musenova.live/',
      trustpilot: 'https://www.trustpilot.com/review/www.musenova.live',
    },

    {
      key: 'capital',
      name: t('capital.name', { fallback: 'Capital.com' }),
      description: t('capital.description', { fallback: 'Bróker digital internacional' }),
      badge: t('capital.badge', { fallback: 'Verificado' }),
      logo: '/images/home/brokers/capital.svg',
      logoAlt: 'Capital.com',
      logoWidth: 87,
      logoHeight: 16,
      specs: [
        {
          label: t('labels.markets', { fallback: 'Mercados' }),
          value: t('capital.markets', { fallback: 'Acciones · CFDs · Forex' }),
        },
      ],
      tags: [
        t('capital.tag1', { fallback: 'Educación' }),
        t('capital.tag2', { fallback: 'Herramientas' }),
        t('capital.tag3', { fallback: 'Móvil' }),
      ],
      link: 'https://capital.com/',
      trustpilot: 'https://www.trustpilot.com/review/capital.com',
    },

    {
      key: 'etoro',
      name: t('etoro.name', { fallback: 'Etoro' }),
      description: t('etoro.description', { fallback: 'Plataforma de inversión social' }),
      badge: t('etoro.badge', { fallback: 'Verificado' }),
      logo: '/images/home/brokers/etoro.svg',
      logoAlt: 'Etoro',
      logoWidth: 52,
      logoHeight: 16,
      specs: [
        {
          label: t('labels.markets', { fallback: 'Mercados' }),
          value: t('etoro.markets', { fallback: 'Acciones · ETFs · Cripto' }),
        },
      ],
      tags: [
        t('etoro.tag1', { fallback: 'Copy trading' }),
        t('etoro.tag2', { fallback: 'Comunidad' }),
        t('etoro.tag3', { fallback: 'Fraccionadas' }),
      ],
      link: 'https://www.etoro.com/',
      trustpilot: 'https://www.trustpilot.com/review/www.etoro.com',
    },
  ] as const;

  return { cards };
};
