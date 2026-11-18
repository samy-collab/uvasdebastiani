"""Gera as fotos (WebP) e vídeos (MP4 sem áudio) do site a partir da pasta original.

Uso:
    FFMPEG=/caminho/do/ffmpeg python3 scripts/otimizar-midia.py

A pasta original (fotos-videos-uvasdebastiani/) não vai para o git; o resultado
fica em public/media/. Para trocar ou acrescentar uma mídia, edite as listas
PHOTOS e VIDEOS abaixo e rode de novo.
Requer Pillow e um ffmpeg com libx264.
"""

import os
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'fotos-videos-uvasdebastiani'
OUT = ROOT / 'public' / 'media'
FFMPEG = os.environ.get('FFMPEG', 'ffmpeg')

MESA = 'Uvas de Mesa'
FAMILIA = 'Fotos Família '  # invariant: the source folder name ends with a space
PRODUTOS = 'Produtos'

# (arquivo de saída, origem, proporção largura/altura, ponto focal vertical 0–1)
PHOTOS = [
    ('finas-preta-verde', f'{MESA}/IMG_7754.jpg', 4 / 5, 0.35),
    ('finas-verde', f'{MESA}/IMG_7764.jpg', 4 / 5, 0.4),
    ('finas-rosada', f'{MESA}/IMG_7776.jpg', 4 / 5, 0.35),
    ('finas-preta', f'{MESA}/IMG_7813.jpg', 4 / 5, 0.45),
    ('finas-corredor', f'{MESA}/IMG_7797.jpg', 4 / 5, 0.5),
    ('rusticas-cachos', 'IMG_4357.jpg', 4 / 5, 0.3),
    ('rusticas-pretas', 'IMG_4349.jpg', 4 / 5, 0.4),
    ('rusticas-parreiral', 'IMG_4373.jpg', 4 / 5, 0.4),
    ('rusticas-latada', 'IMG_4566.jpg', 4 / 5, 0.45),
    ('produto-caixa-uvas', f'{PRODUTOS}/IMG_5360.jpg', 4 / 5, 0.55),
    ('produto-suco', f'{PRODUTOS}/IMG_5351.jpg', 4 / 5, 0.5),
    ('produto-geleias', 'IMG_4416.jpg', 4 / 5, 0.6),
    ('produto-kit', f'{PRODUTOS}/IMG_5330.jpg', 4 / 5, 0.5),
    ('familia', f'{FAMILIA}/IMG_4501.jpg', 4 / 5, 0.55),
    ('banca', f'{MESA}/IMG_7849.jpg', 4 / 5, 0.5),
]
PHOTO_WIDTHS = (1200, 640)

# (arquivo de saída, origem, início em segundos, duração máxima em segundos)
VIDEOS = [
    ('hero-corredor', f'{MESA}/IMG_7791.MOV', 0, 7),
    ('finas-cachos', f'{MESA}/IMG_7807.MOV', 0, 6),
    ('rusticas-latada', 'IMG_4376.MOV', 0, 6),
    ('familia-colheita', f'{MESA}/IMG_7833.MOV', 0, 6),
    ('colheita-mao', 'IMG_4557.MOV', 0, 6),
    ('colheita-caixas', 'IMG_4388.MOV', 0, 6),
    ('colheita-mesa', 'IMG_4396.MOV', 0, 6),
    ('colheita-latada', 'IMG_4568.MOV', 0, 6),
]
VIDEO_WIDTH = 720


def crop_to(im: Image.Image, ratio: float, focal_y: float) -> Image.Image:
    w, h = im.size
    if w / h > ratio:
        nw = round(h * ratio)
        left = (w - nw) // 2
        return im.crop((left, 0, left + nw, h))
    nh = round(w / ratio)
    top = min(max(round(h * focal_y - nh / 2), 0), h - nh)
    return im.crop((0, top, w, top + nh))


def build_photos() -> None:
    for name, rel, ratio, focal_y in PHOTOS:
        im = crop_to(ImageOps.exif_transpose(Image.open(SRC / rel)).convert('RGB'), ratio, focal_y)
        for i, width in enumerate(PHOTO_WIDTHS):
            suffix = '' if i == 0 else f'-{width}'
            resized = im.resize((width, round(width / ratio)), Image.Resampling.LANCZOS)
            resized.save(OUT / f'{name}{suffix}.webp', 'WEBP', quality=72, method=6)
        print('foto ', name)


def build_videos() -> None:
    for name, rel, start, duration in VIDEOS:
        src = str(SRC / rel)
        common = ['-nostdin', '-v', 'error', '-y', '-ss', str(start), '-i', src]
        scale = f'scale={VIDEO_WIDTH}:-2'
        subprocess.run(
            [FFMPEG, *common, '-t', str(duration), '-an', '-vf', f'{scale},fps=30',
             '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
             '-crf', '27', '-preset', 'slow', '-movflags', '+faststart',
             str(OUT / f'{name}.mp4')],
            check=True,
        )
        # why: the poster is the first frame, so the still and the start of the loop match when the video kicks in
        subprocess.run(
            [FFMPEG, *common, '-frames:v', '1', '-vf', scale, '-c:v', 'libwebp', '-quality', '75',
             str(OUT / f'{name}.webp')],
            check=True,
        )
        print('vídeo', name)


if __name__ == '__main__':
    if not SRC.is_dir():
        sys.exit(f'Pasta original não encontrada: {SRC}')
    OUT.mkdir(parents=True, exist_ok=True)
    build_photos()
    build_videos()
