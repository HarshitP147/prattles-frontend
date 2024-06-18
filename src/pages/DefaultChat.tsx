import { ImGithub } from "react-icons/im";

export default function DefaultChat() {
    return (
        <main className=" h-full">
            <div className="relative top-[35%]">
                <h1 className="text-zinc-400 text-2xl text-center">Prattles Chat App</h1>
                <div className=" w-[15em] mx-auto mt-6 flex flex-row justify-evenly items-center">
                    <ImGithub className="h-10 w-10 text-base-200" />
                    <a href="https://github.com/HarshitP147/prattles-frontend" target="_blank" className="text-base-300 text-nowrap link-hover">View the source code</a>
                </div>
            </div>
        </main>
    )
}