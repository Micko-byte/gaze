'use client';

export function HeroCTA({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-block mt-10 px-8 py-3.5 border border-rose font-display text-[0.7rem] tracking-[0.35em] uppercase text-ivory font-medium hover:bg-rose hover:text-obsidian transition-colors duration-500 ease-reveal"
    >
      {label}
    </a>
  );
}
