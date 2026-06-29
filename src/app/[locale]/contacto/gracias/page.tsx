import type { Metadata } from "next";

import { ContactThankYou } from "@/features/contact-form/ui/ContactThankYou";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function ContactThankYouPage() {
  return <ContactThankYou />;
}
