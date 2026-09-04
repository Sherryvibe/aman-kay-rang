import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Size Guide — Aman Kay Rang",
  description: "Find your perfect fit with our detailed size guide for Pakistani heritage clothing.",
};

const sizes = [
  { size: "XS", chest: "32–33", waist: "26–27", hips: "35–36", length: "52" },
  { size: "S",  chest: "34–35", waist: "28–29", hips: "37–38", length: "53" },
  { size: "M",  chest: "36–37", waist: "30–31", hips: "39–40", length: "54" },
  { size: "L",  chest: "38–40", waist: "32–34", hips: "41–43", length: "55" },
  { size: "XL", chest: "41–43", waist: "35–37", hips: "44–46", length: "56" },
  { size: "XXL",chest: "44–46", waist: "38–40", hips: "47–49", length: "57" },
];

const measureGuide = [
  { label: "Chest", desc: "Measure around the fullest part of your chest, keeping the tape parallel to the floor." },
  { label: "Waist", desc: "Measure around your natural waistline — the narrowest part of your torso." },
  { label: "Hips", desc: "Measure around the fullest part of your hips, approximately 8 inches below your waistline." },
  { label: "Length", desc: "Measure from the highest point of your shoulder straight down to the desired hem length." },
];

export default function SizeGuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Fit & Measurements"
        title="Size Guide"
        subtitle="All measurements are in inches. If you are between sizes, we recommend sizing up for a more relaxed, traditional fit."
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 space-y-20">
        {/* Measurement Table */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-light mb-10">Garment Measurements</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-line">
                  {["Size", "Chest", "Waist", "Hips", "Length"].map((h) => (
                    <th key={h} className="py-4 pr-8 text-[10px] tracking-[0.2em] uppercase text-muted font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizes.map((row, i) => (
                  <tr key={row.size} className={`border-b border-line/50 transition-colors ${i % 2 === 0 ? "bg-beige/20" : ""}`}>
                    <td className="py-4 pr-8 font-semibold text-[14px] text-ink">{row.size}</td>
                    <td className="py-4 pr-8 text-[14px] text-muted font-light">{row.chest}&quot;</td>
                    <td className="py-4 pr-8 text-[14px] text-muted font-light">{row.waist}&quot;</td>
                    <td className="py-4 pr-8 text-[14px] text-muted font-light">{row.hips}&quot;</td>
                    <td className="py-4 pr-8 text-[14px] text-muted font-light">{row.length}&quot;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-light mb-10">How to Measure</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {measureGuide.map((item) => (
              <div key={item.label} className="space-y-3 p-6 bg-beige/30 rounded-xl border border-line/40">
                <h3 className="text-[11px] tracking-[0.2em] uppercase text-roseDeep font-semibold">{item.label}</h3>
                <p className="text-[13px] text-muted leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fit Notes */}
        <div className="max-w-2xl space-y-4 border-t border-line/60 pt-12">
          <h2 className="font-serif text-3xl text-ink font-light">Fit Notes</h2>
          <p className="text-[14px] text-muted leading-relaxed font-light">
            Aman Kay Rang garments are designed with a <span className="text-ink font-medium">relaxed, traditional silhouette</span>. Our kurtis and shirts typically sit at the hip with ease for natural movement. Unstitched fabric is available in standard 3-metre and 4-metre options and can be stitched locally to your exact measurements.
          </p>
          <p className="text-[14px] text-muted leading-relaxed font-light">
            For custom sizing or stitching recommendations, please contact us at{" "}
            <a href="mailto:hello@amankayrang.com" className="text-roseDeep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm">hello@amankayrang.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
