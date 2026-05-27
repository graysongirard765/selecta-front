import localFont from 'next/font/local';

import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import 'react-toastify/dist/ReactToastify.css';
import '@/shared/lib/styles/null.scss';
import '@/shared/lib/styles/base.scss';

const generalSans = localFont({
  src: [
    {
      path: './fonts/GeneralSans-Extralight.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/GeneralSans-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/GeneralSans-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/GeneralSans-Italic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/GeneralSans-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/GeneralSans-MediumItalic.woff',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/GeneralSans-Semibold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/GeneralSans-SemiboldItalic.woff',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/GeneralSans-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/GeneralSans-BoldItalic.woff',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-general-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Silecta | Broker Discovery',
  description: 'Sign up and exchange BTC & ETH with Silecta. Explore a secure, fast, and transparent crypto exchange platform with simple verification and reliable transactions.',
  openGraph: {
    title: 'Silecta | Broker Discovery',
    description: 'Sign up and exchange BTC & ETH with Silecta. Explore a secure, fast, and transparent crypto exchange platform with simple verification and reliable transactions.',
    //images: 'https://selecta.com/images/meta.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={`${generalSans.variable} ${generalSans.className}`}>
        {children}
      </body>
    </html>
  );
}
