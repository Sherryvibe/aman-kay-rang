import type { Metadata } from "next";
import Link from "next/link";
import { User, Lock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Account — Aman Kay Rang",
  description: "Sign in or create an account with Aman Kay Rang.",
};

function InputField({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] tracking-[0.2em] uppercase text-muted font-medium mb-2">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="w-full h-12 px-5 rounded-xl bg-white border border-line text-[14px] text-ink placeholder:text-muted/50 focus:outline-none focus:border-rose transition-colors focus-visible:ring-2 focus-visible:ring-rose"
      />
    </div>
  );
}

export default function AccountPage() {
  return (
    <>
      <PageHeader
        eyebrow="My Account"
        title="Welcome back."
        subtitle="Sign in to view your orders, wishlist, and personal details."
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Login */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 grid place-items-center rounded-full bg-beige text-roseDeep">
              <User strokeWidth={1.25} size={18} />
            </div>
            <h2 className="font-serif text-2xl text-ink font-light">Sign In</h2>
          </div>
          <form className="space-y-5" action="#" method="POST">
            <InputField id="login-email" label="Email Address" type="email" />
            <InputField id="login-password" label="Password" type="password" />
            <div className="flex justify-end">
              <Link href="/contact" className="text-[11px] text-muted hover:text-roseDeep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-rose text-white text-[11px] tracking-[0.2em] uppercase rounded-xl hover:bg-roseHover transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Register */}
        <div className="space-y-8 border-t md:border-t-0 md:border-l border-line/60 pt-10 md:pt-0 md:pl-16">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 grid place-items-center rounded-full bg-beige text-roseDeep">
              <Lock strokeWidth={1.25} size={18} />
            </div>
            <h2 className="font-serif text-2xl text-ink font-light">Create Account</h2>
          </div>
          <p className="text-[13.5px] text-muted font-light leading-relaxed">
            Join Aman Kay Rang to receive early access to new collections, save items to your wishlist, and track orders with ease.
          </p>
          <form className="space-y-5" action="#" method="POST">
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField id="reg-first" label="First Name" />
              <InputField id="reg-last" label="Last Name" />
            </div>
            <InputField id="reg-email" label="Email Address" type="email" />
            <InputField id="reg-password" label="Create Password" type="password" />
            <button
              type="submit"
              className="w-full h-12 bg-rose text-white text-[11px] tracking-[0.2em] uppercase rounded-xl hover:bg-roseHover transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
            >
              Create Account
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
