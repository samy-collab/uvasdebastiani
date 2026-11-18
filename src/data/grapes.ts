import type { NatureIconName } from '../components/NatureIcon/NatureIcon';
import { images, videos, type SiteImage, type SiteVideo } from './images';

export interface GrapeType {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  /** Selos do cultivo, mostrados como etiquetas abaixo do texto; o primeiro ganha destaque. */
  practices: { label: string; icon: NatureIconName }[];
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
    eyebrow: 'Nossas uvas',
    title: 'Uvas de mesa',
    lead: 'Cachos grandes e bagas firmes e alongadas, de diversas variedades que se revezam ao longo da safra.',
    paragraphs: [
      'Cultivamos as uvas de mesa de forma orgânica, sob cobertura plástica, que protege os cachos da chuva e do granizo desde a flor até a colheita.',
      'Cada cacho é acompanhado na parreira e colhido à mão, com tesoura, quando chega ao ponto certo.',
    ],
    practices: [
      { label: 'Cultivo orgânico', icon: 'sprout' },
      { label: 'Sob cobertura', icon: 'cover' },
      { label: 'Colheita manual', icon: 'scissors' },
    ],
    traits: ['Diversas variedades ao longo da safra', 'Bagas firmes e alongadas', 'Colhidas no ponto, direto da parreira'],
    video: videos.mesa,
    photos: [images.mesaBagasAlongadas, images.mesaCachosGrandes, images.mesaCorredor],
    tone: 'dark',
  },
  {
    id: 'uvas-tradicionais',
    eyebrow: 'Nossas uvas',
    title: 'Uvas tradicionais',
    lead: 'Bagas redondas, cachos compactos e o sabor de uva que marca a Serra Gaúcha.',
    paragraphs: [
      'As uvas tradicionais crescem de forma orgânica na latada, o jeito mais antigo de conduzir a parreira na região, com os cachos pendurados ao alcance da mão.',
      'São elas que enchem as caixas nos dias de colheita, para comer na hora e levar para casa.',
    ],
    practices: [
      { label: 'Cultivo orgânico', icon: 'sprout' },
      { label: 'Em latada', icon: 'trellis' },
      { label: 'Colheita manual', icon: 'scissors' },
    ],
    traits: ['Bagas redondas e cachos compactos', 'Variedades típicas da Serra Gaúcha', 'Para comer frescas, direto do cacho'],
    video: videos.tradicionais,
    photos: [images.tradicionaisCachos, images.tradicionaisFolhas, images.tradicionaisLatada],
    tone: 'light',
  },
];
