export function ScrollCue({ label }: { label: string }) {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-display text-[0.55rem] tracking-[0.4em] uppercase text-champagne/70">
      ↓ {label}
    </div>
  );
}
