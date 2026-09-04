import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6 text-center">
      {/* Decorative line */}
      <div className="w-px h-16 bg-line mb-10" />

      <p className="text-[11px] tracking-[0.2em] uppercase text-roseDeep mb-4">
        404 — Not Found
      </p>

      <h1 className="font-serif font-light text-4xl md:text-6xl text-ink mb-6 leading-tight">
        This page doesn&apos;t exist.
        <br />
        <em className="italic text-roseDeep">But our stories do.</em>
      </h1>

      <p className="text-[13px] text-muted max-w-sm mb-12 leading-relaxed">
        The page you&apos;re looking for may have moved or been removed. Let&apos;s get you back to something beautiful.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center h-12 px-8 bg-rose text-white text-[11px] font-semibold tracking-[0.2em] uppercase rounded-xl hover:bg-roseHover transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
      >
        Return Home
      </Link>

      {/* Decorative line */}
      <div className="w-px h-16 bg-line mt-10" />
    </div>
  );
}
