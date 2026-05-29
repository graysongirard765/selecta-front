import { NextResponse } from 'next/server';

import nodemailer from 'nodemailer';

import { escapeHtml } from '@/shared/lib/email/brandedEmail';

const SMTP_HOST = 'mail.privateemail.com';
const SMTP_PORT = 465;

const parseEmailList = (value: string | undefined) =>
  (value ?? '')
    .split(/[,\n;]/)
    .map((item) => item.trim())
    .filter(Boolean);

const getEmailConfig = () => {
  const adminEmails = parseEmailList(process.env.ADMIN_EMAIL);
  const fromEmail = process.env.FROM_EMAIL?.trim();
  const password = process.env.EMAIL_PASSWORD?.trim();

  if (adminEmails.length === 0 || !fromEmail || !password) {
    throw new Error('Email configuration is missing.');
  }

  return { adminEmails, fromEmail, password };
};

const createTransporter = (fromEmail: string, password: string) =>
  nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: fromEmail,
      pass: password,
    },
  });

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const fullName = String(formData.get('fullName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    const { adminEmails, fromEmail, password } = getEmailConfig();
    const transporter = createTransporter(fromEmail, password);

    await transporter.sendMail({
      from: fromEmail,
      to: adminEmails,
      subject: 'Nueva solicitud de contacto',
      replyTo: email || fromEmail,
      html: `
        <h2>Nueva solicitud de contacto</h2>
        <p><strong>Nombre completo:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p><strong>Mensaje:</strong> ${escapeHtml(message)}</p>
      `,
    });

    return NextResponse.json({ message: 'Solicitud de contacto enviada correctamente.' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error al enviar la solicitud de contacto:', errorMessage);

    return NextResponse.json(
      { message: 'Error al enviar la solicitud de contacto.', error: errorMessage },
      { status: 500 },
    );
  }
}
