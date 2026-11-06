/**
 * Puts the prices she sent from /furnishings/price-list onto the website.
 *
 *   npm run prices                    reads her WhatsApp message from the clipboard (copy it first)
 *   npm run prices -- message.txt     reads it from a file instead
 *   npm run prices -- --push          also commits and pushes, which redeploys the site
 *
 * The prices go through the same checks as the site's own save (lib/priceSheet.ts), so a bad code changes nothing.
 * Node loads the TypeScript files directly (Node 22.18 or later).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { decodePriceCode } from '../lib/priceCode.ts';
import { cleanSheet } from '../lib/priceSheet.ts';
import { pieces } from '../content/furnishings.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const target = fileURLToPath(new URL('../content/prices.json', import.meta.url));
const args = process.argv.slice(2);
const push = args.includes('--push');
const file = args.find((a) => !a.startsWith('--'));

const fail = (msg) => {
  console.error(`\n  ${msg}\n  Nothing was changed.\n`);
  process.exit(1);
};
const git = (...a) => execFileSync('git', a, { cwd: root, stdio: 'inherit' });
const kes = (n) => `KES ${n.toLocaleString('en-KE')}`;

function clipboard() {
  if (process.platform === 'win32') return execFileSync('powershell', ['-NoProfile', '-Command', 'Get-Clipboard -Raw'], { encoding: 'utf8' });
  if (process.platform === 'darwin') return execFileSync('pbpaste', { encoding: 'utf8' });
  return execFileSync('xclip', ['-selection', 'clipboard', '-o'], { encoding: 'utf8' });
}

let text;
try {
  text = file ? readFileSync(file, 'utf8') : clipboard();
} catch {
  fail(file ? `Couldn't read ${file}.` : "Couldn't read the clipboard. Save her message to a file and pass its name.");
}

let sent;
try {
  sent = await decodePriceCode(text ?? '');
} catch (e) {
  fail(e instanceof Error ? e.message : 'That price code could not be read.');
}

const checked = cleanSheet(sent, new Set(pieces.map((p) => p.slug)));
if (!checked.ok) fail(checked.error);
const sheet = checked.sheet;

// her prices were sent from what was live on her phone, so they replace the file whole; show what that changes
if (push) git('pull', '--ff-only');
const before = JSON.parse(readFileSync(target, 'utf8'));
const name = Object.fromEntries(pieces.map((p) => [p.slug, p.name]));
const changes = [];

const labels = { extraStepKes: 'Made to measure, KES per step', extraStepFt: 'Made to measure, ft per step', twoSeaterPct: '2-seater, % of 3-seater', oneSeaterPct: '1-seater, % of 3-seater' };
for (const [k, label] of Object.entries(labels)) {
  if (before.settings[k] !== sheet.settings[k]) changes.push(`  ${label}: ${before.settings[k]} → ${sheet.settings[k]}`);
}
for (const slug of new Set([...Object.keys(before.pieces), ...Object.keys(sheet.pieces)])) {
  const a = before.pieces[slug] ?? {};
  const b = sheet.pieces[slug] ?? {};
  const parts = [];
  if (a.price !== b.price) parts.push(b.price === undefined ? 'price removed, back to the sample' : a.price ? `${kes(a.price)} → ${kes(b.price)}` : kes(b.price));
  if (a.size !== b.size) parts.push(b.size === undefined ? 'size back to the sample' : `size "${b.size}"`);
  if (a.ft !== b.ft) parts.push(b.ft === undefined ? 'length back to the sample' : `${b.ft} ft standard`);
  if (parts.length) changes.push(`  ${name[slug] ?? slug}: ${parts.join(', ')}`);
}

if (!changes.length) {
  console.log('\n  These prices are already on the site. Nothing to do.\n');
  process.exit(0);
}

writeFileSync(target, `${JSON.stringify(sheet, null, 2)}\n`);
const priced = Object.values(sheet.pieces).filter((p) => p.price !== undefined).length;
console.log(`\n  ${changes.length} change${changes.length === 1 ? '' : 's'} (${priced} of ${pieces.length} pieces now priced):\n${changes.join('\n')}\n`);

if (push) {
  git('add', 'content/prices.json');
  git('commit', '-q', '-m', `Prices from her price list: ${priced} of ${pieces.length} pieces priced`);
  git('push', '-q', 'origin', 'HEAD');
  console.log('\n  Pushed. The site will show her prices once Vercel has deployed, usually within a minute or two.\n');
} else {
  console.log('  Saved to content/prices.json. Check it, then commit and push, or run again with --push.\n');
}
