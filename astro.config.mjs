// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://yoku.chrom.ar',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      formats: ['woff2'],
      fallbacks: ['ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Instrument Sans',
      cssVariable: '--font-instrument-sans',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      formats: ['woff2'],
      fallbacks: ['system-ui', '-apple-system', 'Helvetica Neue', 'sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
