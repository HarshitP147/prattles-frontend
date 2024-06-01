import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import router from './router'

import { web } from '../client_secret_123402289821-6ok2ov1mfbui6ugo9jbcoe1jfumnr308.apps.googleusercontent.com.json' assert {
    type: "json"
}

import './index.css'

ReactDOM.createRoot(document.getElementById('app-root')!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={ web.client_id } >
            <RouterProvider router={ router } />
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
