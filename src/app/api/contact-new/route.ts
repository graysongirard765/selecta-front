import { NextResponse } from 'next/server';

import type { MailDataRequired } from '@sendgrid/mail';
import sgMail from '@sendgrid/mail';

import {
  createBrandedEmailHtml,
  escapeHtml,
  renderEmailParagraph,
} from '@/shared/lib/email/brandedEmail';

const parseEmailList = (value: string | undefined) =>
  (value ?? '')
    .split(/[,\n;]/)
    .map((item) => item.trim())
    .filter(Boolean);

const getEmailConfig = () => {
  const apiKey = process.env.SENDGRID_API_KEY;
  const adminEmails = parseEmailList(process.env.ADMIN_EMAIL);
  const fromEmail = process.env.FROM_EMAIL?.trim();

  if (!apiKey || adminEmails.length === 0 || !fromEmail) {
    throw new Error('Email configuration is missing.');
  }

  sgMail.setApiKey(apiKey);

  return { adminEmails, fromEmail };
};

const getSendGridErrorDetails = (error: unknown) => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'number'
  ) {
    return {
      statusCode: error.code,
      body:
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'body' in error.response
          ? error.response.body
          : undefined,
    };
  }

  return {
    statusCode: undefined,
    body: undefined,
  };
};

const sendEmail = async (message: MailDataRequired, label: string) => {
  try {
    await sgMail.send(message);
  } catch (error) {
    const { body } = getSendGridErrorDetails(error);
    if (body) {
      console.error(`SendGrid ${label} error:`, body);
    }

    throw error;
  }
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string | null;
    const message = formData.get('message') as string;

    const { adminEmails, fromEmail } = getEmailConfig();

    // Create email content for admin
    const msg = {
      to: adminEmails,
      from: fromEmail,
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
      from: fromEmail,
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
    await sendEmail(msg, 'admin');
    await sendEmail(userMsg, 'user');

    return NextResponse.json({ message: 'Solicitud de contacto enviada correctamente.' });
  } catch (error: unknown) {
    const { statusCode } = getSendGridErrorDetails(error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error al enviar la solicitud de contacto:', errorMessage);

    if (process.env.NODE_ENV !== 'production' && statusCode === 403) {
      console.warn(
        'SendGrid rejected the request in local development. Returning success so the form flow remains testable locally.',
      );

      return NextResponse.json({
        message:
          'El formulario se procesó en desarrollo, pero SendGrid rechazó el envío. Revisa FROM_EMAIL / sender identity antes de producción.',
        warning: 'sendgrid_forbidden_dev_bypass',
      });
    }

    return NextResponse.json(
      { message: 'Error al enviar la solicitud de contacto.', error: errorMessage },
      { status: 500 }
    );
  }
}
