import { Nav } from '@/components/Nav/Nav';
import { Footer } from '@/components/Footer/Footer';
import { legalContent } from '@/content/legal';

type Props = {
  doc: 'privacy' | 'terms' | 'cookies';
};

export function LegalPage({ doc }: Props) {
  const content = legalContent[doc];

  return (
    <>
      <Nav />
      <main className="bg-obsidian min-h-screen">
        <article className="max-w-3xl mx-auto px-6 pt-40 pb-24">
          <div className="font-display text-[0.65rem] tracking-[0.45em] uppercase text-rose font-medium mb-6">
            Legal · {legalContent.entity}
          </div>
          <h1 className="font-display font-extralight text-4xl md:text-6xl leading-[0.98] tracking-tight text-ivory mb-6">
            {content.title}
          </h1>
          <p className="font-serif italic text-rose text-sm mb-10">
            Effective {legalContent.effectiveDate}.
          </p>
          <p className="text-ivory/75 text-base md:text-lg leading-relaxed font-light mb-14 border-l-2 border-rose pl-6">
            {content.summary}
          </p>

          <div className="space-y-10">
            {content.sections.map(section => (
              <section key={section.heading}>
                <h2 className="font-display text-[0.7rem] tracking-[0.35em] uppercase text-rose font-medium mb-3">
                  {section.heading}
                </h2>
                <p className="text-ivory/70 leading-relaxed font-light text-base">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-hairline">
            <div className="font-display text-[0.6rem] tracking-[0.35em] uppercase text-champagne mb-3">Questions</div>
            <p className="text-ivory/65 text-sm leading-relaxed">
              Reach us at <a href={`mailto:${legalContent.contactEmail}`} className="text-rose hover:text-champagne transition-colors">{legalContent.contactEmail}</a>. {legalContent.address}.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
