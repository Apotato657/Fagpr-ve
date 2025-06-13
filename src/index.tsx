import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import '@digdir/designsystemet-css'
import '@digdir/designsystemet-theme';
import Oppslagsside from './Oppslagsside';
import {Auth0Provider} from "@auth0/auth0-react";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <Auth0Provider
        domain="dev-wu7dhnqsi37vzoke.us.auth0.com"
        clientId="Q4yZNHwjw5cTH9TRXIVk19v0BN2H2hD5"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <React.StrictMode>
            <Oppslagsside/>
        </React.StrictMode>
    </Auth0Provider>
);
