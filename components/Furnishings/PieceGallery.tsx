'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import type { Piece } from '@/content/furnishings';
import { FurnitureDrawing } from './FurnitureDrawing';

/**
 * The piece's plate on its own page: the client's photographs, one large with the rest as thumbnails beneath, and the
 * line drawing kept as the last plate. A piece with no photographs shows its drawing alone.
 */
export function PieceGallery({ piece }: { piece: Piece }) {
  const plates = [...(piece.photos ?? []), 'drawing'];
  const [at, setAt] = useState(0);

  return (
    <div>
      <div className="bg-[#F3EDE4] p-3 md:p-5">
        <div data-loader-target className="relative aspect-[4/3] overflow-hidden bg-[#F6F1EA]">
          {plates.map((p, i) => (
            <div key={p} aria-hidden={i !== at} className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${i === at ? 'opacity-100' : 'opacity-0'}`}>
              {p === 'drawing' ? (
                <FurnitureDrawing kind={piece.drawing} className="w-[74%] text-furn-ink" />
              ) : (
                <img src={p} alt={`${piece.name}, plate ${i + 1}`} className="h-full w-full object-cover" />
              )}
            </div>
          ))}
          {piece.decided && (
            <span className="absolute left-5 top-5 rounded-full border border-[rgba(255,255,255,0.7)] bg-[rgba(238,231,223,0.85)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] backdrop-blur-sm">
              Signature
            </span>
          )}
          <span className="absolute bottom-4 right-4 rounded-full bg-[rgba(238,231,223,0.85)] px-3 py-1.5 text-[10px] font-medium tracking-[0.2em] backdrop-blur-sm">
            {String(at + 1).padStart(2, '0')} / {String(plates.length).padStart(2, '0')}
          </span>
        </div>
      </div>
      {plates.length > 1 && (
        <ul className="mt-4 flex gap-3" aria-label={`${piece.name}: plates`}>
          {plates.map((p, i) => (
            <li key={p}>
              <button
                type="button"
                onClick={() => setAt(i)}
                aria-pressed={i === at}
                aria-label={p === 'drawing' ? 'The drawing' : `Photograph ${i + 1}`}
                className={`flex h-16 w-20 items-center justify-center overflow-hidden bg-[#F6F1EA] outline-offset-2 transition-opacity md:h-20 md:w-24 ${i === at ? 'opacity-100 ring-1 ring-furn-ink' : 'opacity-60 hover:opacity-100'}`}
              >
                {p === 'drawing' ? <FurnitureDrawing kind={piece.drawing} className="w-[80%] text-furn-ink" /> : <img src={p} alt="" className="h-full w-full object-cover" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
