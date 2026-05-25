import { z } from 'zod';

// Set to false to disable reCAPTCHA validation (useful for development/testing)
const ENABLE_RECAPTCHA_BY_DEFAULT = true;

export const createContactFormNewSchema = (
  enableRecaptcha = ENABLE_RECAPTCHA_BY_DEFAULT,
) =>
  z.object({
    firstName: z.string().min(1, 'El nombre es requerido'),
    lastName: z.string().min(1, 'El apellido es requerido'),
    email: z.string().email('El correo electrónico no es válido').min(1, 'El correo electrónico es requerido'),
    phone: z.string().optional(),
    message: z.string().optional(),
    recaptcha: enableRecaptcha
      ? z.string().min(1, 'Por favor, completa la verificación de reCAPTCHA')
      : z.string().optional(),
  });

export type ContactFormNewSchema = z.infer<ReturnType<typeof createContactFormNewSchema>>;
