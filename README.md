# Uvas de mesa De Bastiani — site institucional

Página única em React + Vite + TypeScript + CSS Modules.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:5173
npm run build    # checagem de tipos + build de produção em dist/
npm run preview  # serve o build em http://localhost:4173
npm run lint     # oxlint
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Nome, cidade, ano de início, endereço, rota, horários, WhatsApp, Instagram, link do Google | `src/data/site.ts` |
| Seções de uva (uvas de mesa e tradicionais): textos, selos de cultivo, características, fotos e vídeo | `src/data/grapes.ts` |
| Vídeos e legendas da sequência do topo | `src/components/Hero/Hero.tsx` (lista `clips`) |
| Cultivo orgânico | `src/components/OrganicSection/OrganicSection.tsx` |
| Produtos: descrições, sabores, embalagens | `src/data/products.ts` (campo `items`) |
| Fotos e vídeos: caminho, texto alternativo, ponto focal | `src/data/images.ts` |
| Dia de colheita | `src/components/HarvestSection/HarvestSection.tsx` |
| Texto da história da família | `src/components/AboutSection/AboutSection.tsx` |
| Textos do topo (título, chamada) | `src/components/Hero/Hero.tsx` |
| Cores, fontes, espaçamentos | `src/styles/tokens.css` |
| Título e meta descrição da página | `index.html` |

Campos de `site.ts` deixados como `undefined` ficam ocultos; ao preenchê-los, aparecem
automaticamente na seção Localização e no rodapé.

## Fotos, vídeos e logo

Os originais ficam em `fotos-videos-uvasdebastiani/` (fora do git, ~2 GB). O site usa versões
otimizadas em `public/media/` (fotos WebP 4:5 e vídeos MP4 curtos, sem áudio) e `public/brand/`
(logo, logo clara, símbolo), além de `public/favicon.png` e `public/apple-touch-icon.png`.

Para trocar ou acrescentar uma mídia:

1. Ajuste as listas `PHOTOS` e `VIDEOS` em `scripts/otimizar-midia.py`.
2. Rode o script (requer Python com Pillow e um `ffmpeg` com libx264):

   ```bash
   FFMPEG=/caminho/do/ffmpeg python3 scripts/otimizar-midia.py            # tudo
   python3 scripts/otimizar-midia.py logo                                  # só a logo
   ```

3. Registre a nova mídia em `src/data/images.ts` com um `alt` descritivo.
