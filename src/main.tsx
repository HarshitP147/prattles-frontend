import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import 'javascript-time-ago/load-all-locales'


import router from './misc/router'

const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENTID;

import './index.css'


ReactDOM.createRoot(document.getElementById('app-root')!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={ googleClientId } >
            <RouterProvider router={ router } />
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
