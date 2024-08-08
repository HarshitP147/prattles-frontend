import { LoaderFunctionArgs } from "react-router-dom";

async function chatListLoader(args: LoaderFunctionArgs) {
    const url = `http://localhost:8080/chat/${args.params.chatId}`;

    const controller = new AbortController();
    const signal = controller.signal;

    document.addEventListener("keydown", ev => {
        if (ev.key === "Escape") {
            controller.abort();
        }
    })

    const getChatList = async () => {
        try {
            const chatListReqest = await fetch(url, { signal })
            if (!chatListReqest.ok) {
                throw new Error('Network response was not ok');
            }
            const responseJson = await chatListReqest.json();
            return responseJson;
        } catch (err: any) {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            }
            else {
                console.log(`Fetch error:`, err);
            }
            return null;
        }
    }

    const chatList = await getChatList();
    return chatList;

}
export default chatListLoader;