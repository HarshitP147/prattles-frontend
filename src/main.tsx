import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'

import App from './App'

import googleOAuthConfig from '../google-oauth-setting.json' assert {
    type: "json"
}

import './index.css'

ReactDOM.createRoot(document.getElementById('app-root')!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={ googleOAuthConfig.web.client_id } >
            <App />
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
