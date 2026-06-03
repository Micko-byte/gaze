export function ScrollCue({ label, href = '#ethos' }: { label: string; href?: string }) {
  return (
    <a
      href={href}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 font-display text-[0.55rem] tracking-[0.4em] uppercase text-champagne/70 hover:text-rose transition-colors"
      aria-label={label}
    >
      ↓ {label}
    </a>
  );
}
