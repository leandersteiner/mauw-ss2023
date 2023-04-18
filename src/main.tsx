import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Overview } from './components/app-layout/Overview';

const root = createRoot(document.getElementById('root') as Element);
root.render(
  <StrictMode>
    <Overview />
  </StrictMode>
);
