import { masterTerms } from '@/content/furnishingsTerms';

/** Her Master Terms & Conditions, numbered as she numbers them: in full on the terms page, smaller in the commission. */
export function MasterTerms({ compact = false }: { compact?: boolean }) {
  const text = compact ? 'text-[13px]' : 'text-[15px]';
  return (
    <ol className={`grid ${compact ? 'gap-5' : 'gap-10'}`}>
      {masterTerms.map((s, i) => (
        <li key={s.title}>
          <h3 className={compact ? 'text-[13px] font-medium uppercase tracking-[0.12em]' : 'font-furn text-[clamp(24px,2vw,32px)] leading-tight'}>
            <span className="text-furn-walnut">{i + 1}.</span> {s.title}
          </h3>
          <div className={`mt-2 grid gap-2 ${text} font-light leading-relaxed text-[#4A4640]`}>
            {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
            {s.points && (
              <ul className="list-disc space-y-1 pl-5">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
            {s.after?.map((p) => <p key={p}>{p}</p>)}
          </div>
        </li>
      ))}
    </ol>
  );
}
