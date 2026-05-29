import { notFound } from "next/navigation";

import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { Footer, Header } from "@/shared/ui/components";
import { Preloader } from "@/shared/ui/components/preloader/Preloader";

import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <Preloader />
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
