'use client';

import { useEffect, useState } from 'react';
import { onSoundChange, setSoundEnabled, soundEnabled, unlockAudio } from '@/lib/sound';

/** The Music on/off control: animated bars while the house music plays. */
export function SoundToggle({ light = false }: { light?: boolean }) {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(soundEnabled());
    return onSoundChange(setOn);
  }, []);

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? 'Turn music off' : 'Turn music on'}
      onClick={() => {
        unlockAudio();
        setSoundEnabled(!on);
      }}
      className={`group inline-flex h-8 items-center gap-2 px-1 font-display text-[0.6rem] uppercase tracking-[0.3em] transition-colors ${
        light ? 'text-[rgba(6,18,42,0.7)] hover:text-rose-ink' : 'text-[rgba(243,239,230,0.75)] hover:text-rose'
      }`}
    >
      <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[2px] bg-current ${on ? 'animate-[soundbar_1s_ease-in-out_infinite_alternate]' : ''}`}
            style={{ height: on ? undefined : '3px', animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </span>
      <span className="hidden lg:inline">Music {on ? 'on' : 'off'}</span>
    </button>
  );
}
