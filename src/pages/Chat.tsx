import { useLoaderData } from "react-router-dom"

export default function Chat() {
    const data = useLoaderData();

    console.log(data);

    return (
        <>
            <h1 className="text-white">This is the chat page</h1>
        </>
    )
}