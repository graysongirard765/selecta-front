import type { MetadataRoute } from 'next';

import { getArticleSlugs } from '@/features/articles';
import { SITE_URL } from '@/shared/lib/constants/constants';

const staticRoutes = [
  '/',
  '/silecta',
  '/como-funciona',
  '/herramientas',
  '/actualizaciones-del-sector',
  '/acerca-de',
  '/contacto',
  '/terminos-y-condiciones',
  '/politica-de-privacidad',
  '/politica-de-cookies',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = getArticleSlugs().map((slug) => ({
    url: `${SITE_URL}/actualizaciones-del-sector/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
