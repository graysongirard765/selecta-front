import type { ContactFormNewSchema } from '../model/ContactForm.schema';

export const submitContactFormNew = async (data: ContactFormNewSchema) => {
  const formData = new FormData();

  formData.append('fullName', `${data.firstName} ${data.lastName}`.trim());
  formData.append('email', data.email);
  if (data.phone) {
    formData.append('phone', data.phone);
  }
  formData.append('message', data.message || '');
  
  const res = await fetch(`/api/contact-new`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    let message = 'Submission failed';

    try {
      const payload = (await res.json()) as { message?: string };
      if (payload?.message) {
        message = payload.message;
      }
    } catch {
      // Keep default message when the response body is not JSON.
    }

    throw new Error(message);
  }
};
