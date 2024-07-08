import { useParams } from "react-router-dom"

export default function Chat() {
    const { chatId } = useParams()

    return (
        <>
            <h1 className="text-white">{ chatId }</h1>
        </>
    )
}