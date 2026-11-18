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
  /** Só para fotos de terceiros; aparece nos créditos do rodapé. */
  credit?: ImageCredit;
}

export interface SiteVideo {
  /** MP4 (H.264) sem áudio, tocado em loop. */
  src: string;
  /** Primeiro quadro do vídeo, mostrado antes de tocar e com movimento reduzido. */
  poster: string;
  /** Descrição do que o vídeo mostra, lida por leitores de tela. */
  label: string;
}

/** Fotos de public/media/ geradas por scripts/otimizar-midia.py: 4:5, 1200 px e variante de 640 px. */
function photo(name: string, alt: string, focalPoint = '50% 50%'): SiteImage {
  return {
    src: `/media/${name}.webp`,
    variants: [{ src: `/media/${name}-640.webp`, width: 640 }],
    width: 1200,
    height: 1500,
    alt,
    focalPoint,
    placeholder: false,
  };
}

function video(name: string, label: string): SiteVideo {
  return { src: `/media/${name}.mp4`, poster: `/media/${name}.webp`, label };
}

export const images = {
  mesaParreira: photo(
    'mesa-parreira',
    'Cachos de uva de mesa de variedades diferentes pendurados lado a lado na parreira',
    '50% 40%',
  ),
  mesaCachosGrandes: photo('mesa-cachos-grandes', 'Cachos grandes de uva de mesa pendurados sob a parreira'),
  mesaBagasAlongadas: photo('mesa-bagas-alongadas', 'Cacho de uva de mesa de bagas alongadas preso ao arame da parreira', '60% 60%'),
  mesaFileiras: photo('mesa-fileiras', 'Cachos de uva de mesa pendurados na parreira, com as fileiras ao fundo'),
  mesaCorredor: photo(
    'mesa-corredor',
    'Corredor entre fileiras de parreiras carregadas de cachos, sob cobertura plástica',
  ),
  tradicionaisCachos: photo('tradicionais-cachos', 'Cachos de uva tradicional de bagas redondas pendurados na parreira'),
  tradicionaisFolhas: photo('tradicionais-folhas', 'Cachos de uva tradicional de bagas redondas entre folhas de parreira'),
  tradicionaisParreiral: photo('tradicionais-parreiral', 'Fileira do parreiral coberta de cachos, vista de baixo'),
  tradicionaisLatada: photo(
    'tradicionais-latada',
    'Parreira com dezenas de cachos maduros pendurados em linha',
    '50% 60%',
  ),
  produtoCaixaUvas: photo(
    'produto-caixa-uvas',
    'Caixa de papelão com dois cachos de uva de mesa',
    '50% 55%',
  ),
  produtoSuco: photo(
    'produto-suco',
    'Garrafa de suco de uva De Bastiani sobre uma caixa, com o parreiral ao fundo',
    '50% 60%',
  ),
  produtoGeleias: photo(
    'produto-geleias',
    'Potes de geleia De Bastiani ao lado de garrafas de suco',
    '50% 70%',
  ),
  produtoKit: photo(
    'produto-kit',
    'Kit com garrafa de suco, potes de geleia e um cacho de uva sobre uma caixa de madeira',
    '50% 60%',
  ),
  familia: photo('familia', 'A família De Bastiani reunida no gramado, em frente ao parreiral coberto', '50% 55%'),
  criancasColheita: {
    src: '/media/criancas-colheita.webp',
    width: 294,
    height: 425,
    alt: 'Integrante da família De Bastiani sorrindo com uma tesoura de colheita, ao lado de crianças sentadas entre as parreiras com caixas de uva',
    focalPoint: '50% 50%',
    placeholder: false,
  },
  banca: photo('banca', 'Banca da propriedade com garrafas de suco, potes de geleia e cestas de uva na prateleira'),
  organicoRoseiras: photo(
    'organico-roseiras',
    'Roseiras floridas na cabeceira das fileiras de parreiras cobertas, sob céu azul',
    '50% 60%',
  ),
} satisfies Record<string, SiteImage>;

export const videos = {
  hero: video('hero-corredor', 'Caminhada entre as fileiras de parreiras carregadas de uvas'),
  heroOrganico: video('hero-organico', 'Roseiras floridas em frente às fileiras de parreiras cobertas'),
  heroCacho: video('hero-cacho', 'Cachos grandes de uva de mesa pendurados na parreira'),
  heroFamilia: video('hero-familia', 'Integrante da família De Bastiani entre as roseiras e o parreiral'),
  heroVariedades: video('hero-variedades', 'Cacho de uva de mesa de bagas alongadas, de perto'),
  heroBanca: video('hero-banca', 'Banca da propriedade com sucos, geleias e uvas'),
  mesa: video('mesa-cachos', 'Cachos de uva de mesa pendurados na parreira'),
  tradicionais: video('tradicionais-latada', 'Parreiral repleto de cachos de uva tradicional'),
  familia: video('familia-colheita', 'Colheita de um cacho de uva com tesoura, direto da parreira'),
  criancasUva: video('criancas-uva', 'Menina provando uvas ao lado da mesa de piquenique'),
  criancasCamaElastica: video('criancas-cama-elastica', 'Menina sentada na cama elástica com um cacho de uva'),
  criancasBrincando: video('criancas-brincando', 'Crianças brincando na cama elástica ao ar livre'),
  criancasLimonada: video('criancas-limonada', 'Menina se servindo de limonada na mesa com toalha xadrez'),
  colheitaMao: video('colheita-mao', 'Mão de um visitante colhendo um cacho de uva na parreira'),
  colheitaCaixas: video('colheita-caixas', 'Caixas cheias de uvas sobre toalha xadrez'),
  colheitaMesa: video('colheita-mesa', 'Mesa com toalha xadrez, jarras de limonada e uma caixa de frutas'),
  colheitaLatada: video('colheita-latada', 'Cachos maduros pendurados na parreira no dia de colheita'),
} satisfies Record<string, SiteVideo>;

export const imageCredits: ImageCredit[] = Object.values(images).flatMap((image: SiteImage) =>
  image.credit ? [image.credit] : [],
);
