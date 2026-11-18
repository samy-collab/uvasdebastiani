/**
 * Dados institucionais. Campos com `undefined` ainda não foram confirmados e
 * ficam ocultos no site até serem preenchidos.
 */

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface SiteInfo {
  name: string;
  city: string;
  state: string;
  stateAbbr: string;
  /** Ano de início do cultivo, como aparece na logo. */
  since: number;
  googleProfileUrl: string;
  /** Endereço completo, ex.: "Linha ..., s/n – Interior, Serafina Corrêa – RS, 99250-000". */
  address?: string;
  /** Link de rota (Google Maps). */
  directionsUrl?: string;
  /** Endereço do mapa incorporado na seção Localização (Google Maps com `output=embed`). */
  mapEmbedUrl?: string;
  /** Uma linha por faixa de horário, ex.: "Segunda a sábado, 8h às 18h". */
  openingHours?: string[];
  /** Somente dígitos, com DDI e DDD, ex.: "5554999999999". */
  whatsapp?: string;
  /** Usuário sem @. */
  instagram?: string;
}

export const site: SiteInfo = {
  name: 'Uvas de mesa De Bastiani',
  city: 'Serafina Corrêa',
  state: 'Rio Grande do Sul',
  stateAbbr: 'RS',
  since: 2010,
  googleProfileUrl: 'https://www.google.com/search?kgmid=%2Fg%2F11yw2pnpts',
  address: 'Aparecida, Serafina Corrêa – RS, 99250-000',
  // invariant: these coordinates are the pin of the De Bastiani listing on Google Maps
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-28.6851046,-51.9398805',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Uvas+De+Bastiani,+Serafina+Corr%C3%AAa+-+RS&z=14&output=embed',
  openingHours: undefined,
  whatsapp: '5554999142536',
  instagram: 'debastianiuvas',
};

export const navLinks: NavLink[] = [
  { label: 'Uvas de mesa', href: '#uvas-de-mesa' },
  { label: 'Tradicionais', href: '#uvas-tradicionais' },
  { label: 'Orgânico', href: '#cultivo-organico' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Colheita', href: '#colheita' },
  { label: 'Família', href: '#familia' },
  { label: 'Localização', href: '#localizacao' },
];

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

/** Contatos públicos já confirmados, na ordem em que aparecem no site. */
export function getContactLinks(info: SiteInfo = site): ContactLink[] {
  const links: ContactLink[] = [];
  if (info.whatsapp) {
    links.push({
      label: 'WhatsApp',
      value: formatPhone(info.whatsapp),
      href: `https://wa.me/${info.whatsapp}`,
    });
  }
  if (info.instagram) {
    links.push({
      label: 'Instagram',
      value: `@${info.instagram}`,
      href: `https://www.instagram.com/${info.instagram}/`,
    });
  }
  links.push({ label: 'Google', value: 'Perfil da empresa', href: info.googleProfileUrl });
  return links;
}

function formatPhone(digits: string): string {
  const match = /^55(\d{2})(\d{4,5})(\d{4})$/.exec(digits);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : digits;
}
