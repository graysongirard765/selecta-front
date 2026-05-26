import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

import {
  createBrandedEmailHtml,
  escapeHtml,
  renderEmailParagraph,
} from '@/shared/lib/email/brandedEmail';
import { verifyRecaptcha } from '@/shared/lib/recaptcha';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string | null;
    const message = formData.get('message') as string;
    const recaptcha = formData.get('recaptcha') as string;

    // Set to false to disable reCAPTCHA verification (useful for development/testing)
    const ENABLE_RECAPTCHA = true;

    // Verify reCAPTCHA token (only if enabled)
    if (ENABLE_RECAPTCHA) {
      if (!recaptcha || recaptcha === 'disabled') {
        return NextResponse.json(
          { message: 'La verificación de reCAPTCHA es requerida.' },
          { status: 400 }
        );
      }

      const isRecaptchaValid = await verifyRecaptcha(recaptcha);
      if (!isRecaptchaValid) {
        return NextResponse.json(
          { message: 'La verificación de reCAPTCHA falló. Por favor, inténtalo de nuevo.' },
          { status: 400 }
        );
      }
    }

    // Initialize SendGrid with API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    // Create email content for admin
    const msg = {
      to: process.env.ADMIN_EMAIL!,
      from: process.env.FROM_EMAIL!,
      subject: 'Nueva solicitud de contacto',
      html: `
        <h2>Nueva solicitud de contacto</h2>
        <p><strong>Nombre completo:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p><strong>Mensaje:</strong> ${escapeHtml(message)}</p>
      `,
    };

    // Create confirmation email for user
    const userMsg = {
      to: email,
      from: process.env.FROM_EMAIL!,
      subject: "Hemos recibido tu mensaje",
      html: createBrandedEmailHtml({
        previewTitle: 'Gracias por contactar a selecta!',
        title: 'Gracias por contactar a selecta!',
        bodyHtml: [
          renderEmailParagraph(
            'Tu mensaje ha sido recibido. Nuestro equipo revisará tu consulta cuidadosamente y te responderá brevemente.'
          ),
          renderEmailParagraph('Apreciamos tu interés y te esperamos para ayudarte.'),
        ].join('<div style="height: 24px; line-height: 24px;">&nbsp;</div>'),
      }),
    };

    // Send emails
    await sgMail.send(msg);
    await sgMail.send(userMsg);

    return NextResponse.json({ message: 'Solicitud de contacto enviada correctamente.' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error al enviar la solicitud de contacto:', errorMessage);
    return NextResponse.json(
      { message: 'Error al enviar la solicitud de contacto.', error: errorMessage },
      { status: 500 }
    );
  }
}
