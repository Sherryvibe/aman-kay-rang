export default function Loading() {
  return (
    <div className="min-h-[60vh] grid place-items-center bg-ivory">
      <div className="flex flex-col items-center gap-5">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose to-transparent animate-pulse" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted font-medium">
          Aman Kay Rang
        </p>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose to-transparent animate-pulse" style={{ animationDelay: "0.3s" }} />
      </div>
    </div>
  );
}
