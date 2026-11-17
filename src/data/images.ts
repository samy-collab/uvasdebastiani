/**
 * Registro central das fotos do site.
 *
 * Para trocar uma foto provisória pela real: salve o arquivo em public/images/
 * (de preferência com o mesmo nome, em 4:3), ajuste `alt`, `focalPoint` e
 * `width`/`height`, marque `placeholder: false` e remova `credit`.
 */

export interface ImageCredit {
  author: string;
  authorUrl: string;
  source: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  /** Alterações feitas no original — exigido por licenças CC BY-SA. */
  changes?: string;
}

export interface SiteImage {
  src: string;
  /** Versões em larguras menores para `srcset`. */
  variants?: { src: string; width: number }[];
  width: number;
  height: number;
  alt: string;
  /** Valor de `object-position`: o ponto da foto que nunca deve sair do corte. */
  focalPoint: string;
  fit?: 'cover' | 'contain';
  /** `true` exibe o selo "Imagem ilustrativa". */
  placeholder: boolean;
  credit?: ImageCredit;
}

const UNSPLASH_LICENSE = {
  source: 'Unsplash',
  license: 'Licença Unsplash',
  licenseUrl: 'https://unsplash.com/license',
};

export const images = {
  hero: {
    src: '/images/hero-vinhedo.webp',
    variants: [{ src: '/images/hero-vinhedo-960.webp', width: 960 }],
    width: 1600,
    height: 1200,
    alt: 'Fileiras de parreiras em um vinhedo iluminado pelo sol, seguindo até o horizonte',
    focalPoint: '50% 42%',
    placeholder: true,
    credit: {
      ...UNSPLASH_LICENSE,
      author: 'Lucas Gallone',
      authorUrl: 'https://unsplash.com/@lucasgallone',
      sourceUrl: 'https://unsplash.com/photos/rows-of-grapevines-in-a-sunlit-vineyard-DPNmKutv5D4',
    },
  },
  productGrapes: {
    src: '/images/produto-uvas.webp',
    variants: [{ src: '/images/produto-uvas-640.webp', width: 640 }],
    width: 1200,
    height: 900,
    alt: 'Cachos de uvas verdes pendurados na parreira, entre folhas e ramos',
    focalPoint: '55% 50%',
    placeholder: true,
    credit: {
      ...UNSPLASH_LICENSE,
      author: 'Being Organic in EU',
      authorUrl: 'https://unsplash.com/@beingorganicineu',
      sourceUrl: 'https://unsplash.com/photos/a-bunch-of-green-grapes-hanging-from-a-vine-AS3zFfw3n6U',
    },
  },
  productJams: {
    src: '/images/produto-geleias.webp',
    variants: [{ src: '/images/produto-geleias-640.webp', width: 640 }],
    width: 1200,
    height: 900,
    alt: 'Pote de vidro com geleia escura e uma colher servindo a geleia',
    focalPoint: '40% 50%',
    placeholder: true,
    credit: {
      author: 'Boryslav Shoot',
      authorUrl: 'https://www.pexels.com/@boryslav/',
      source: 'Pexels',
      sourceUrl: 'https://www.pexels.com/photo/jam-in-jar-15209691/',
      license: 'Licença Pexels',
      licenseUrl: 'https://www.pexels.com/license/',
    },
  },
  productJuices: {
    src: '/images/produto-sucos.webp',
    variants: [{ src: '/images/produto-sucos-640.webp', width: 640 }],
    width: 1200,
    height: 900,
    alt: 'Copo de vidro com suco de uva roxo sobre fundo claro',
    focalPoint: '50% 50%',
    fit: 'contain',
    placeholder: true,
    credit: {
      author: 'Oyp',
      authorUrl: 'https://commons.wikimedia.org/wiki/User:Oyp',
      source: 'Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Glass_of_grape_juice.jpeg',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/deed.pt-br',
      changes: 'enquadrada em 4:3 e fundo tingido de creme',
    },
  },
  aboutHarvest: {
    src: '/images/cultivo-colheita.webp',
    variants: [{ src: '/images/cultivo-colheita-640.webp', width: 640 }],
    width: 1200,
    height: 900,
    alt: 'Mão segurando pelo talo um cacho de uvas vermelhas, com folhagem de outono ao fundo',
    focalPoint: '70% 40%',
    placeholder: true,
    credit: {
      ...UNSPLASH_LICENSE,
      author: 'Marek Studzinski',
      authorUrl: 'https://unsplash.com/@jccards',
      sourceUrl: 'https://unsplash.com/photos/a-person-holding-a-bunch-of-grapes-in-their-hand-fHsPJgdBOqc',
    },
  },
} satisfies Record<string, SiteImage>;

export const imageCredits: ImageCredit[] = Object.values(images).flatMap((image: SiteImage) =>
  image.credit ? [image.credit] : [],
);
