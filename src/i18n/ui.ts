export const EMAIL = 'yoru@chrom.ar';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const ui = {
  en: {
    title: 'Yoru — Manual penetration testing',
    description: 'Manual pentesting. Findings your engineers can fix — not a scanner export.',
    contact: 'Contact',
    switchLabel: 'ES',
    cta: 'Book an assessment',
    ctaSubject: 'Assessment request',
    eyebrow: 'Offensive security · Penetration testing',
    headline: 'We get in first.',
    sub: 'Manual pentesting. Findings your engineers can fix — not a scanner export.',
    sample: 'Request a sample report',
    sampleSubject: 'Sample report request',
    sphereLabel: 'Rotating sphere made of code glyphs',
  },
  es: {
    title: 'Yoru — Pruebas de penetración manuales',
    description: 'Pentesting manual. Hallazgos que tus ingenieros pueden corregir — no el volcado de un escáner.',
    contact: 'Contacto',
    switchLabel: 'EN',
    cta: 'Agenda una evaluación',
    ctaSubject: 'Solicitud de evaluación',
    eyebrow: 'Seguridad ofensiva · Pruebas de penetración',
    headline: 'Entramos primero.',
    sub: 'Pentesting manual. Hallazgos que tus ingenieros pueden corregir — no el volcado de un escáner.',
    sample: 'Solicita un informe de ejemplo',
    sampleSubject: 'Solicitud de informe de ejemplo',
    sphereLabel: 'Esfera giratoria hecha de glifos de código',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export function t(locale: Locale) {
  return ui[locale];
}

export function mailto(subject: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export function localePath(locale: Locale) {
  return locale === 'en' ? '/' : `/${locale}/`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en';
}
