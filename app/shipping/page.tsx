import type { Metadata } from "next";
import { Truck, Zap, Globe } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Shipping & Delivery — Aman Kay Rang",
  description: "Delivery options, rates, and timelines for Aman Kay Rang orders across Pakistan.",
};

const options = [
  {
    icon: <Truck strokeWidth={1.25} size={22} />,
    name: "Standard Delivery",
    time: "5–7 Working Days",
    cost: "PKR 250",
    note: "Free on orders over PKR 15,000",
  },
  {
    icon: <Zap strokeWidth={1.25} size={22} />,
    name: "Express Delivery",
    time: "2–3 Working Days",
    cost: "PKR 550",
    note: "Available in major cities only",
  },
  {
    icon: <Globe strokeWidth={1.25} size={22} />,
    name: "International Shipping",
    time: "10–18 Working Days",
    cost: "From USD 18",
    note: "Tracked & insured via courier",
  },
];

const regions = [
  { area: "Karachi, Lahore, Islamabad, Rawalpindi", time: "2–3 days (Standard)" },
  { area: "Multan, Faisalabad, Peshawar, Quetta", time: "3–5 days (Standard)" },
  { area: "All other cities & towns", time: "5–7 days (Standard)" },
  { area: "AJK & Gilgit Baltistan", time: "7–10 days (Standard)" },
];

export default function ShippingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shipping & Delivery"
        title="We ship across Pakistan — and the world."
        subtitle="Every order is packed by hand and dispatched within 1–2 business days of confirmation."
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 space-y-20">
        {/* Delivery options cards */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-light mb-10">Delivery Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {options.map((opt) => (
              <div key={opt.name} className="p-8 bg-beige/30 rounded-xl border border-line/40 space-y-4">
                <div className="text-roseDeep">{opt.icon}</div>
                <div>
                  <h3 className="font-medium text-ink text-[15px]">{opt.name}</h3>
                  <p className="text-[12px] text-roseDeep font-semibold tracking-wide mt-1">{opt.time}</p>
                </div>
                <div className="border-t border-line/60 pt-4 space-y-1">
                  <p className="text-[14px] text-ink font-semibold">{opt.cost}</p>
                  <p className="text-[12px] text-muted font-light">{opt.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery by region */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-light mb-10">Delivery by Region</h2>
          <div className="space-y-0 border border-line/60 rounded-xl overflow-hidden">
            {regions.map((r, i) => (
              <div key={i} className={`flex justify-between items-center px-6 py-5 gap-4 ${i < regions.length - 1 ? "border-b border-line/50" : ""} ${i % 2 === 0 ? "bg-beige/20" : "bg-ivory"}`}>
                <p className="text-[14px] text-ink font-light">{r.area}</p>
                <p className="text-[12px] text-roseDeep font-semibold tracking-wide whitespace-nowrap">{r.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important notes */}
        <div className="max-w-2xl space-y-4 border-t border-line/60 pt-12">
          <h2 className="font-serif text-3xl text-ink font-light">Important Notes</h2>
          <ul className="space-y-3 text-[14px] text-muted font-light leading-relaxed">
            <li>• Orders placed after 3:00 PM PST will be processed the next working day.</li>
            <li>• Public holidays may cause delays of 1–2 additional days.</li>
            <li>• International orders may be subject to customs duties, which are the responsibility of the recipient.</li>
            <li>• A tracking number is sent via WhatsApp or email once your order is dispatched.</li>
            <li>• All deliveries require a signature. Please ensure someone is available at the delivery address.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
