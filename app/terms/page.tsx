import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Terms & Conditions — Aman Kay Rang",
  description: "The terms and conditions governing your use of the Aman Kay Rang website and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" subtitle={`Last updated: ${new Date().getFullYear()}`} />

      <section className="max-w-[820px] mx-auto px-6 py-24 md:py-32 space-y-12">
        {[
          {
            title: "1. Acceptance of Terms",
            body: `By accessing and using the Aman Kay Rang website (amankayrang.com), you confirm that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our website or services. We reserve the right to update these terms at any time without prior notice; continued use of the website constitutes acceptance of the updated terms.`,
          },
          {
            title: "2. Products & Pricing",
            body: `We endeavour to display product colours and textures as accurately as possible. However, variations may occur due to screen calibration and the natural character of handcrafted fabrics. Prices are displayed in Pakistani Rupees (PKR) and are subject to change without notice. We reserve the right to cancel orders in the event of pricing errors. In such cases, you will be notified and offered a full refund.`,
          },
          {
            title: "3. Order Confirmation & Cancellations",
            body: `An order confirmation email does not constitute acceptance of your order; acceptance occurs only upon dispatch notification. Aman Kay Rang reserves the right to cancel orders due to stock unavailability, suspected fraud, or pricing errors. Customers may cancel unshipped orders by contacting us within 12 hours of placement at hello@amankayrang.com.`,
          },
          {
            title: "4. Intellectual Property",
            body: `All content on this website — including photography, text, graphics, brand marks, patterns, and the design of the website itself — is the intellectual property of Aman Kay Rang and is protected under applicable copyright and trademark law. You may not reproduce, distribute, or use any content without express written permission from Aman Kay Rang.`,
          },
          {
            title: "5. Limitation of Liability",
            body: `Aman Kay Rang will not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. Our liability is limited to the value of your purchase. We do not warrant that the website will be uninterrupted, error-free, or free of viruses. All purchases are subject to our Returns & Exchanges Policy, which forms part of these terms.`,
          },
        ].map((section) => (
          <div key={section.title} className="space-y-4">
            <h2 className="font-serif text-2xl text-ink font-light">{section.title}</h2>
            <p className="text-[14px] text-muted leading-relaxed font-light">{section.body}</p>
          </div>
        ))}

        <div className="border-t border-line/60 pt-8">
          <p className="text-[13px] text-muted font-light">
            For legal inquiries, contact us at{" "}
            <a href="mailto:legal@amankayrang.com" className="text-roseDeep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm">
              legal@amankayrang.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
