// Injeta o HTML renderizado pelo React em dist/index.html depois do build.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const ssrDir = `${root}dist-ssr`;
const htmlPath = `${root}dist/index.html`;
const placeholder = '<div id="root"></div>';

const { render, structuredData } = await import(`${ssrDir}/entry-server.js`);
const html = await readFile(htmlPath, 'utf8');
// hazard: without this check a changed index.html would silently ship an empty page to crawlers
if (!html.includes(placeholder)) throw new Error(`${placeholder} não encontrado em dist/index.html`);

// why: `<` escaped so text inside the JSON can never close the <script> tag early
const jsonLd = JSON.stringify(structuredData()).replace(/</g, '\\u003c');
await writeFile(
  htmlPath,
  html
    // hazard: function replacers, because a string replacement would expand any `$&` or `$'` in the content
    .replace(placeholder, () => `<div id="root">${render()}</div>`)
    .replace('</head>', () => `  <script type="application/ld+json">${jsonLd}</script>\n  </head>`),
);
await rm(ssrDir, { recursive: true, force: true });
console.log('dist/index.html pré-renderizado');
