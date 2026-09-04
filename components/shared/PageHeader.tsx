interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  // If title contains " — ", split into two lines (first normal, second italic)
  const parts = title.split(" — ");

  return (
    <section className="pt-28 pb-12 md:pt-36 md:pb-16 text-center bg-ivory border-b border-line/40">
      <div className="max-w-[820px] mx-auto px-6">
        <p className="text-[11px] tracking-[0.25em] uppercase text-roseDeep mb-5 font-medium">{eyebrow}</p>
        <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-ink font-light">
          {parts.length > 1 ? (
            <>
              <span className="block">{parts[0]}</span>
              <em className="block italic font-light text-roseDeep">{parts[1]}</em>
            </>
          ) : (
            title
          )}
        </h1>
        {subtitle && (
          <p className="mt-6 text-[15px] text-muted max-w-md mx-auto leading-relaxed font-light">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
