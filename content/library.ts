/**
 * The Gaze Press Global library: the house's own titles, and the books it has published for its authors (the client's
 * voice note, 5 Oct 2026). Titles, subtitles and authors are as printed on the covers she sent (6 Oct 2026); each
 * `poster` is her own "now available on Amazon" artwork. `tone` is the ground each book's section is set on.
 */
export type Shelf = 'house' | 'authors';

export type Book = {
  slug: string;
  title: string;
  sub: string;
  author: string;
  shelf: Shelf;
  /** Young readers' titles are marked. */
  young?: boolean;
  poster?: string;
  /** Her print cover, cut into front, spine and back: width ÷ height of the front, and spine ÷ front width. */
  faces?: { aspect: number; thickness: number };
  tone: string;
  /** Ink for text set on the tone. */
  ink: string;
};

/** Her price for every title (6 Nov 2026): KES 1,350 plus 16% VAT, and in dollars at KES 130. */
export const BOOK_BASE_KES = 1350;
export const KES_PER_USD = 130;
export const usd = (kesAmount: number) => `US$${(kesAmount / KES_PER_USD).toFixed(2)}`;

export const books: ReadonlyArray<Book> = [
  { slug: 'stay-by-design', title: 'Stay by Design', sub: 'The Power of Alignment Over Performance', author: 'Muthoni Ngugi', shelf: 'house', poster: '/images/press/books/stay-by-design.jpg', faces: { aspect: 0.688, thickness: 0.091 }, tone: '#2E3440', ink: '#ECE7DF' },
  { slug: 'the-friend-in-the-mirror', title: 'The Friend in the Mirror', sub: 'Healing What Hurts, Owning What’s Yours, and Learning to Love Well', author: 'Muthoni Ngugi', shelf: 'house', poster: '/images/press/books/the-friend-in-the-mirror.jpg', tone: '#CFC6B8', ink: '#111111' },
  { slug: 'your-voice-is-dangerous', title: 'Your Voice Is Dangerous', sub: 'When did you learn that your voice was dangerous?', author: 'Muthoni Ngugi', shelf: 'house', poster: '/images/press/books/your-voice-is-dangerous.jpg', tone: '#C99A3A', ink: '#111111' },
  { slug: 'the-artisans-anointing', title: 'The Artisan’s Anointing', sub: 'The Power That Produces Wealth', author: 'Muthoni Ngugi', shelf: 'house', poster: '/images/press/books/the-artisans-anointing.jpg', faces: { aspect: 0.673, thickness: 0.123 }, tone: '#3A3532', ink: '#ECE7DF' },
  { slug: 'my-journey-as-a-kingdom-wife-to-be', title: 'My Journey as a Kingdom Wife to Be', sub: 'Embracing Purpose, Healing, and Wholeness on the Road to Marriage', author: 'Muthoni Ngugi', shelf: 'house', poster: '/images/press/books/my-journey-as-a-kingdom-wife.jpg', faces: { aspect: 0.685, thickness: 0.081 }, tone: '#B5776F', ink: '#111111' },
  { slug: 'children-spell-love-as-time', title: 'Children Spell Love as T-I-M-E', sub: 'A Faith-Based Guide for Single Parents', author: 'Muthoni Ngugi', shelf: 'house', poster: '/images/press/books/children-spell-love-as-time.jpg', tone: '#9DB1C6', ink: '#111111' },
  { slug: 'beyond-colonialism', title: 'Beyond Colonialism', sub: 'The Inner Architecture of Africa', author: 'Muthoni Ngugi', shelf: 'house', tone: '#6E5A48', ink: '#ECE7DF' },
  { slug: 'zarah-dubai-feels-too-much', title: 'Zarah Dubai Feels Too Much (And That’s Okay)', sub: 'A Story to Help Children Understand Their Feelings, Feel Safe, and Know They Are Never Alone', author: 'Zarah Dubai', shelf: 'authors', young: true, poster: '/images/press/books/zarah-dubai-feels-too-much.jpg', tone: '#D9AFC0', ink: '#111111' },
];
