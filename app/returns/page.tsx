import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Returns & Exchanges — Aman Kay Rang",
  description: "Learn about our 14-day return and exchange policy for Aman Kay Rang orders.",
};

const conditions = [
  "Item must be unworn, unwashed, and in its original condition.",
  "All original tags and packaging must be intact.",
  "Custom-stitched or tailored garments are final sale.",
  "Items purchased on sale are eligible for exchange only (no refunds).",
  "Unstitched fabric pieces must be in their original folded, uncut state.",
];

const steps = [
  { n: "01", title: "Contact Us", desc: "Email hello@amankayrang.com or WhatsApp within 14 days of delivery with your order number and reason." },
  { n: "02", title: "Approval", desc: "Our team will review your request within 2 business days and send return instructions if approved." },
  { n: "03", title: "Courier Back", desc: "Pack the item securely and send it to our Lahore studio. Return shipping is the customer's responsibility." },
  { n: "04", title: "Refund / Exchange", desc: "Once received and inspected, we process refunds within 5–7 business days. Exchanges are dispatched within 3 days." },
];

export default function ReturnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Returns & Exchanges"
        title="Simple, fair, and transparent."
        subtitle="We want you to love every piece. If something isn't right, we're here to help."
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 space-y-20">

        {/* Policy summary */}
        <div className="max-w-2xl space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-light">Our 14-Day Policy</h2>
          <p className="text-[14px] text-muted leading-relaxed font-light">
            We accept returns and exchanges on eligible items within <span className="text-ink font-medium">14 calendar days</span> of delivery. All requests must be initiated by emailing us directly — we do not currently offer a self-service return portal.
          </p>
        </div>

        {/* Eligibility conditions */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-light mb-10">Conditions for Return</h2>
          <ul className="space-y-4">
            {conditions.map((c, i) => (
              <li key={i} className="flex items-start gap-4 text-[14px] text-muted font-light leading-relaxed">
                <span className="text-roseDeep font-semibold text-[12px] pt-0.5">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Process steps */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-light mb-10">How to Return</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.n} className="space-y-4">
                <p className="font-serif text-[40px] text-roseDeep/30 font-light leading-none">{step.n}</p>
                <h3 className="text-[13px] font-semibold tracking-[0.15em] uppercase text-ink">{step.title}</h3>
                <p className="text-[13px] text-muted font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Refund timeline */}
        <div className="max-w-2xl border-t border-line/60 pt-12 space-y-4">
          <h2 className="font-serif text-3xl text-ink font-light">Refund Timeline</h2>
          <p className="text-[14px] text-muted leading-relaxed font-light">
            Approved refunds are processed to the original payment method within <span className="text-ink font-medium">5–7 business days</span>. COD (Cash on Delivery) orders are refunded via bank transfer — please provide your account details when submitting your return request.
          </p>
          <p className="text-[14px] text-muted leading-relaxed font-light">
            Questions? Email us at{" "}
            <a href="mailto:hello@amankayrang.com" className="text-roseDeep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm">
              hello@amankayrang.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
