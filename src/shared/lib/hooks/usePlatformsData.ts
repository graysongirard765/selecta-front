import { useTranslations } from 'next-intl';

export interface PlatformsData {
  key: string;
  image: string;
  alt: string;
  label: string;
  number: string;
  title: string;
  body: string;
  numberDark?: boolean;
}

export const usePlatformsData = () => {
  const t = useTranslations('homePage.updates');

  const cards: readonly PlatformsData[] = [
    {
      key: 'article01',
      image: '/images/home/articles/article-01.jpg',
      alt: t('article01.alt', {
        fallback: 'Invierte a largo y corto plazo.',
      }),
      label: t('article01.label', {
        fallback: 'Artículo 01',
      }),
      number: '01',
      title: t('article01.title', {
        fallback: 'Invierte a largo y corto plazo.',
      }),
      body: t('article01.body', {
        fallback:
          'Elige una Plataforma que te permita adaptar tu inversión en función de tus necesidades ya sean a largo o corto plazo que aumente tus posibilidades de obtener rentabilidad.',
      }),
    },

    {
      key: 'article02',
      image: '/images/home/articles/article-02.jpg',
      alt: t('article02.alt', {
        fallback: 'Realiza aportaciones o reinvierte beneficios con comodidad.',
      }),
      label: t('article02.label', {
        fallback: 'Artículo 02',
      }),
      number: '02',
      title: t('article02.title', {
        fallback: 'Realiza aportaciones o reinvierte beneficios con comodidad.',
      }),
      body: t('article02.body', {
        fallback:
          'Las herramientas analíticas ayudan a los inversores a revisar características clave de las plataformas, como los costes de tarifas, las condiciones y el tiempo de ejecución.',
      }),
    },

    {
      key: 'article03',
      image: '/images/home/articles/article-03.jpg',
      alt: t('article03.alt', {
        fallback: 'Invierte y paga comisiones bajas por ello.',
      }),
      label: t('article03.label', {
        fallback: 'Artículo 03',
      }),
      number: '03',
      numberDark: true,
      title: t('article03.title', {
        fallback: 'Invierte y paga comisiones bajas por ello.',
      }),
      body: t('article03.body', {
        fallback:
          'El activo más rentable es pagar comisiones bajas por realizar tu inversión, no puedes controlar si el mercado sube o baja, pero si puedes controlar lo que pagas por ello.',
      }),
    },
  ] as const;

  const readLabel = t('readArticle', {
    fallback: 'Leer artículo',
  });

  return {
    cards,
    readLabel,
  };
};
