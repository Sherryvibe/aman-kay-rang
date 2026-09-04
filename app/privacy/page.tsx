import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy — Aman Kay Rang",
  description: "How Aman Kay Rang collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" subtitle={`Last updated: ${new Date().getFullYear()}`} />

      <section className="max-w-[820px] mx-auto px-6 py-24 md:py-32 space-y-12">
        {[
          {
            title: "1. Information We Collect",
            body: `We collect information you voluntarily provide when you place an order, create an account, sign up for our newsletter, or contact us. This includes your name, email address, shipping address, phone number, and payment information. We may also collect browsing data, cookies, and device information automatically when you visit our website to improve your experience and our services.`,
          },
          {
            title: "2. How We Use Your Information",
            body: `Your information is used to process and fulfil orders, send order confirmations and tracking updates, respond to customer inquiries, personalise your shopping experience, and send marketing communications (with your consent). We may also use your data to analyse website traffic and improve our products and services. We do not sell or rent your personal data to third parties.`,
          },
          {
            title: "3. Data Sharing & Third Parties",
            body: `We share your information only with trusted service providers who assist in operating our website and fulfilling orders — including payment processors, logistics partners, and email service providers. All third parties are contractually required to keep your information confidential and use it only for the purposes we specify. We may disclose information if required by law or to protect our legal rights.`,
          },
          {
            title: "4. Cookies & Tracking",
            body: `We use cookies and similar technologies to remember your preferences, maintain your shopping cart session, and analyse how customers use our site. You can control cookie settings through your browser preferences, though disabling cookies may affect the functionality of certain features. We also use analytics tools to understand usage patterns and improve our platform.`,
          },
          {
            title: "5. Your Rights & Data Retention",
            body: `You have the right to access, correct, or delete your personal data at any time. To exercise these rights, please email us at hello@amankayrang.com. We retain your data only as long as necessary to provide our services and comply with legal obligations. You may also opt out of marketing emails at any time using the unsubscribe link in any email we send.`,
          },
        ].map((section) => (
          <div key={section.title} className="space-y-4">
            <h2 className="font-serif text-2xl text-ink font-light">{section.title}</h2>
            <p className="text-[14px] text-muted leading-relaxed font-light">{section.body}</p>
          </div>
        ))}

        <div className="border-t border-line/60 pt-8">
          <p className="text-[13px] text-muted font-light">
            Questions about this policy? Contact our privacy team at{" "}
            <a href="mailto:privacy@amankayrang.com" className="text-roseDeep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm">
              privacy@amankayrang.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
