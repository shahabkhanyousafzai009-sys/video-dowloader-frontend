import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Apply theme class to <html> before render to prevent flash
const stored = localStorage.getItem('snapload-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = stored || (prefersDark ? 'dark' : 'dark'); // Default to dark
document.documentElement.classList.add(theme);

const mountApp = () => {
  const rootEl = document.getElementById('root');
  if (rootEl) {
    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
