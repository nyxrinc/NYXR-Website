import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { RegionalPreferences } from './localization/RegionalPreferences';
import './styles/tokens.css';
import './styles/main.css';
import './styles/refinements.css';
import './styles/pages.css';
import './styles/pricing.css';
import './styles/home.css';
import './styles/nexus.css';
import './styles/phone.css';
import './styles/evolution.css';
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RegionalPreferences>
      <App />
    </RegionalPreferences>
  </React.StrictMode>,
);
