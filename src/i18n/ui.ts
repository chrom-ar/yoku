export const EMAIL = 'yoku@chrom.ar';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const ui = {
  en: {
    title: 'Yoku — Penetration testing',
    description: 'Pentesting. Findings your engineers can fix — not a scanner export.',
    navServices: 'Services',
    navReport: 'Report',
    navPricing: 'Pricing',
    navContact: 'Contact',
    switchLabel: 'ES',
    cta: 'Book an assessment',
    ctaShort: 'Book a pentest',
    ctaSubject: 'Assessment request',
    eyebrow: 'Offensive security · Penetration testing',
    headline: 'An attacker on your side.',
    sub: 'Pentesting. Findings your engineers can fix — not a scanner export.',
    seeReport: 'See what a report looks like',
    sample: 'Request a sample report',
    sampleSubject: 'Sample report request',
    sphereLabel: 'Rotating sphere made of code glyphs',
    servicesHead: 'Everything an attacker would touch.',
    servicesNote: 'Also on request: mobile apps, thick clients, IoT, code review.',
    services: [
      { title: 'Web apps & APIs', body: 'Auth, business logic, injection — and the endpoints nobody remembers.' },
      { title: 'Cloud & infrastructure', body: 'IAM, Kubernetes, CI/CD secrets and storage on AWS, GCP and Azure.' },
      { title: 'External & internal network', body: 'From the perimeter to domain admin, the way an intruder moves.' },
      { title: 'Red team', body: 'Objective-based operations that test whether anyone notices.' },
    ],
    reportHead: 'A report your engineers will actually read.',
    reportChecks: [
      'Severity and business impact, spelled out',
      'Reproduction steps and evidence',
      'A concrete fix for every finding',
      'An executive summary you can hand to auditors',
    ],
    finding: {
      head: 'FINDING · YK-0142',
      tag: 'SAMPLE',
      severity: 'CRITICAL',
      title: 'Broken object-level authorization on invoice export',
      endpoint: 'GET /api/v2/invoices/{id}/export',
      desc: "Any authenticated user can download other tenants' invoices by changing the id. Ids are sequential — the whole customer base can be enumerated.",
      reproLabel: '— Reproduction',
      repro: ['1. Authenticate as tenant A', '2. Request invoice 48213 (tenant B)', "3. Server returns tenant B's PDF — 200 OK"],
      fixLabel: '— Fix',
      fix: 'Enforce server-side ownership checks on every object access.',
      status: 'Open · reported day 2 of 10 · retest pending',
    },
    pricing: {
      head: 'Start at USD 500.',
      sub: 'A Flash diagnostic: what an attacker sees from outside, in under 5 days.',
      flash: {
        head: 'FLASH DIAGNOSTIC',
        tag: 'UNDER 5 DAYS',
        price: 'USD 500',
        once: 'one-time',
        checks: ['Public web and exposed APIs', 'Up to 7 findings, each with a fix', 'Executive summary and a call'],
        note: 'Unauthenticated. No retest.',
        credit: 'Credited in full toward a full pentest within 90 days',
        cta: 'Book a Flash',
        ctaSubject: 'Flash diagnostic',
      },
      tiersHead: 'Full pentests',
      tiersNote: 'Attestation letter included',
      tiersCaption: 'Full pentests, side by side',
      rowLabels: { scope: 'Scope', roles: 'User roles', testing: 'Testing', retest: 'Retest' },
      tiers: [
        { name: 'Essential', price: 'USD 2,900', scope: '1 web app or API', roles: 'up to 2', testing: '4\u20135 days', retest: 'criticals \u00b7 30 days', cta: 'Book', ctaSubject: 'Essential pentest' },
        { name: 'Standard', price: 'USD 5,900', scope: 'Web app + API', roles: 'up to 4', testing: '8\u201310 days', retest: 'full \u00b7 60 days', cta: 'Book', ctaSubject: 'Standard pentest' },
        { name: 'Advanced', price: 'from USD 9,500', scope: 'Web + API + cloud or network', roles: 'unlimited', testing: '12\u201315 days', retest: 'full \u00b7 90 days', cta: 'Get a quote', ctaSubject: 'Advanced pentest' },
      ],
      cont: {
        head: 'Continuous',
        copy: 'Yearly pentest, re-assessment at month 6, unlimited retests. One fixed monthly fee.',
        prices: [
          { label: 'Essential', price: 'USD 450/mo' },
          { label: 'Standard', price: 'USD 990/mo' },
          { label: 'Advanced', price: 'custom' },
        ],
        cta: 'Ask',
        ctaSubject: 'Continuous plans',
      },
    },
    ctaHead: "Find out what they'd find.",
    copyright: '© 2026 Yoku',
    notFoundTitle: 'Yoku — Page not found',
    notFoundEyebrow: '404 · Not found',
    notFoundHeadline: 'No route to host.',
    notFoundSub: 'There is nothing at this address. It may have moved, or it never existed.',
    notFoundHome: 'Back to the start',
  },
  es: {
    title: 'Yoku — Pentesting',
    description: 'Pentesting. Hallazgos que tus ingenieros pueden corregir — no el volcado de un escáner.',
    navServices: 'Servicios',
    navReport: 'Informe',
    navPricing: 'Precios',
    navContact: 'Contacto',
    switchLabel: 'EN',
    cta: 'Agenda una evaluación',
    ctaShort: 'Agenda un pentest',
    ctaSubject: 'Solicitud de evaluación',
    eyebrow: 'Seguridad ofensiva · Pruebas de penetración',
    headline: 'Un atacante de tu lado.',
    sub: 'Pentesting. Hallazgos que tus ingenieros pueden corregir — no el volcado de un escáner.',
    seeReport: 'Mira cómo es el informe',
    sample: 'Solicita un informe de ejemplo',
    sampleSubject: 'Solicitud de informe de ejemplo',
    sphereLabel: 'Esfera giratoria hecha de glifos de código',
    servicesHead: 'Todo lo que un atacante tocaría.',
    servicesNote: 'También a pedido: apps móviles, clientes de escritorio, IoT, revisión de código.',
    services: [
      { title: 'Web y APIs', body: 'Autenticación, lógica de negocio, inyección — y los endpoints que nadie recuerda.' },
      { title: 'Cloud e infraestructura', body: 'IAM, Kubernetes, secretos de CI/CD y almacenamiento en AWS, GCP y Azure.' },
      { title: 'Red externa e interna', body: 'Del perímetro al administrador de dominio, como se mueve un intruso.' },
      { title: 'Red team', body: 'Operaciones por objetivos que prueban si alguien se da cuenta.' },
    ],
    reportHead: 'Un informe que tus ingenieros sí van a leer.',
    reportChecks: [
      'Severidad e impacto de negocio, explicados',
      'Pasos de reproducción y evidencia',
      'Una corrección concreta por hallazgo',
      'Un resumen ejecutivo listo para auditores',
    ],
    finding: {
      head: 'HALLAZGO · YK-0142',
      tag: 'EJEMPLO',
      severity: 'CRÍTICA',
      title: 'Fallo de autorización a nivel de objeto en la exportación de facturas',
      endpoint: 'GET /api/v2/invoices/{id}/export',
      desc: 'Cualquier usuario autenticado puede descargar facturas de otros tenants cambiando el id. Los ids son secuenciales: toda la base de clientes puede enumerarse.',
      reproLabel: '— Reproducción',
      repro: ['1. Autentícate como tenant A', '2. Pide la factura 48213 (tenant B)', '3. El servidor devuelve el PDF del tenant B — 200 OK'],
      fixLabel: '— Corrección',
      fix: 'Exigir verificación de propiedad del lado del servidor en cada acceso.',
      status: 'Abierto · reportado el día 2 de 10 · retesteo pendiente',
    },
    pricing: {
      head: 'Empieza por USD 500.',
      sub: 'Un Diagnóstico Flash: lo que un atacante ve desde afuera, en menos de 5 días.',
      flash: {
        head: 'DIAGNÓSTICO FLASH',
        tag: 'MENOS DE 5 DÍAS',
        price: 'USD 500',
        once: 'pago único',
        checks: ['Web pública y APIs expuestas', 'Hasta 7 hallazgos, cada uno con su corrección', 'Resumen ejecutivo y una llamada'],
        note: 'No autenticado. Sin retest.',
        credit: 'Se acredita al 100% en un pentest completo dentro de 90 días',
        cta: 'Pedir un Flash',
        ctaSubject: 'Diagnóstico Flash',
      },
      tiersHead: 'Pentests completos',
      tiersNote: 'Carta de atestación incluida',
      tiersCaption: 'Pentests completos, comparados',
      rowLabels: { scope: 'Alcance', roles: 'Roles de usuario', testing: 'Testing', retest: 'Retest' },
      tiers: [
        { name: 'Esencial', price: 'USD 2.900', scope: '1 web app o API', roles: 'hasta 2', testing: '4\u20135 días', retest: 'críticos \u00b7 30 días', cta: 'Reservar', ctaSubject: 'Pentest Esencial' },
        { name: 'Estándar', price: 'USD 5.900', scope: 'Web app + API', roles: 'hasta 4', testing: '8\u201310 días', retest: 'completo \u00b7 60 días', cta: 'Reservar', ctaSubject: 'Pentest Estándar' },
        { name: 'Avanzado', price: 'desde USD 9.500', scope: 'Web + API + cloud o red', roles: 'sin límite', testing: '12\u201315 días', retest: 'completo \u00b7 90 días', cta: 'Cotizar', ctaSubject: 'Pentest Avanzado' },
      ],
      cont: {
        head: 'Continuo',
        copy: 'Pentest anual, re-evaluación a los 6 meses, retests ilimitados. Una cuota mensual fija.',
        prices: [
          { label: 'Esencial', price: 'USD 450/mes' },
          { label: 'Estándar', price: 'USD 990/mes' },
          { label: 'Avanzado', price: 'a medida' },
        ],
        cta: 'Consultar',
        ctaSubject: 'Planes Continuo',
      },
    },
    ctaHead: 'Descubre qué encontrarían.',
    copyright: '© 2026 Yoku',
    notFoundTitle: 'Yoku — Página no encontrada',
    notFoundEyebrow: '404 · No encontrada',
    notFoundHeadline: 'Sin ruta al host.',
    notFoundSub: 'No hay nada en esta dirección. Puede que se haya movido, o que nunca haya existido.',
    notFoundHome: 'Volver al inicio',
  },
} as const;

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
