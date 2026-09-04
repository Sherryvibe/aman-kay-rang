import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Contact — Aman Kay Rang",
  description: "Reach out to Aman Kay Rang for order inquiries, collaborations, and more.",
};

function ContactRow({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-11 w-11 grid place-items-center rounded-full bg-beige text-roseDeep flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted font-medium">{title}</p>
        <p className="text-[15px] text-ink mt-1 font-light">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] tracking-[0.2em] uppercase text-muted font-medium mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full h-12 px-5 rounded-xl bg-white border border-line text-[14px] text-ink placeholder:text-muted/50 focus:outline-none focus:border-rose transition-colors focus-visible:ring-2 focus-visible:ring-rose"
      />
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reach Us"
        title="We&apos;d love to hear from you."
        subtitle="Our team responds within 24 hours. For urgent order queries, please WhatsApp us directly."
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-2 gap-16 md:gap-24">
        <div className="space-y-10">
          <ContactRow
            icon={<Mail strokeWidth={1.25} size={20} />}
            title="Email"
            value="hello@amankayrang.com"
          />
          <ContactRow
            icon={<Phone strokeWidth={1.25} size={20} />}
            title="WhatsApp"
            value="+92 300 1234567"
          />
          <ContactRow
            icon={<MapPin strokeWidth={1.25} size={20} />}
            title="Studio"
            value="Lahore, Pakistan"
          />
          <div className="border-t border-line/60 pt-8">
            <p className="text-[13px] text-muted leading-relaxed max-w-sm font-light">
              For wholesale inquiries or press requests, please email us at{" "}
              <a
                href="mailto:press@amankayrang.com"
                className="text-roseDeep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm"
              >
                press@amankayrang.com
              </a>
              .
            </p>
          </div>
        </div>

        <form className="space-y-6" action="#" method="POST">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
          </div>
          <Field label="Subject" name="subject" />
          <div>
            <label htmlFor="message" className="block text-[10px] tracking-[0.2em] uppercase text-muted font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full px-5 py-4 rounded-xl bg-white border border-line text-[14px] text-ink focus:outline-none focus:border-rose transition-colors resize-none focus-visible:ring-2 focus-visible:ring-rose"
            />
          </div>
          <button
            type="submit"
            className="h-12 px-8 bg-rose text-white text-[11px] tracking-[0.2em] uppercase rounded-xl hover:bg-roseHover transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
          >
            Send Message
          </button>
        </form>
      </section>
    </>
  );
}
