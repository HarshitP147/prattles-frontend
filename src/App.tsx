import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import AuthProvider from './context/AuthProvider'

import router from './misc/router'

function App() {
    const [count, setCount] = useState(0)


    // if the app is in production, the user shall see this
    if (import.meta.env.MODE === "production") {

        return (
            <main className='h-[100vh] w-full bg-primary select-none'>
                <h1 className='text-base-100 text-[2.2em] text-center pt-24'>MERN Chat app</h1>
                <p className='text-white text-center'>A simple chat application built with MERN stack. This site is built with Typescript React and Daisy UI</p>
                <p className='text-white text-center'>You can track the progress{ " " }
                    <a href='https://github.com/HarshitP147/prattles-frontend' target='_blank' className='text-secondary underline'>here</a>
                </p>

                <h1 className='text-white text-[2em] text-center pt-44'>Count: { count }</h1>
                <div className=' w-[20em] mx-auto mt-10 py-2 px-4 flex justify-between'>
                    <button onClick={ () => setCount(value => value - 1) } className='btn btn-accent scale-125'>Decrease</button>
                    <button onClick={ () => setCount(value => value + 1) } className='btn btn-accent scale-125'>Increase</button>
                </div>
            </main>
        )
    }

    // there needs to be a global auth state which manages the authentication of the app

    // if in development, we see this
    return (
        <AuthProvider>
            <div className='h-[100vh] w-full bg-primary select-none'>
                <RouterProvider router={ router } />
            </div>
        </AuthProvider>
    )

}

export default App
