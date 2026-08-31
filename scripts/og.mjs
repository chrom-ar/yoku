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
const EMAIL = 'yoku@chrom.ar';
const W = 1200;
const H = 630;

const copy = {
  en: {
    headline: ['An attacker', 'on your side.'],
    cta: 'Book an assessment',
  },
  es: {
    headline: ['Un atacante', 'de tu lado.'],
    cta: 'Agenda una evaluación',
  },
};

const fonts = [
  { name: 'JetBrains Mono', weight: 400, data: await readFile(require.resolve('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff')) },
  { name: 'JetBrains Mono', weight: 600, data: await readFile(require.resolve('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff')) },
  { name: 'JetBrains Mono', weight: 700, data: await readFile(require.resolve('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff')) },
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
  const arrow = {
    type: 'svg',
    props: {
      width: 24, height: 24, viewBox: '0 0 16 16', fill: 'none', stroke: BG, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
      children: [
        { type: 'path', props: { d: 'M3 8h10' } },
        { type: 'path', props: { d: 'M9 4l4 4-4 4' } },
      ],
    },
  };
  return {
    type: 'div',
    props: {
      style: { width: W, height: H, display: 'flex', background: BG, color: FG, fontFamily: 'JetBrains Mono', position: 'relative' },
      children: [
        ...sphere({ cx: 930, cy: 315, R: 225, count: 700, seed: 20240913 }),
        {
          type: 'div',
          props: {
            style: { position: 'absolute', left: 72, top: 60, display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, fontWeight: 700, letterSpacing: 2.4 },
            children: [
              { type: 'div', props: { style: { width: 15, height: 15, background: ACCENT } } },
              { type: 'span', props: { children: 'YOKU' } },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { position: 'absolute', left: 72, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 44, width: 640 },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', fontSize: 80, fontWeight: 600, lineHeight: 1.02, letterSpacing: -2.8 },
                  children: t.headline.map((line) => ({ type: 'span', props: { children: line } })),
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: 28 },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', alignItems: 'center', gap: 12, height: 60, padding: '0 26px', background: ACCENT, color: BG, borderRadius: 4, fontSize: 22, fontWeight: 600 },
                        children: [{ type: 'span', props: { children: t.cta } }, arrow],
                      },
                    },
                    { type: 'span', props: { style: { fontSize: 20, color: MUTED }, children: EMAIL } },
                  ],
                },
              },
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
