import { images, type SiteImage } from './images';

/** Uma variedade, sabor ou embalagem dentro de uma categoria. */
export interface ProductItem {
  name: string;
  /** Detalhe curto: época de colheita, tamanho da embalagem etc. */
  detail?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: SiteImage;
  /** Título da lista de itens, ex.: "Variedades", "Sabores", "Embalagens". */
  itemsLabel?: string;
  /** Lista vazia mantém o card só com a descrição. */
  items: ProductItem[];
}

export const products: Product[] = [
  {
    id: 'uvas',
    title: 'Uvas de mesa',
    description:
      'Cultivadas pela nossa família em Serafina Corrêa, com atenção a cada cacho, da parreira até a sua mesa.',
    image: images.productGrapes,
    itemsLabel: 'Variedades',
    items: [],
  },
  {
    id: 'geleias',
    title: 'Geleias',
    description: 'Para acompanhar o café da manhã, o pão caseiro e a sobremesa.',
    image: images.productJams,
    itemsLabel: 'Sabores',
    items: [],
  },
  {
    id: 'sucos',
    title: 'Sucos',
    description: 'Para servir à mesa e compartilhar com toda a família.',
    image: images.productJuices,
    itemsLabel: 'Embalagens',
    items: [],
  },
];
