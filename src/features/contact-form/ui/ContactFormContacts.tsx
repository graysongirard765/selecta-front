'use client';

import { useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

import { submitContactFormNew } from '../api/submitContactFormNew';
import { type ContactFormNewSchema, createContactFormNewSchema } from '../model/ContactForm.schema';
import styles from './ContactFormContacts.module.scss';

import { useRouter } from '@/i18n/navigation';

const ENABLE_RECAPTCHA = true;

type FormField = {
  key: 'firstName' | 'lastName' | 'email' | 'phone' | 'message';
  label: string;
  required: boolean;
  placeholder: string;
};

export const ContactFormContacts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaKey, setRecaptchaKey] = useState(0);
  const t = useTranslations('contactsForm');
  const router = useRouter();
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
    setValue,
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
      recaptcha: '',
    },
  });

  const onSubmit = useCallback(
    async (data: ContactFormNewSchema) => {
      try {
        setIsLoading(true);
        await submitContactFormNew(data);
        reset();
        setRecaptchaKey((currentValue) => currentValue + 1);
        router.push('/contacts/thank-you');
      } catch (error) {
        console.error(error);
        setRecaptchaKey((currentValue) => currentValue + 1);
      } finally {
        setIsLoading(false);
      }
    },
    [reset, router],
  );

  const handleRecaptchaChange = (token: string | null) => {
    if (ENABLE_RECAPTCHA) {
      setValue('recaptcha', token || '', { shouldValidate: true });
      return;
    }

    setValue('recaptcha', 'disabled', { shouldValidate: false });
  };

  return (
    <div className={styles.form}>
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
                        ? t('required', { fallback: 'Required' })
                        : t('optional', { fallback: 'Optional' })}
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
                      ? t('required', { fallback: 'Required' })
                      : t('optional', { fallback: 'Optional' })}
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

        {ENABLE_RECAPTCHA ? (
          <div className={styles.recaptcha}>
            <ReCAPTCHA
              key={recaptchaKey}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
              onChange={handleRecaptchaChange}
            />
            {errors.recaptcha ? <p className={styles.error}>{errors.recaptcha.message}</p> : null}
          </div>
        ) : null}

        <div className={styles.actions}>
          <button type="submit" className={styles.submit} disabled={isLoading}>
            <span>
              {isLoading
                ? t('loading', { fallback: 'Enviando...' })
                : t('submit', { fallback: 'Enviar mensaje' })}
            </span>
            <span className={styles.submitArrow} aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
};
