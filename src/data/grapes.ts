import { images, videos, type SiteImage, type SiteVideo } from './images';

export interface GrapeColor {
  name: string;
  /** Cor da amostra redonda ao lado do nome. */
  swatch: string;
}

export interface GrapeType {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  colors: GrapeColor[];
  traits: string[];
  video: SiteVideo;
  /** Três fotos: a primeira ao lado do vídeo, no alto; a terceira ocupa a faixa de baixo. */
  photos: [SiteImage, SiteImage, SiteImage];
  /** `dark` usa fundo ameixa e texto claro. */
  tone: 'dark' | 'light';
}

export const grapeTypes: GrapeType[] = [
  {
    id: 'uvas-de-mesa',
    eyebrow: 'Nossas uvas · 01',
    title: 'Uvas de mesa',
    lead: 'Cachos grandes, de bagas firmes e alongadas, em verde, rosado e preto.',
    paragraphs: [
      'Cultivamos as uvas de mesa sob cobertura plástica, que protege os cachos da chuva e do granizo desde a flor até a colheita.',
      'Cada cacho é acompanhado na parreira e colhido à mão, com tesoura, quando chega ao ponto certo.',
    ],
    colors: [
      { name: 'Verdes', swatch: '#b8c76a' },
      { name: 'Rosadas', swatch: '#c9707c' },
      { name: 'Pretas', swatch: '#3a2140' },
    ],
    traits: ['Bagas grandes e alongadas', 'Cultivo protegido, sob cobertura', 'Colhidas à mão, no ponto'],
    video: videos.mesa,
    photos: [images.mesaRosada, images.mesaVerde, images.mesaCorredor],
    tone: 'dark',
  },
  {
    id: 'uvas-tradicionais',
    eyebrow: 'Nossas uvas · 02',
    title: 'Uvas tradicionais',
    lead: 'Bagas redondas, cachos compactos e o sabor de uva que marca a Serra Gaúcha.',
    paragraphs: [
      'As uvas tradicionais crescem na latada, o jeito mais antigo de conduzir a parreira na região, com os cachos pendurados ao alcance da mão.',
      'São elas que enchem as caixas nos dias de colheita, para comer na hora e levar para casa.',
    ],
    colors: [
      { name: 'Rosadas', swatch: '#b0707e' },
      { name: 'Escuras', swatch: '#4a3550' },
    ],
    traits: ['Bagas redondas e cachos compactos', 'Cultivadas em latada', 'Para comer frescas, direto do cacho'],
    video: videos.tradicionais,
    photos: [images.tradicionaisCachos, images.tradicionaisPretas, images.tradicionaisLatada],
    tone: 'light',
  },
];
