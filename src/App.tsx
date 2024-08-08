import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import AuthProvider, { AuthContext } from './context/AuthContext'

function App() {
    const { state } = useContext(AuthContext);

    const nav = useNavigate();

    useEffect(() => {
        if (state.userId === '') {
            nav("/auth")
        } else {
            nav("/chat");
        }
    }, [state,nav])

    return (
        <AuthProvider>
            <div className='h-[100vh] w-full bg-primary-content select-none'>
                <Outlet />
            </div>
        </AuthProvider>
    )

}

export default App
