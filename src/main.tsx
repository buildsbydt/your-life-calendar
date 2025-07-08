// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';           // Tailwind + your overrides
import App from './App';
import { Analytics } from '@vercel/analytics/react'; // ← NEW

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {/* Vercel Web Analytics (loads only in production) */}
    <Analytics />
  </React.StrictMode>
);


