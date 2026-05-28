import { z } from 'zod';

export const createContactFormNewSchema = () =>
  z.object({
    firstName: z.string().min(1, 'El nombre es requerido'),
    lastName: z.string().min(1, 'El apellido es requerido'),
    email: z.string().email('El correo electrónico no es válido').min(1, 'El correo electrónico es requerido'),
    phone: z.string().optional(),
    message: z.string().optional(),
  });

export type ContactFormNewSchema = z.infer<ReturnType<typeof createContactFormNewSchema>>;
