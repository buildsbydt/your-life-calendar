import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';                              // Tailwind + any overrides
import App from './App';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react'; // ← NEW

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {/* Observability widgets (run only in production) */}
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>
);


