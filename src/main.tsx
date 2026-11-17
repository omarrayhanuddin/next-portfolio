import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/dm-sans/latin-700.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import App from './App';
import './styles.css';
import './dark-theme.css';

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const root = document.getElementById('root')!;
const normalisePath = (path: string) => path.replace(/\/+$/, '') || '/';
const matchesPrerender =
  root.dataset.route &&
  normalisePath(root.dataset.route) === normalisePath(window.location.pathname);
if (root.hasChildNodes() && matchesPrerender) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
