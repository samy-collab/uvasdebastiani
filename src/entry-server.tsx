import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { structuredData } from './structuredData';

export { structuredData };

/** HTML da página gerado no build, para buscadores e para a primeira pintura sem esperar o JavaScript. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
