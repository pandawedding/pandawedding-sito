import { site } from './site';
import { ui, type Lang } from '../i18n';

// Dati strutturati (JSON-LD) per Google: l'attività e il sito, ripetuti su ogni pagina
// e collegati tra loro con @id.
export const businessId = (origin: URL) => new URL('/#business', origin).href;
export const websiteId = (origin: URL) => new URL('/#website', origin).href;

export function baseSchema(origin: URL, lang: Lang, image?: string) {
  const url = new URL('/', origin).href;
  return [
    {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': businessId(origin),
      name: site.name,
      legalName: site.company.name,
      description: ui[lang].description,
      url,
      email: site.email,
      telephone: site.phone,
      ...(image && { image }),
      ...(site.company.vat && { vatID: site.company.vat }),
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.company.street,
        postalCode: site.company.postalCode,
        addressLocality: site.company.locality,
        addressRegion: site.company.region,
        addressCountry: 'IT',
      },
      areaServed: [
        { '@type': 'City', name: 'Verona' },
        { '@type': 'Country', name: 'Italia' },
      ],
      knowsAbout: ['Wedding photography', 'Wedding videography', 'Fotografia di matrimonio', 'Videografia di matrimonio'],
      founder: [
        { '@type': 'Person', name: 'Pierluigi' },
        { '@type': 'Person', name: 'Alberto Molinaroli' },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: site.email,
        telephone: site.phone,
        availableLanguage: ['Italian', 'English'],
      },
      ...(site.sameAs.length && { sameAs: site.sameAs }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': websiteId(origin),
      url,
      name: site.name,
      inLanguage: ['en-US', 'it-IT'],
      publisher: { '@id': businessId(origin) },
    },
  ];
}
