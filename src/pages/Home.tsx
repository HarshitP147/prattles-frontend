import { useEffect, useCallback, lazy, Suspense, } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UserCard = lazy(() => import('../components/small/UserCard'));
const ContactList = lazy(() => import('../components/medium/ContactList'))
import Options from "../components/small/Options";

import SocketProvider from "../context/SocketContext";

export default function Home() {
    const navigate = useNavigate();

    const handleEscape = useCallback((ev: KeyboardEvent) => {
        if (ev.key === "Escape") {
            navigate("/chat");
        }
    }, [navigate])


    useEffect(() => {
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        }
    }, [handleEscape])


    return (
        <SocketProvider>
            <div className="flex flex-row items-stretch h-[100vh] ">
                <section className=" w-[22em] static  h-full  overflow-y-scroll scrollbar-thin scrollbar-thumb-info scrollbar-track-primary-content border-r border-r-base-neutral ">
                    <Suspense fallback={
                        <div className=" mt-[50%] mx-auto text-center">
                            <span className="loading loading-spinner loading-lg text-white text-center "></span>
                        </div>
                    }>
                        <UserCard />
                        <ContactList />
                    </Suspense>
                    <Options />
                </section>
                <div className="flex-1 ">
                    <Outlet />
                </div>
            </div>
        </SocketProvider>
    )
}