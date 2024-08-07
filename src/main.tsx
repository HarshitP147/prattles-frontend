import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import 'javascript-time-ago/load-all-locales'


import router from './misc/router'

import googleOAuthConfig from '../google-oauth-setting.json' assert {
    type: "json"
}

import './index.css'


ReactDOM.createRoot(document.getElementById('app-root')!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={ googleOAuthConfig.web.client_id } >
            <RouterProvider router={ router } />
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
