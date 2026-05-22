import fs from 'fs/promises';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import path from 'path';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`);
  const messages = JSON.parse(await fs.readFile(messagesPath, 'utf8'));

  return {
    locale,
    messages,
  };
});
