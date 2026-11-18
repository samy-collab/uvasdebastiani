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
  address: undefined,
  directionsUrl: undefined,
  openingHours: undefined,
  whatsapp: undefined,
  instagram: 'debastianiuvas',
};

export const navLinks: NavLink[] = [
  { label: 'Uvas de mesa', href: '#uvas-de-mesa' },
  { label: 'Tradicionais', href: '#uvas-tradicionais' },
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
