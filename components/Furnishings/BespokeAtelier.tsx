'use client';

/* eslint-disable @next/next/no-img-element */
import {
  colours,
  describeConfiguration,
  finishes,
  palette,
  studioForm,
  textureColours,
  textures,
  timbers,
  type Configuration,
  type Piece,
  type TextureId,
  type TimberId,
} from '@/content/furnishings';
import type { ReactNode } from 'react';
import { AtelierRender, baseHex, materialStyle } from './AtelierRender';

const cap = 'text-[10px] font-medium uppercase tracking-[0.28em]';

function Phase({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="border-t border-[rgba(30,30,34,0.15)] pt-6">
      <p className={`${cap} text-furn-walnut`}>Phase {n}</p>
      <h3 className="mt-2 font-furn text-[clamp(24px,2vw,32px)] leading-tight">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

/**
 * The Bespoke Atelier, from the client's brief: select a texture, define a palette, add the finishing touch, and see
 * the piece dressed in it as you go. Upholstered pieces choose among her five fabric families, with the colours each
 * is woven in; case pieces choose a timber or a lacquer. Controlled: the commission form and the studio section both
 * hold the configuration.
 */
export function BespokeAtelier({ piece, value, onChange, layout = 'wide' }: { piece: Piece; value: Configuration; onChange: (c: Configuration) => void; layout?: 'wide' | 'stacked' }) {
  const form = studioForm(piece);
  const isCase = form === 'case';
  const hex = colours.find((c) => c.name === value.colour)?.hex;
  const base = baseHex(value, hex);
  const texture = textures.find((t) => t.id === value.material);
  const timber = timbers.find((t) => t.id === value.material);
  const offered = isCase ? (value.material === 'lacquer' ? colours.map((c) => c.name) : []) : textureColours[value.material as TextureId] ?? [];

  const pickMaterial = (material: TextureId | TimberId) => {
    const allowed = isCase ? (material === 'lacquer' ? colours.map((c) => c.name) : []) : textureColours[material as TextureId];
    const colour = allowed.includes(value.colour) ? value.colour : allowed[0] ?? '';
    onChange({ ...value, material, colour });
  };

  const tag = [texture?.short ?? timber?.name, value.colour || null, finishes.find((f) => f.id === value.finish)!.name].filter(Boolean).join(' / ');

  const preview = (
    <div>
      <div className="relative overflow-hidden bg-[#F3EDE4] p-4 md:p-6">
        <p className={`mb-3 inline-block rounded-full bg-[rgba(238,231,223,0.9)] px-3 py-1.5 backdrop-blur-sm md:absolute md:left-8 md:top-8 md:z-10 md:mb-0 ${cap}`}>
          Active configuration: {tag}
        </p>
        {isCase ? (
          <div className="relative aspect-[3/2] overflow-hidden bg-[#F6F1EA]">
            {piece.photos && <img src={piece.photos[0]} alt={`${piece.name}, as made`} className="absolute inset-0 h-full w-full object-cover object-[50%_70%]" />}
            {/* the chosen timber or lacquer, as a sample laid against the piece */}
            <div className="absolute bottom-4 right-4 h-28 w-28 rounded-[4px] shadow-[0_20px_30px_-16px_rgba(0,0,0,0.6)] ring-1 ring-[rgba(255,255,255,0.6)] transition-[background] duration-500 md:h-36 md:w-36" style={materialStyle(value.material, base)} />
          </div>
        ) : (
          <AtelierRender form={form} config={value} hex={base} />
        )}
      </div>
      {!isCase && piece.photos && (
        <div className="mt-4 flex items-center gap-4">
          <img src={piece.photos[0]} alt={`${piece.name}, as made in the atelier`} className="h-16 w-20 object-cover" />
          <p className="text-[13px] font-light leading-snug text-[#6F6A62]">
            The {piece.name} as made in our atelier. The drawing above shows your fabric, colour and finish.
          </p>
        </div>
      )}
    </div>
  );

  const phases = (
    <div className="flex flex-col gap-10">
      <Phase n={1} title={isCase ? 'Select your material' : 'Select your texture'}>
        <div role="radiogroup" aria-label={isCase ? 'Material' : 'Texture'} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {(isCase ? timbers : textures).map((m) => {
            const on = value.material === m.id;
            const sampleHex = isCase ? (m.id === 'lacquer' ? hex ?? colours[0].hex : (m as (typeof timbers)[number]).hex) : hex ?? colours[0].hex;
            return (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => pickMaterial(m.id)}
                className={`group text-left outline-offset-4 transition-opacity ${on ? '' : 'opacity-80 hover:opacity-100'}`}
              >
                <span
                  className={`block aspect-[4/3] transition-[box-shadow,background] duration-500 ${on ? 'ring-2 ring-furn-ink ring-offset-2 ring-offset-[#EEE7DF]' : 'ring-1 ring-[rgba(30,30,34,0.15)] group-hover:ring-furn-ink'}`}
                  style={materialStyle(m.id, sampleHex)}
                />
                <span className="mt-2 block text-[14px] leading-tight">{m.name}</span>
                <span className="block text-[12px] text-[#6F6A62]">{'family' in m ? m.family : m.line}</span>
              </button>
            );
          })}
        </div>
        {texture && <p className="mt-5 max-w-xl text-[14px] font-light leading-relaxed text-[#4A4640]">{texture.detail}</p>}
      </Phase>

      {offered.length > 0 && (
        <Phase n={2} title="Select your palette">
          <div className="flex flex-col gap-5">
            {palette.map((fam) => {
              const shown = fam.colours.filter((c) => offered.includes(c.name));
              if (!shown.length) return null;
              return (
                <div key={fam.family}>
                  <p className={`${cap} text-[#8A847A]`}>{fam.family}</p>
                  <div role="radiogroup" aria-label={fam.family} className="mt-3 flex flex-wrap gap-3">
                    {shown.map((c) => {
                      const on = value.colour === c.name;
                      return (
                        <button key={c.name} type="button" role="radio" aria-checked={on} onClick={() => onChange({ ...value, colour: c.name })} className="group w-[68px] text-center">
                          <span
                            className={`mx-auto block h-12 w-12 rounded-full transition-shadow ${on ? 'ring-2 ring-furn-ink ring-offset-2 ring-offset-[#EEE7DF]' : 'ring-1 ring-[rgba(30,30,34,0.2)] group-hover:ring-furn-ink'}`}
                            style={materialStyle(value.material, c.hex)}
                          />
                          <span className="mt-2 block text-[11px] leading-tight">{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Phase>
      )}

      <Phase n={offered.length > 0 ? 3 : 2} title="The finishing touch">
        <p className="-mt-2 mb-4 text-[13px] font-light text-[#6F6A62]">{isCase ? 'For the handles, trim and feet.' : 'For the legs and trim.'}</p>
        <div role="radiogroup" aria-label="Finish" className="flex flex-wrap gap-3">
          {finishes.map((f) => {
            const on = value.finish === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => onChange({ ...value, finish: f.id })}
                className={`flex items-center gap-3 rounded-full py-2 pl-2 pr-5 text-[13px] transition-colors ${on ? 'bg-furn-ink text-furn-linen' : 'ring-1 ring-[rgba(30,30,34,0.3)] hover:ring-furn-ink'}`}
              >
                <span className="h-7 w-7 rounded-full" style={{ background: `linear-gradient(135deg, ${f.hex}, ${f.id === 'brass' ? '#E6CB91' : f.id === 'black' ? '#3A3A3D' : '#9A6A43'} 50%, ${f.hex})` }} />
                {f.name}
              </button>
            );
          })}
        </div>
      </Phase>

      <div className="bg-furn-ink px-6 py-5 text-furn-linen">
        <p className={`${cap} text-[rgba(238,231,223,0.6)]`}>Selected</p>
        <p className="mt-2 font-furn text-[clamp(20px,1.8vw,26px)] leading-snug">
          {piece.name} in {describeConfiguration(value)}
        </p>
        <p className="mt-1 text-[12px] text-[rgba(238,231,223,0.65)]">Gaze Furnishings standard build · made to order in 14–21 days</p>
      </div>
    </div>
  );

  if (layout === 'stacked')
    return (
      <div className="flex flex-col gap-10">
        {preview}
        {phases}
      </div>
    );

  return (
    <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
      <div className="lg:sticky lg:top-[96px]">{preview}</div>
      {phases}
    </div>
  );
}
