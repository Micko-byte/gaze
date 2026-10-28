'use client';

import { useSyncExternalStore } from 'react';
import type { Configuration } from '@/content/furnishings';

/** One line in the Gaze Furnishings bag: a piece in the client's chosen fabric, colour and finish. */
export type BagItem = {
  key: string;
  slug: string;
  name: string;
  photo?: string;
  config: Configuration;
  /** What the configuration reads as: "Midnight Navy Bouclé with Brass Accents". */
  described: string;
  size: 'standard' | 'custom';
  qty: number;
  imported?: boolean;
};

const KEY = 'gaze.furn.bag.v1';
const EMPTY: BagItem[] = [];
let items: BagItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    if (Array.isArray(saved)) items = saved;
  } catch {
    /* a private window, or nothing saved: start empty */
  }
}

function commit(next: BagItem[]) {
  items = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable: the bag still works for this visit */
  }
  listeners.forEach((l) => l());
}

/** The bag lives in this browser (localStorage), so it survives moving between pages and coming back later. */
export const bag = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get() {
    load();
    return items;
  },
  add(item: Omit<BagItem, 'key'>) {
    load();
    const key = `${item.slug}|${item.described}|${item.size}`;
    const same = items.find((i) => i.key === key);
    commit(same ? items.map((i) => (i === same ? { ...i, qty: i.qty + item.qty } : i)) : [...items, { ...item, key }]);
  },
  setQty(key: string, qty: number) {
    commit(qty < 1 ? items.filter((i) => i.key !== key) : items.map((i) => (i.key === key ? { ...i, qty } : i)));
  },
  remove(key: string) {
    commit(items.filter((i) => i.key !== key));
  },
  clear() {
    commit(EMPTY);
  },
};

export function useBag(): BagItem[] {
  return useSyncExternalStore(bag.subscribe, bag.get, () => EMPTY);
}

/** Opens the bag drawer from anywhere in Gaze Furnishings (the drawer lives in the header). */
export const openBag = () => window.dispatchEvent(new Event('gaze:bag'));
