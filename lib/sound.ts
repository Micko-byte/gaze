'use client';

/**
 * Site sound. Everything sits behind one Music toggle (kept per visitor, on by default):
 *  · music   — each house has its own ambient loop (public/sounds/music-<house>.mp3); moving between houses
 *              crossfades, and scrolling opens the sound up (a filter that brightens with scroll speed)
 *  · cues    — the page-transition and loader sounds (cue-<house>.mp3, intro-holdings.mp3)
 *  · clicks  — a soft wooden tap on links and buttons, synthesised
 * Browsers allow audio only after the visitor clicks or presses a key, so nothing plays before that.
 */
export type HouseKey = 'holdings' | 'furnishings' | 'institute' | 'hergaze' | 'press';
export type CueId = 'intro-holdings' | `cue-${HouseKey}`;

const KEY = 'gaze.sound';
const MUSIC_LEVEL = 0.55;
type Listener = (on: boolean) => void;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let musicBus: GainNode | null = null;
let musicFilter: BiquadFilterNode | null = null;
let unlocked = false;
const listeners = new Set<Listener>();

function stored(): boolean {
  try {
    return localStorage.getItem(KEY) !== 'off';
  } catch {
    return true;
  }
}

let enabled = typeof window !== 'undefined' ? stored() : true;

function context(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) {
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = enabled ? 0.9 : 0;
    master.connect(ctx.destination);
    musicFilter = ctx.createBiquadFilter();
    musicFilter.type = 'lowpass';
    musicFilter.frequency.value = 2200;
    musicFilter.Q.value = 0.4;
    musicBus = ctx.createGain();
    musicBus.gain.value = MUSIC_LEVEL;
    musicBus.connect(musicFilter).connect(master);
  }
  return ctx;
}

function ready(): AudioContext | null {
  return enabled && unlocked && ctx && master && ctx.state === 'running' ? ctx : null;
}

export function soundEnabled(): boolean {
  return enabled;
}

export function audioReady(): boolean {
  return ready() !== null;
}

export function onSoundChange(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** The Music toggle: fades everything in or out and remembers the choice. */
export function setSoundEnabled(on: boolean): void {
  enabled = on;
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    /* storage blocked */
  }
  listeners.forEach((fn) => fn(on));
  const ac = context();
  if (ac && master) master.gain.setTargetAtTime(on ? 0.9 : 0, ac.currentTime, 0.25);
  if (on) {
    unlockAudio();
    if (wantedHouse) void playMusic(wantedHouse);
  }
}

/** Call from a user gesture; resumes audio and starts the current house's music. */
export function unlockAudio(): void {
  const ac = context();
  if (!ac) return;
  const start = () => {
    unlocked = true;
    if (enabled && wantedHouse && !current) void playMusic(wantedHouse);
  };
  if (ac.state === 'suspended') void ac.resume().then(start);
  else start();
}

/** Try to start audio without a gesture (allowed for sites a visitor already engages with often). */
export async function tryAutoplay(): Promise<boolean> {
  const ac = context();
  if (!ac || !enabled) return false;
  if (ac.state !== 'running') {
    await Promise.race([ac.resume().catch(() => undefined), new Promise((r) => setTimeout(r, 300))]);
  }
  if (ac.state === 'running') unlocked = true;
  return ac.state === 'running';
}

/* ── buffers ── */
const buffers = new Map<string, Promise<AudioBuffer | null>>();

function load(name: string): Promise<AudioBuffer | null> {
  const existing = buffers.get(name);
  if (existing) return existing;
  const ac = context();
  const p = ac
    ? fetch(`/sounds/${name}.mp3`)
        .then((r) => r.arrayBuffer())
        .then((b) => ac.decodeAudioData(b))
        .catch(() => null)
    : Promise.resolve(null);
  buffers.set(name, p);
  return p;
}

export function preloadCue(id: CueId): Promise<AudioBuffer | null> {
  return load(id);
}

export function preloadMusic(house: HouseKey): Promise<AudioBuffer | null> {
  return load(`music-${house}`);
}

/* ── music: one loop per house, crossfaded ── */
let wantedHouse: HouseKey | null = null;
let current: { house: HouseKey; source: AudioBufferSourceNode; gain: GainNode } | null = null;

async function playMusic(house: HouseKey): Promise<void> {
  const buffer = await load(`music-${house}`);
  const ac = ready();
  if (!buffer || !ac || !musicBus || wantedHouse !== house || current?.house === house) return;
  const source = ac.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.loopStart = 0;
  source.loopEnd = Math.min(32, buffer.duration);
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(1, ac.currentTime + 1.6);
  source.connect(gain).connect(musicBus);
  source.start();
  const previous = current;
  current = { house, source, gain };
  if (previous) {
    previous.gain.gain.setTargetAtTime(0.0001, ac.currentTime, 0.45);
    previous.source.stop(ac.currentTime + 2.5);
  }
}

/** Set which house's music should play (on every route change). Starts once audio is allowed. */
export function setMusicHouse(house: HouseKey): void {
  wantedHouse = house;
  void playMusic(house);
}

/** Lower the music under a cue for `seconds`, then bring it back. */
function duck(seconds: number): void {
  const ac = ready();
  if (!ac || !musicBus) return;
  const t = ac.currentTime;
  musicBus.gain.cancelScheduledValues(t);
  musicBus.gain.setTargetAtTime(MUSIC_LEVEL * 0.35, t, 0.08);
  musicBus.gain.setTargetAtTime(MUSIC_LEVEL, t + Math.max(0.2, seconds), 0.5);
}

/** Scrolling opens the music up: speed 0–1 brightens the filter and lifts it slightly. */
export function scrollEnergy(speed: number): void {
  const ac = ready();
  if (!ac || !musicFilter) return;
  const s = Math.max(0, Math.min(1, speed));
  musicFilter.frequency.setTargetAtTime(2200 + s * 7000, ac.currentTime, 0.12);
  if (current) current.gain.gain.setTargetAtTime(1 + s * 0.35, ac.currentTime, 0.2);
}

/* ── cues ── */
/** Play a cue, optionally from `offset` seconds in. Returns a stop function. */
export function playCue(id: CueId, offset = 0): () => void {
  let source: AudioBufferSourceNode | null = null;
  let gain: GainNode | null = null;
  let stopped = false;
  void load(id).then((buffer) => {
    const ac = ready();
    if (stopped || !buffer || !ac || !master || offset >= buffer.duration) return;
    duck(buffer.duration - offset - 0.6);
    source = ac.createBufferSource();
    source.buffer = buffer;
    gain = ac.createGain();
    source.connect(gain).connect(master);
    source.start(ac.currentTime, offset);
  });
  return () => {
    stopped = true;
    if (source && gain && ctx) {
      gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.08);
      source.stop(ctx.currentTime + 0.4);
    }
  };
}

/* ── clicks ── */
function noiseBuffer(ac: AudioContext, seconds: number): AudioBuffer {
  const buf = ac.createBuffer(1, Math.ceil(ac.sampleRate * seconds), ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

/** A soft wooden tap for links and buttons. */
export function click(): void {
  const ac = ready();
  if (!ac || !master) return;
  const t = ac.currentTime;
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac, 0.06);
  const bp = ac.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 2400;
  bp.Q.value = 0.9;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.7, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
  src.connect(bp).connect(g).connect(master);
  src.start(t);
  const osc = ac.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1300, t);
  osc.frequency.exponentialRampToValueAtTime(620, t + 0.07);
  const og = ac.createGain();
  og.gain.setValueAtTime(0.16, t);
  og.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
  osc.connect(og).connect(master);
  osc.start(t);
  osc.stop(t + 0.1);
}
