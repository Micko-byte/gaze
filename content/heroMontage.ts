/**
 * The Holdings hero, after Natuzzi's landing but cut for her footage (28 Oct 2026): her films are phone-shot and
 * vertical, so instead of one film stretched full screen, four tall panels play side by side at their own quality,
 * films and photographs together, and every few seconds the panels change, one after another, to the next house.
 * Films are short silent cuts in public/video/holdings; photographs are her own (Furnishings, Manor) or the
 * Institute's.
 */
export type MontageMedia = { video: string; poster: string } | { image: string };
export type MontageChapter = { house: string; panels: [MontageMedia, MontageMedia, MontageMedia, MontageMedia] };

const v = (name: string): MontageMedia => ({ video: `/video/holdings/${name}.mp4`, poster: `/video/holdings/${name}.jpg` });
const m = (name: string): MontageMedia => ({ video: `/video/manor/${name}.mp4`, poster: `/video/manor/${name}.jpg` });
const furn = (name: string): MontageMedia => ({ image: `/images/furnishings/${name}.jpg` });
const inst = (name: string): MontageMedia => ({ image: `/images/institute/${name}.jpg` });
const manor = (name: string): MontageMedia => ({ image: `/images/manor/${name}.jpg` });

/* It opens on her New York films, the skyline first (her request, 28 Oct 2026). */
export const montage: ReadonlyArray<MontageChapter> = [
  { house: 'Gaze Holdings · The world', panels: [v('city-aerial'), v('city-night'), v('city-skybox'), v('city-penthouse')] },
  { house: 'Gaze Furnishings · Living', panels: [v('living-showroom'), furn('curved-sofa-mink'), v('living-armchair'), furn('sofa-olive-room')] },
  { house: 'Gaze Furnishings · Outdoor', panels: [v('outdoor-pool'), furn('outdoor-daybed-round-pool'), furn('outdoor-dining-rope-sea'), furn('outdoor-daybed-round-sunset')] },
  { house: 'Gaze Leadership Institute', panels: [inst('library'), inst('lecture'), inst('hall-a'), inst('mentor')] },
  { house: 'The Gaze Manor', panels: [m('salon'), manor('atelier-great-room'), m('garden-table'), manor('evening-fireplace')] },
  { house: 'Gaze Furnishings · Interiors', panels: [v('interior-bedroom'), furn('bed-channel-lit'), v('interior-kitchen'), furn('wardrobe-lit-niche')] },
];

/** How long each house holds the screen before the panels change. */
export const MONTAGE_HOLD_MS = 6500;
