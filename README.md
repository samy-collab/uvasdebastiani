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
| Nosso cultivo | `src/components/OrganicSection/OrganicSection.tsx` |
| Produtos: descrições, sabores, embalagens | `src/data/products.ts` (campo `items`) |
| Fotos e vídeos: caminho, texto alternativo, ponto focal | `src/data/images.ts` |
| Dia de colheita | `src/components/HarvestSection/HarvestSection.tsx` |
| Texto da história da família | `src/components/AboutSection/AboutSection.tsx` |
| Textos do topo (título, chamada) | `src/components/Hero/Hero.tsx` |
| Cores, fontes, espaçamentos | `src/styles/tokens.css` |
| Título e meta descrição da página | `index.html` |
| Endereço do site (domínio) e dados do negócio para o Google | `src/data/site.ts` (campo `url`) e `src/structuredData.ts` |
| Sitemap e regras para buscadores | `public/sitemap.xml` e `public/robots.txt` |
| Imagem de compartilhamento (WhatsApp, Facebook) | `public/og-image.jpg` (1200×630) |
| Política de segurança de conteúdo (origens permitidas) | `vite.config.ts` |

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

## SEO e publicação

- `npm run build` gera o HTML já preenchido (pré-renderizado) em `dist/index.html`, para que o
  Google e as prévias de link leiam o conteúdo sem depender do JavaScript.
- Ao publicar uma mudança de conteúdo, atualize a data em `<lastmod>` de `public/sitemap.xml`.
- Se o domínio mudar, troque `uvasdebastiani.com.br` em `index.html`, `public/robots.txt`,
  `public/sitemap.xml` e no campo `url` de `src/data/site.ts`.
- Hospedagem na Vercel: `vercel.json` define o build, o redirecionamento de `www` para o
  domínio sem `www`, os cabeçalhos de segurança e o cache de `assets/`, `media/` e `brand/`.
  Uma foto ou vídeo substituído com o mesmo nome pode levar até 7 dias para atualizar no
  navegador de quem já visitou; para efeito imediato, use um nome de arquivo novo.
- Ao incorporar algo de outro site (vídeo, mapa, formulário), inclua a origem na política de
  `vite.config.ts`, senão o navegador bloqueia.
