"""Gera as fotos (WebP) e vídeos (MP4 sem áudio) do site a partir da pasta original.

Uso:
    FFMPEG=/caminho/do/ffmpeg python3 scripts/otimizar-midia.py [fotos] [videos] [logo]

A pasta original (fotos-videos-uvasdebastiani/) não vai para o git; o resultado
fica em public/media/. Para trocar ou acrescentar uma mídia, edite as listas
PHOTOS e VIDEOS abaixo e rode de novo. Arquivos já gerados são pulados; com
REFAZER=1 tudo é gerado outra vez.
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
REDO = os.environ.get('REFAZER') == '1'

MESA = 'Uvas de Mesa'
FAMILIA = 'Fotos Família '  # invariant: the source folder name ends with a space
PRODUTOS = 'Produtos'

# (arquivo de saída, origem, proporção largura/altura, ponto focal vertical 0–1)
PHOTOS = [
    ('mesa-preta-verde', f'{MESA}/IMG_7754.jpg', 4 / 5, 0.35),
    ('mesa-verde', f'{MESA}/IMG_7764.jpg', 4 / 5, 0.4),
    ('mesa-rosada', f'{MESA}/IMG_7776.jpg', 4 / 5, 0.35),
    ('mesa-preta', f'{MESA}/IMG_7813.jpg', 4 / 5, 0.45),
    ('mesa-corredor', f'{MESA}/IMG_7797.jpg', 4 / 5, 0.5),
    ('tradicionais-cachos', 'IMG_4357.jpg', 4 / 5, 0.3),
    ('tradicionais-pretas', 'IMG_4349.jpg', 4 / 5, 0.4),
    ('tradicionais-parreiral', 'IMG_4373.jpg', 4 / 5, 0.4),
    ('tradicionais-latada', 'IMG_4566.jpg', 4 / 5, 0.45),
    ('produto-caixa-uvas', f'{PRODUTOS}/IMG_5360.jpg', 4 / 5, 0.55),
    ('produto-suco', f'{PRODUTOS}/IMG_5351.jpg', 4 / 5, 0.5),
    ('produto-geleias', 'IMG_4416.jpg', 4 / 5, 0.6),
    ('produto-kit', f'{PRODUTOS}/IMG_5330.jpg', 4 / 5, 0.5),
    ('familia', f'{FAMILIA}/IMG_4501.jpg', 4 / 5, 0.55),
    ('banca', f'{MESA}/IMG_7849.jpg', 4 / 5, 0.5),
    ('organico-roseiras', f'{MESA}/IMG_7786.jpg', 4 / 5, 0.62),
]
PHOTO_WIDTHS = (1200, 640)

# (arquivo de saída, origem, início em segundos, duração máxima em segundos)
VIDEOS = [
    ('hero-corredor', f'{MESA}/IMG_7791.MOV', 0, 7),
    ('hero-organico', f'{MESA}/IMG_7785.MOV', 0, 6),
    ('hero-cacho', f'{MESA}/IMG_7747.MOV', 0, 6),
    ('hero-familia', f'{MESA}/IMG_7821.MOV', 0, 7),
    ('hero-variedades', f'{MESA}/IMG_7779.MOV', 0, 5),
    ('hero-banca', f'{MESA}/IMG_7847.MOV', 0, 4),
    ('mesa-cachos', f'{MESA}/IMG_7807.MOV', 0, 6),
    ('tradicionais-latada', 'IMG_4376.MOV', 0, 6),
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
        if not REDO and (OUT / f'{name}.webp').exists():
            continue
        im = crop_to(ImageOps.exif_transpose(Image.open(SRC / rel)).convert('RGB'), ratio, focal_y)
        for i, width in enumerate(PHOTO_WIDTHS):
            suffix = '' if i == 0 else f'-{width}'
            resized = im.resize((width, round(width / ratio)), Image.Resampling.LANCZOS)
            resized.save(OUT / f'{name}{suffix}.webp', 'WEBP', quality=72, method=6)
        print('foto ', name)


def build_videos() -> None:
    for name, rel, start, duration in VIDEOS:
        if not REDO and (OUT / f'{name}.mp4').exists():
            continue
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


LOGO = 'Logo/Crisp De Bastiani Grape Logo.png'
BRAND_OUT = ROOT / 'public' / 'brand'
# invariant: the grape symbol ends before this x in the cropped logo; the lettering starts after it
SYMBOL_RIGHT = 345
CREAM = (248, 244, 234)


def remove_white(im: Image.Image) -> Image.Image:
    """Transforma o fundo branco em transparência, preservando a borda suave das letras."""
    rgba = Image.new('RGBA', im.size)
    pixels = []
    for r, g, b in im.convert('RGB').get_flattened_data():
        alpha = min(255, round((255 - min(r, g, b)) * 1.6))
        # why: the source is a JPEG-like render; faint background speckle would otherwise survive as near-invisible pixels and triple the file size
        if alpha < 28:
            pixels.append((0, 0, 0, 0))
            continue
        a = alpha / 255
        # why: without un-mixing the white, anti-aliased edges keep a pale halo on dark backgrounds
        pixels.append(tuple(max(0, min(255, round((c - (1 - a) * 255) / a))) for c in (r, g, b)) + (alpha,))
    rgba.putdata(pixels)
    return rgba


def recolor(im: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    solid = Image.new('RGBA', im.size, color + (255,))
    solid.putalpha(im.getchannel('A'))
    return solid


def build_logo() -> None:
    BRAND_OUT.mkdir(parents=True, exist_ok=True)
    source = Image.open(SRC / LOGO).convert('RGB')
    box = ImageOps.invert(source.convert('L')).point(lambda v: 255 if v > 20 else 0).getbbox()
    pad = 12
    logo = remove_white(source.crop((box[0] - pad, box[1] - pad, box[2] + pad, box[3] + pad)))
    logo.resize((900, round(900 * logo.height / logo.width)), Image.Resampling.LANCZOS).save(
        BRAND_OUT / 'logo.webp', 'WEBP', quality=90)
    light = recolor(logo, CREAM)
    light.resize((900, round(900 * light.height / light.width)), Image.Resampling.LANCZOS).save(
        BRAND_OUT / 'logo-claro.webp', 'WEBP', quality=90)

    symbol = logo.crop((0, 0, SYMBOL_RIGHT, logo.height))
    symbol = symbol.crop(symbol.getbbox())
    side = max(symbol.size)
    square = Image.new('RGBA', (side, side))
    square.paste(symbol, ((side - symbol.width) // 2, (side - symbol.height) // 2))
    square.resize((256, 256), Image.Resampling.LANCZOS).save(BRAND_OUT / 'simbolo.webp', 'WEBP', quality=90)
    square.resize((64, 64), Image.Resampling.LANCZOS).save(ROOT / 'public' / 'favicon.png')
    touch = Image.new('RGBA', (side + side // 4,) * 2, CREAM + (255,))
    touch.alpha_composite(square, (side // 8, side // 8))
    touch.convert('RGB').resize((180, 180), Image.Resampling.LANCZOS).save(ROOT / 'public' / 'apple-touch-icon.png')
    print('logo')


if __name__ == '__main__':
    if not SRC.is_dir():
        sys.exit(f'Pasta original não encontrada: {SRC}')
    OUT.mkdir(parents=True, exist_ok=True)
    targets = set(sys.argv[1:]) or {'fotos', 'videos', 'logo'}
    if 'fotos' in targets:
        build_photos()
    if 'videos' in targets:
        build_videos()
    if 'logo' in targets:
        build_logo()
