import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import '@digdir/designsystemet-css'
import '@digdir/designsystemet-theme';
import {Auth0Provider} from "@auth0/auth0-react";
import Oppslagsside from './pages/oppslagsside/Oppslagsside';
import {BrowserRouter, Route, Routes} from "react-router";
import {Detaljside} from "./pages/detaljside/detaljside";

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
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Oppslagsside/>}/>
                    <Route path={':orgnummer'} element={<Detaljside/>}/>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    </Auth0Provider>
);
