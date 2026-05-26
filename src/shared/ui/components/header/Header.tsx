'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useLocale, useTranslations } from 'next-intl';

import { WEBSITE_EMAIL } from '@/shared/lib/constants/constants';

import styles from './Header.module.scss';

import { Link, usePathname } from '@/i18n/navigation';

type NavItem = {
  href: string;
  label: string;
  hasCaret?: boolean;
  isRoute?: boolean;
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('header');
  const homePrefix = locale === 'es' ? '' : `/${locale}`;
  const homeAnchor = (hash: string) => `${homePrefix}/#${hash}`;
  const howItWorksHref = `${homePrefix}/como-funciona`;
  const updatesHref = `${homePrefix}/actualizaciones-del-sector`;
  const toolsHref = `${homePrefix}/herramientas`;
  const aboutHref = `${homePrefix}/acerca-de`;

  const navItems: readonly NavItem[] = [
    {
      href: howItWorksHref,
      label: t('howItWorks', { fallback: 'Como funciona' }),
      isRoute: true,
    },
    {
      href: updatesHref,
      label: t('updates', { fallback: 'Actualizaciones del sector' }),
      isRoute: true,
    },
    { href: toolsHref, label: t('tools', { fallback: 'Herramientas' }), isRoute: true },
    { href: aboutHref, label: t('about', { fallback: 'Acerca de' }) },
  ] as const;

  const contactLabel = t('contact', { fallback: 'Contacto' });
  const ctaLabel = t('findBroker', { fallback: 'Encontrar un broker' });

  useEffect(() => {
    //setIsOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.notice}>
        <div className="container">
          <div className={styles.noticeInner}>
            <a href={`mailto:${WEBSITE_EMAIL}`} className={styles.noticeEmail}>
              {WEBSITE_EMAIL}
            </a>

            <button type="button" className={styles.localeButton} aria-label="Language selector">
              <span>{locale.toUpperCase()}</span>
              <span className={styles.localeCaret} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.desktopBar}>
        <div className="container">
          <div className={styles.desktopShell}>
            <Link href="/" className={styles.brand} aria-label="Selecta">
              <Image src="/images/logo.svg" alt="Selecta" width={97} height={29} />
            </Link>

            <nav className={styles.nav} aria-label={t('navLabel', { fallback: 'Main navigation' })}>
              {navItems.map((item) =>
                item.isRoute ? (
                  <Link key={item.href} href={item.href} className={styles.navItem}>
                    <span>{item.label}</span>
                    {item.hasCaret ? <span className={styles.navCaret} aria-hidden="true" /> : null}
                  </Link>
                ) : (
                  <a key={item.href} href={item.href} className={styles.navItem}>
                    <span>{item.label}</span>
                    {item.hasCaret ? <span className={styles.navCaret} aria-hidden="true" /> : null}
                  </a>
                )
              )}
            </nav>

            <div className={styles.actions}>
              <a href={homeAnchor('contact')} className={styles.contactAction}>
                {contactLabel}
              </a>

              <a href={homeAnchor('brokers')} className={styles.primaryAction}>
                <span>{ctaLabel}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M13.3333 14.1667L17.5 10L13.3333 5.83334M17.5 10H2.5"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mobileBar}>
        <div className={styles.mobileShell}>
          <Link href="/" className={styles.brand} aria-label="Selecta">
            <span className={styles.brandMark}>
              <span className={styles.brandDot} />
            </span>
            <span className={styles.brandText}>Selecta</span>
          </Link>

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={t('menu', { fallback: 'Menu' })}
          >
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
            <span className={`${styles.menuLine} ${styles.menuLineShort}`} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobilePanel} ${isOpen ? styles.mobilePanelOpen : ''}`}
      >
        <div className="container">
          <div className={styles.mobileInner}>
            <nav className={styles.mobileNav}>
              {navItems.map((item) =>
                item.isRoute ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.mobileLink}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.label}</span>
                    {item.hasCaret ? <span className={styles.navCaret} aria-hidden="true" /> : null}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className={styles.mobileLink}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.label}</span>
                    {item.hasCaret ? <span className={styles.navCaret} aria-hidden="true" /> : null}
                  </a>
                )
              )}
            </nav>

            <div className={styles.mobileActions}>
              <a
                href={homeAnchor('contact')}
                className={styles.contactAction}
                onClick={() => setIsOpen(false)}
              >
                {contactLabel}
              </a>

              <a
                href={homeAnchor('brokers')}
                className={styles.primaryAction}
                onClick={() => setIsOpen(false)}
              >
                <span>{ctaLabel}</span>
                <span className={styles.actionArrow} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
