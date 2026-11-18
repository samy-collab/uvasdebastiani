import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Política de segurança de conteúdo: o navegador só carrega scripts, estilos, fontes,
 * mídia e quadros das origens listadas aqui. Uma origem nova (ex.: outro mapa ou vídeo
 * incorporado) precisa entrar nesta lista, senão é bloqueada.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self'",
  // why: React writes inline style attributes (object-position, animation delays), which 'unsafe-inline' allows
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  'font-src https://fonts.gstatic.com',
  "img-src 'self' data:",
  "media-src 'self'",
  'frame-src https://www.google.com',
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ')

// why: only in the build, because the dev server injects inline scripts for hot reload that this policy would block
const securityMeta = (): Plugin => ({
  name: 'security-meta',
  apply: 'build',
  transformIndexHtml(html) {
    const charset = '<meta charset="UTF-8" />'
    // hazard: the policy must precede every resource tag it governs, and the charset must stay first
    if (!html.includes(charset)) throw new Error(`${charset} não encontrado em index.html`)
    return html.replace(
      charset,
      () =>
        `${charset}\n    <meta http-equiv="Content-Security-Policy" content="${contentSecurityPolicy}" />` +
        '\n    <meta name="referrer" content="strict-origin-when-cross-origin" />',
    )
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), securityMeta()],
})
