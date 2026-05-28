import Image from 'next/image';
import { leadershipContent } from '@/content/leadership';
import { StatCountUp } from './StatCountUp';

export function Leadership() {
  return (
    <section id="vision" className="relative py-32 px-6 bg-obsidian">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative aspect-[4/5] overflow-hidden border border-hairline">
          <Image
            src="/images/founder/muthoni-ngugi.png"
            alt={`${leadershipContent.name.first} ${leadershipContent.name.last}`}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover object-top"
            priority={false}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(201,155,175,0.04), rgba(10,10,10,0.25))', mixBlendMode: 'multiply' }}
          />
        </div>

        <div>
          <div className="font-display text-[0.65rem] tracking-[0.45em] uppercase text-rose font-medium mb-6">
            {leadershipContent.eyebrow}
          </div>
          <h2 className="font-display font-extralight text-4xl md:text-6xl leading-none text-ivory mb-3">
            {leadershipContent.name.first} <em className="font-serif italic font-light text-rose">{leadershipContent.name.last}</em>
          </h2>
          <p className="font-serif italic text-rose text-lg md:text-xl mb-10 font-light">
            {leadershipContent.role}
          </p>
          <div className="space-y-4 text-ivory/75 font-light text-base md:text-[1.05rem] leading-relaxed max-w-xl">
            {leadershipContent.bio.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {leadershipContent.stats.map(stat => (
              <StatCountUp
                key={stat.label}
                value={stat.value}
                suffix={'suffix' in stat ? stat.suffix : ''}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
