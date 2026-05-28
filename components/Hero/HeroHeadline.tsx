type Line = { parts: ReadonlyArray<{ text: string; accent?: boolean }> };

export function HeroHeadline({ lines }: { lines: ReadonlyArray<Line> }) {
  return (
    <h1 className="font-display font-extralight text-5xl md:text-7xl leading-[0.95] tracking-tight text-ivory">
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line.parts.map((p, j) =>
            p.accent ? (
              <em key={j} className="font-serif italic font-light text-rose">{p.text}</em>
            ) : (
              <span key={j}>{p.text}</span>
            )
          )}
        </span>
      ))}
    </h1>
  );
}
