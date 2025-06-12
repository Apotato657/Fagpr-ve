import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import '@digdir/designsystemet-css'
import '@digdir/designsystemet-theme';
import Oppslagsside from './Oppslagsside';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Oppslagsside />
  </React.StrictMode>
);
