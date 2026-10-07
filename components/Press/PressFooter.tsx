import Link from 'next/link';

/** The Press footer, after Matthieu Givelet: a hairline, the year, and two bracketed notes. */
export function PressFooter() {
  return (
    <footer className="px-5 pb-12 font-text text-[17px] tracking-[-0.02em] text-press-ink md:px-9">
      <div className="grid gap-12 border-t border-[rgba(17,17,17,0.15)] pt-10 md:grid-cols-[1fr_0.6fr_0.6fr]">
        <p>©{new Date().getFullYear()} Gaze Press Global</p>
        <div>
          <p>[ Open ]</p>
          <p className="mt-10 max-w-[19ch] text-[22px] leading-[1.22]">
            <span className="inline-block w-14" />
            We are always looking for voices of depth, truth, and excellence. Feel free to{' '}
            <Link href="/press/commission" data-no-transition className="underline underline-offset-4">
              submit a manuscript.
            </Link>
          </p>
        </div>
        <div>
          <p>[ Contact ]</p>
          <ul className="mt-10 grid gap-1 text-[22px] leading-[1.22]">
            <li>
              <Link href="/#contact" className="underline-offset-4 hover:underline">Write to us</Link>
            </li>
            <li>
              <Link href="/" className="underline-offset-4 hover:underline">Gaze Holdings</Link>
            </li>
            <li>
              <Link href="/legal/privacy" className="underline-offset-4 hover:underline">Privacy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
