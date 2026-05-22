import Image from 'next/image';

import { useTranslations } from 'next-intl';

import styles from './BrokersSection.module.scss';

type BrokerCard = {
  key: 'tradeRepublic' | 'jadeTrax' | 'swissquote' | 'revolut' | 'xtb' | 'fxpro';
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
};

export const BrokersSection = () => {
  const t = useTranslations('homePage.brokers');

  const cards: readonly BrokerCard[] = [
    {
      key: 'tradeRepublic',
      name: t('tradeRepublic.name', { fallback: 'Trade republic' }),
      description: t('tradeRepublic.description', { fallback: 'Broker global · EU · UK' }),
      badge: t('tradeRepublic.badge', { fallback: 'Verificado' }),
      logo: '/images/home/brokers/trade-republic.svg',
      logoAlt: 'Trade Republic',
      logoWidth: 80,
      logoHeight: 22,
      specs: [
        {
          label: t('labels.markets', { fallback: 'Mercados' }),
          value: t('tradeRepublic.markets', { fallback: 'Forex · Acciones · Cripto · ETFs' }),
        },
        {
          label: t('labels.platform', { fallback: 'Plataforma' }),
          value: t('tradeRepublic.platform', { fallback: 'Web · Móvil · Escritorio' }),
        },
        {
          label: t('labels.fees', { fallback: 'Comisiones' }),
          value: t('tradeRepublic.fees', { fallback: 'Desde 0,0 pips · 0€ custodia' }),
        },
      ],
      tags: [
        t('tradeRepublic.tagRegulated', { fallback: 'Regulado' }),
        t('tradeRepublic.tagFastExecution', { fallback: 'Ejecución rápida' }),
        t('tradeRepublic.tagApi', { fallback: 'API' }),
      ],
      rating: t('tradeRepublic.rating', { fallback: '4.8 · 12,4k reseñas' }),
      dark: true,
      large: true,
    },
    {
      key: 'jadeTrax',
      name: t('jadeTrax.name', { fallback: 'JadeTrax' }),
      description: t('jadeTrax.description', { fallback: 'Banco + broker · ES' }),
      badge: t('jadeTrax.badge', { fallback: 'Verificado' }),
      logo: '/images/home/brokers/jadetrax.svg',
      logoAlt: 'JadeTrax',
      logoWidth: 69,
      logoHeight: 16,
      specs: [
        {
          label: t('labels.markets', { fallback: 'Mercados' }),
          value: t('jadeTrax.markets', { fallback: 'Acciones · Fondos · Bonos' }),
        },
      ],
      tags: [
        t('jadeTrax.tagLongTerm', { fallback: 'Largo plazo' }),
        t('jadeTrax.tagRoboAdvisor', { fallback: 'Robo-advisor' }),
      ],
    },
    {
      key: 'swissquote',
      name: t('swissquote.name', { fallback: 'Swissquote' }),
      description: t('swissquote.description', { fallback: 'Broker · Acciones · ES' }),
      badge: t('swissquote.badge', { fallback: 'Verificado' }),
      logo: '/images/home/brokers/swissquote.svg',
      logoAlt: 'Swissquote',
      logoWidth: 78,
      logoHeight: 16,
      specs: [
        {
          label: t('labels.markets', { fallback: 'Mercados' }),
          value: t('swissquote.markets', { fallback: 'Acciones · ETFs · Planes' }),
        },
      ],
      tags: [
        t('swissquote.tagZeroFee', { fallback: '0€ compra' }),
        t('swissquote.tagFractional', { fallback: 'Fraccionadas' }),
      ],
    },
    {
      key: 'revolut',
      name: t('revolut.name', { fallback: 'Revolut' }),
      description: t('revolut.description', { fallback: 'Plataforma · Multi-mercado' }),
      badge: t('revolut.badge', { fallback: 'Verificado' }),
      logo: '/images/home/brokers/revolut.svg',
      logoAlt: 'Revolut',
      logoWidth: 98,
      logoHeight: 22,
      specs: [
        {
          label: t('labels.markets', { fallback: 'Mercados' }),
          value: t('revolut.markets', { fallback: 'Forex · CFDs · Cripto' }),
        },
      ],
      tags: [
        t('revolut.tagCopyTrading', { fallback: 'Copy trading' }),
        t('revolut.tagAnalytics', { fallback: 'Analítica' }),
        t('revolut.tagAlwaysOn', { fallback: '24/7' }),
      ],
    },
    {
      key: 'xtb',
      name: t('xtb.name', { fallback: 'XTB' }),
      description: t('xtb.description', { fallback: 'Banco privado · Global' }),
      badge: t('xtb.badge', { fallback: 'Verificado' }),
      logo: '/images/home/brokers/xtb.svg',
      logoAlt: 'XTB',
      logoWidth: 72,
      logoHeight: 22,
      specs: [
        {
          label: t('labels.markets', { fallback: 'Mercados' }),
          value: t('xtb.markets', { fallback: 'Acciones · Fondos · Alternativos' }),
        },
      ],
      tags: [
        t('xtb.tagHighNetWorth', { fallback: 'Alta cartera' }),
        t('xtb.tagDedicatedAdvisor', { fallback: 'Asesor dedicado' }),
      ],
    },
    {
      key: 'fxpro',
      name: t('fxpro.name', { fallback: 'FxPro' }),
      description: t('fxpro.description', { fallback: 'Broker retail · UE' }),
      badge: t('fxpro.badge', { fallback: 'Verificado' }),
      logo: '/images/home/brokers/fxpro.png',
      logoAlt: 'FxPro',
      logoWidth: 25,
      logoHeight: 25,
      specs: [
        {
          label: t('labels.markets', { fallback: 'Mercados' }),
          value: t('fxpro.markets', { fallback: 'Acciones · Cripto · Derivados' }),
        },
      ],
      tags: [
        t('fxpro.tagCommunity', { fallback: 'Comunidad' }),
        t('fxpro.tagEducation', { fallback: 'Educación' }),
      ],
    },
  ] as const;

  return (
    <section className={styles.section} id="brokers">
      <div className="container">
        <div className={styles.heading}>
          <p className={styles.kicker}>{t('step', { fallback: '02 / Entender' })}</p>
          <h2 className={styles.title}>
            {t('titleLine1', { fallback: 'Conoce tus opciones' })}
            <br />
            {t('titleLine2', { fallback: 'reales a la hora de decidir.' })}
          </h2>
        </div>

        <div className={styles.grid}>
          {cards.map((card) => (
            <article
              key={card.key}
              className={[
                styles.card,
                styles[`card${card.key[0].toUpperCase()}${card.key.slice(1)}`],
                card.dark ? styles.cardDark : '',
                card.large ? styles.cardLarge : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className={styles.cardTop}>
                <div className={styles.logoBadge}>
                  <Image
                    src={card.logo}
                    alt={card.logoAlt}
                    width={card.logoWidth}
                    height={card.logoHeight}
                    className={styles.logoImage}
                  />
                </div>

                <div className={styles.verified}>
                  <span className={styles.verifiedDot} />
                  <span>{card.badge}</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{card.name}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>

              <div className={styles.specs}>
                {card.specs.map((spec) => (
                  <div key={`${card.key}-${spec.label}`} className={styles.specRow}>
                    <span className={styles.specLabel}>{spec.label}</span>
                    <strong className={styles.specValue}>{spec.value}</strong>
                  </div>
                ))}
              </div>

              <div className={styles.tags}>
                {card.tags.map((tag) => (
                  <span key={`${card.key}-${tag}`} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {card.rating ? (
                <div className={styles.ratingRow}>
                  <span className={styles.ratingStars}>★★★★★</span>
                  <span className={styles.ratingText}>{card.rating}</span>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <p className={styles.footerNote}>
          {t('closing', {
            fallback:
              'Determina si alguna de estas compañías puede cubrir tus necesidades informándote de una forma clara, rápida y precisa. Consulta sus servicios, costes y productos en un solo clic.',
          })}
        </p>
      </div>
    </section>
  );
};
