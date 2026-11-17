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
| Nome, cidade, endereço, rota, horários, WhatsApp, Instagram, link do Google | `src/data/site.ts` |
| Categorias, descrições, variedades, sabores e embalagens | `src/data/products.ts` (campo `items`) |
| Fotos: caminho, texto alternativo, ponto focal, selo "Imagem ilustrativa", créditos | `src/data/images.ts` |
| Texto da história da família | `src/components/AboutSection/AboutSection.tsx` |
| Textos do topo (título, chamada) | `src/components/Hero/Hero.tsx` |
| Cores, fontes, espaçamentos | `src/styles/tokens.css` |
| Título e meta descrição da página | `index.html` |

Campos de `site.ts` deixados como `undefined` ficam ocultos; ao preenchê-los, aparecem
automaticamente na seção Localização e no rodapé.

## Trocar as fotos

1. Salve a foto real em `public/images/`, em proporção **4:3**, em WebP (largura de ~1600 px no
   topo e ~1200 px nas demais), mais uma versão menor (`-960` no topo, `-640` nas demais).
   Usar os mesmos nomes de arquivo dispensa mudar o código.
2. Em `src/data/images.ts`, atualize `alt`, `width`/`height` e `focalPoint`, marque
   `placeholder: false` e apague `credit`. O selo e a linha de créditos somem sozinhos.
3. Remova a linha correspondente de `public/images/CREDITOS.md`.
