'use client';

import { useEffect, useRef, useState } from 'react';

import { useLocale } from 'next-intl';

import styles from './LangSelector.module.scss';

import { routing } from '@/i18n/routing';

const LOCALE_LABELS: Record<string, string> = {
  es: 'ES',
  en: 'EN',
};

function getPathnameWithoutLocale(pathname: string, locales: readonly string[]): string {
  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/');
  const first = segments[0];

  if (first && locales.includes(first)) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }

  return pathname || '/';
}

function getLocalePath(pathWithoutLocale: string, newLocale: string): string {
  const path = pathWithoutLocale === '/' ? '' : pathWithoutLocale;

  if (newLocale === routing.defaultLocale) {
    return path || '/';
  }

  return `/${newLocale}${path}`;
}

type LangSelectorProps = {
  compact?: boolean;
  inMobileMenu?: boolean;
};

export const LangSelector = ({
  compact = false,
  inMobileMenu = false,
}: LangSelectorProps) => {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const locales = routing.locales.filter((loc) => LOCALE_LABELS[loc]);
  const currentLabel = LOCALE_LABELS[locale] ?? locale;
  const dropdownLocales = locales.filter((loc) => loc !== locale);

  const handleChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
    const pathWithoutLocale = getPathnameWithoutLocale(pathname, locales);
    const newPath = getLocalePath(pathWithoutLocale, newLocale);

    if (typeof window !== 'undefined') {
      window.location.assign(newPath);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={[
        styles.langSelector,
        compact ? styles.compact : '',
        inMobileMenu ? styles.mobileMenu : '',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={isOpen ? styles.langSelectorButtonOpen : ''}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={currentLabel}
      >
        <span className={styles.langSelector__current}>
          <span>{currentLabel}</span>
        </span>
        <span className={styles.caret} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className={styles.langSelectorDropdown}
          role="listbox"
          aria-label="Select language"
        >
          {dropdownLocales.map((loc) => {
            return (
              <button
                key={loc}
                type="button"
                role="option"
                aria-selected={false}
                onClick={() => handleChange(loc)}
                className={styles.langSelectorDropdownItem}
              >
                <span className={styles.langSelectorDropdownItemInner}>
                  <span>{LOCALE_LABELS[loc] ?? loc}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
