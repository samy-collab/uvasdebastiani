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
    title: 'Uvas em caixa',
    description:
      'Cachos de diversas variedades, colhidos no ponto e acomodados em caixas para levar para casa ou presentear.',
    image: images.produtoCaixaUvas,
    itemsLabel: 'Variedades',
    items: [],
  },
  {
    id: 'sucos',
    title: 'Suco de uva',
    description: 'Em garrafa com a marca De Bastiani, para servir à mesa e dividir com a família.',
    image: images.produtoSuco,
    itemsLabel: 'Embalagens',
    items: [],
  },
  {
    id: 'geleias',
    title: 'Geleias',
    description: 'Potes de geleia e mel produzidos por nós, em embalagens perfeitas para o seu café da manhã ou lanche da tarde, tudo feito de forma artesanal.',
    image: images.produtoGeleias,
    itemsLabel: 'Sabores',
    items: [],
  },
  {
    id: 'kits',
    title: 'Kits presente',
    description: 'Caixa de madeira com suco, geleias e uvas: um presente com o sabor da nossa propriedade.',
    image: images.produtoKit,
    itemsLabel: 'Composição',
    items: [],
  },
];
