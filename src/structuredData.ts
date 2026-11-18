import { geo, site } from './data/site';

/**
 * Dados estruturados (schema.org) que o Google usa para entender o negócio:
 * nome, endereço, contato e perfis. Só entram campos já confirmados em `site.ts`.
 */
export function structuredData(): object {
  const sameAs = [
    site.instagram && `https://www.instagram.com/${site.instagram}/`,
    site.googleProfileUrl,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${site.url}/#negocio`,
        name: site.name,
        alternateName: 'Uvas De Bastiani',
        description:
          'Família produtora de uvas de mesa e uvas tradicionais em Serafina Corrêa, RS, desde 2010. Vende uvas, sucos, geleias e kits presente e abre a propriedade para dias de colheita.',
        url: `${site.url}/`,
        logo: `${site.url}/brand/logo.webp`,
        image: [`${site.url}/og-image.jpg`, `${site.url}/media/mesa-cachos-grandes.webp`],
        foundingDate: String(site.since),
        ...(site.whatsapp && { telephone: `+${site.whatsapp}` }),
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Aparecida',
          addressLocality: site.city,
          addressRegion: site.stateAbbr,
          postalCode: '99250-000',
          addressCountry: 'BR',
        },
        geo: { '@type': 'GeoCoordinates', ...geo },
        hasMap: site.directionsUrl,
        areaServed: [site.city, 'Serra Gaúcha', site.state],
        sameAs,
        makesOffer: ['Uvas de mesa', 'Uvas tradicionais', 'Suco de uva', 'Geleias', 'Kits presente', 'Dia de colheita'].map(
          (name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Product', name } }),
        ),
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#site`,
        url: `${site.url}/`,
        name: site.name,
        inLanguage: 'pt-BR',
        publisher: { '@id': `${site.url}/#negocio` },
      },
    ],
  };
}
