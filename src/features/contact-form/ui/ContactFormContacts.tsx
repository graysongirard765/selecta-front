'use client';

import { useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { submitContactFormNew } from '../api/submitContactFormNew';
import { type ContactFormNewSchema, createContactFormNewSchema } from '../model/ContactForm.schema';
import styles from './ContactFormContacts.module.scss';

type FormField = {
  key: 'firstName' | 'lastName' | 'email' | 'phone' | 'message';
  label: string;
  required: boolean;
  placeholder: string;
};

type ContactFormContactsProps = {
  variant?: 'default' | 'contactPage';
};

export const ContactFormContacts = ({ variant = 'default' }: ContactFormContactsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const t = useTranslations('contactsForm');
  const fields: readonly FormField[] = [
    {
      key: 'firstName',
      label: t('firstName', { fallback: 'Nombre' }),
      required: true,
      placeholder: t('firstNamePlaceholder', { fallback: 'Escribe tu nombre' }),
    },
    {
      key: 'lastName',
      label: t('lastName', { fallback: 'Apellido' }),
      required: true,
      placeholder: t('lastNamePlaceholder', { fallback: 'Escribe tu apellido' }),
    },
    {
      key: 'email',
      label: t('email', { fallback: 'Correo electronico' }),
      required: true,
      placeholder: t('emailPlaceholder', { fallback: 'Escribe tu correo electronico' }),
    },
    {
      key: 'phone',
      label: t('phone', { fallback: 'Numero de telefono' }),
      required: false,
      placeholder: t('phonePlaceholder', { fallback: 'Escribe tu numero de telefono' }),
    },
    {
      key: 'message',
      label: t('message', { fallback: 'Mensaje' }),
      required: false,
      placeholder: t('messagePlaceholder', { fallback: 'Escribe tu mensaje' }),
    },
  ] as const;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormNewSchema>({
    resolver: zodResolver(createContactFormNewSchema()),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = useCallback(
    async (data: ContactFormNewSchema) => {
      try {
        setIsLoading(true);
        setSubmitError(null);
        await submitContactFormNew(data);
        reset();
        setSubmitSuccess(true);
      } catch (error: unknown) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : t('submitError', {
                fallback: 'No pudimos enviar tu mensaje. Inténtalo de nuevo.',
              }),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [reset, t],
  );

  return (
    <div className={`${styles.form} ${variant === 'contactPage' ? styles.formContactPage : ''}`}>
      {submitSuccess ? (
        <div
          className={styles.successOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-form-success-title"
        >
          <div className={styles.successPopup}>
            <button
              type="button"
              className={styles.successClose}
              onClick={() => setSubmitSuccess(false)}
              aria-label={t('successCloseAria', { fallback: 'Cerrar mensaje' })}
            >
              <span />
              <span />
            </button>
            <div className={styles.successIcon} aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 12.5L10.25 16.75L18 8.75"
                  stroke="#030303"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 id="contact-form-success-title" className={styles.successTitle}>
              {t('successTitle', { fallback: 'Mensaje enviado correctamente' })}
            </h3>
            <p className={styles.successBody}>
              {t('successBody', {
                fallback:
                  'Hemos recibido tu mensaje y nuestro equipo se pondrá en contacto contigo en breve.',
              })}
            </p>
            <button
              type="button"
              className={styles.successButton}
              onClick={() => setSubmitSuccess(false)}
            >
              {t('successAction', { fallback: 'Cerrar' })}
            </button>
          </div>
        </div>
      ) : null}

      {variant === 'contactPage' ? (
        <div className={styles.header}>
          <h2 className={styles.title}>
            {t('panelTitle', { fallback: 'Enviar un mensaje' })}
          </h2>
          <p className={styles.description}>
            {t('panelDescription', {
              fallback:
                'También puedes ponerte en contacto con nosotros a través del siguiente formulario.',
            })}
          </p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formInner}>
        <div className={styles.grid}>
          {fields.map((field) => {
            const error = errors[field.key];
            const inputClassName = error ? `${styles.input} ${styles.inputError}` : styles.input;

            if (field.key === 'message') {
              return (
                <label key={field.key} className={`${styles.field} ${styles.fieldMessage}`}>
                  <span className={styles.fieldTop}>
                    <span className={styles.label}>
                      {field.label}
                    </span>
                    <span className={styles.meta}>
                      {field.required
                        ? t('required', { fallback: 'Requerido' })
                        : t('optional', { fallback: 'Opcional' })}
                    </span>
                  </span>
                  <textarea
                    {...register(field.key)}
                    className={`${inputClassName} ${styles.textarea}`}
                    placeholder={field.placeholder}
                  />
                  {error ? <p className={styles.error}>{error.message}</p> : null}
                </label>
              );
            }

            return (
              <label
                key={field.key}
                className={
                  field.key === 'email' || field.key === 'phone'
                    ? `${styles.field} ${styles.fieldWide}`
                    : styles.field
                }
              >
                <span className={styles.fieldTop}>
                  <span className={styles.label}>
                    {field.label}
                  </span>
                  <span className={styles.meta}>
                    {field.required
                      ? t('required', { fallback: 'Requerido' })
                      : t('optional', { fallback: 'Opcional' })}
                  </span>
                </span>
                <input
                  type={field.key === 'email' ? 'email' : 'text'}
                  {...register(field.key)}
                  className={inputClassName}
                  placeholder={field.placeholder}
                />
                {error ? <p className={styles.error}>{error.message}</p> : null}
              </label>
            );
          })}
        </div>

        {submitError ? <p className={styles.error}>{submitError}</p> : null}

        <div className={styles.actions}>
          <button type="submit" className={styles.submit} disabled={isLoading}>
            <span>
              {isLoading
                ? t('loading', { fallback: 'Enviando...' })
                : t('submit', { fallback: 'Enviar mensaje' })}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2.91663 6.99984H11.0833M7.58329 2.9165L11.6666 6.99984L7.58329 11.0832"
                stroke="#030303"
                strokeWidth="1.16667"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
