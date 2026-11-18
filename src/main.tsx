import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/global.css';
import App from './App.tsx';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// why: the production build ships prerendered HTML to hydrate, while `npm run dev` serves an empty root
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
