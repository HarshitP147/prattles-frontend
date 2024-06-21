import { useLoaderData } from "react-router-dom"
import { IoSend } from "react-icons/io5";

export default function Chat() {
    const data = useLoaderData();

    console.log(data);

    return (
        <>
            <div className="absolute bottom-0 w-full h-fit flex input active:bg-none rounded-none">
                <input type="text" placeholder="Type your message here..." className="border border-white h-full text-2xl" />
                <IoSend className="border border-black " />
            </div>
        </>
    )
}