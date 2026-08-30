// Generates the OpenGraph images and the Apple touch icon into public/.
// Runs before `astro build` (see the `prebuild` script). Text is rendered to
// paths by satori, so no system fonts are needed.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const require = createRequire(import.meta.url);
const out = new URL('../public/', import.meta.url);

const BG = '#0a0a0c';
const FG = '#ededf0';
const MUTED = '#8b8b94';
const ACCENT = '#f3b942';
const W = 1200;
const H = 630;

const copy = {
  en: {
    eyebrow: 'OFFENSIVE SECURITY · PENETRATION TESTING',
    headline: ['We get', 'in first.'],
    sub: 'Manual pentesting. Findings your engineers can fix — not a scanner export.',
  },
  es: {
    eyebrow: 'SEGURIDAD OFENSIVA · PRUEBAS DE PENETRACIÓN',
    headline: ['Entramos', 'primero.'],
    sub: 'Pentesting manual. Hallazgos que tus ingenieros pueden corregir — no el volcado de un escáner.',
  },
};

const fonts = [
  { name: 'JetBrains Mono', weight: 400, data: await readFile(require.resolve('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff')) },
  { name: 'JetBrains Mono', weight: 600, data: await readFile(require.resolve('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff')) },
  { name: 'JetBrains Mono', weight: 700, data: await readFile(require.resolve('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff')) },
  { name: 'Instrument Sans', weight: 400, data: await readFile(require.resolve('@fontsource/instrument-sans/files/instrument-sans-latin-400-normal.woff')) },
];

// Deterministic PRNG so the glyph sphere is identical on every build.
function mulberry32(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A frozen frame of the site's glyph sphere: points on a Fibonacci sphere,
// rotated, projected, and drawn as absolutely positioned glyphs.
function sphere({ cx, cy, R, count, seed }) {
  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]()<>/\\|;:=+-*&%$#@!?~^';
  const GOLD = Math.PI * (3 - Math.sqrt(5));
  const rand = mulberry32(seed);
  const rotY = 0.6, tilt = -0.42;
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY), cosX = Math.cos(tilt), sinX = Math.sin(tilt);
  const pts = [];
  for (let i = 0; i < count; i++) {
    const y0 = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y0 * y0));
    const th = GOLD * i;
    const x0 = Math.cos(th) * r, z0 = Math.sin(th) * r;
    const x = x0 * cosY + z0 * sinY;
    let z = -x0 * sinY + z0 * cosY;
    const y = y0 * cosX - z * sinX;
    z = y0 * sinX + z * cosX;
    pts.push({ x: cx + x * R, y: cy - y * R, d: (z + 1) / 2, ch: GLYPHS[(rand() * GLYPHS.length) | 0], hot: rand() < 0.035 });
  }
  pts.sort((a, b) => a.d - b.d);
  const base = R * 0.052;
  return pts.map((p) => {
    const alpha = 0.05 + 0.95 * Math.pow(p.d, 1.9);
    if (alpha < 0.03) return null;
    const size = base * (0.6 + 0.55 * p.d);
    return {
      type: 'span',
      props: {
        style: {
          position: 'absolute',
          left: p.x - size, top: p.y - size,
          width: size * 2, height: size * 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'JetBrains Mono', fontSize: size, lineHeight: 1,
          color: p.hot ? ACCENT : FG, opacity: p.hot ? Math.min(1, alpha * 1.2) : alpha,
        },
        children: p.ch,
      },
    };
  }).filter(Boolean);
}

function card(t) {
  return {
    type: 'div',
    props: {
      style: { width: W, height: H, display: 'flex', flexDirection: 'column', background: BG, color: FG, fontFamily: 'JetBrains Mono', position: 'relative' },
      children: [
        ...sphere({ cx: 930, cy: 300, R: 215, count: 700, seed: 20240913 }),
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', gap: 14, padding: '44px 64px 0', fontSize: 22, fontWeight: 700, letterSpacing: 2.2 },
            children: [
              { type: 'div', props: { style: { width: 14, height: 14, background: ACCENT } } },
              { type: 'span', props: { children: 'YOKU' } },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: 26, padding: '70px 64px 0', width: 720 },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: 14, fontSize: 17, letterSpacing: 2, color: MUTED },
                  children: [
                    { type: 'div', props: { style: { width: 8, height: 8, borderRadius: 4, background: ACCENT } } },
                    { type: 'span', props: { children: t.eyebrow } },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', fontSize: 92, fontWeight: 600, lineHeight: 0.98, letterSpacing: -3.2 },
                  children: t.headline.map((line) => ({ type: 'span', props: { children: line } })),
                },
              },
              {
                type: 'div',
                props: { style: { fontFamily: 'Instrument Sans', fontSize: 26, lineHeight: 1.45, color: '#a1a1aa', width: 560 }, children: t.sub },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', gap: 16, padding: '20px 64px', borderTop: `1px solid rgba(255,255,255,0.08)`, fontSize: 17, color: MUTED, letterSpacing: 0.4 },
            children: [
              { type: 'span', props: { style: { color: ACCENT }, children: 'yoku@ops:~$' } },
              { type: 'span', props: { children: 'scope --web --api --cloud --network --red-team' } },
              { type: 'div', props: { style: { width: 10, height: 19, background: ACCENT } } },
              { type: 'span', props: { style: { marginLeft: 'auto', color: '#5c5c66' }, children: 'yoku.chrom.ar' } },
            ],
          },
        },
      ],
    },
  };
}

function toPng(svg, width) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
}

await mkdir(out, { recursive: true });

for (const [locale, t] of Object.entries(copy)) {
  const svg = await satori(card(t), { width: W, height: H, fonts });
  await writeFile(new URL(`og-${locale}.png`, out), toPng(svg, W));
  console.log(`og-${locale}.png`);
}

const favicon = await readFile(new URL('favicon.svg', out), 'utf8');
await writeFile(new URL('apple-touch-icon.png', out), toPng(favicon, 180));
console.log('apple-touch-icon.png');
