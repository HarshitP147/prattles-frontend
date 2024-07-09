import { Fragment } from 'react'

import type { MessagesProp } from "../../misc/types";

let arr: number[] = [];

for (let i = 0; i < 500; i++) {
    arr.push(i);
}

// this component shall contain the entire rendering of messages
export default function Messages(props: MessagesProp) {
    const { chatId } = props;

    return (
        <>
            <h1 className='text-2xl text-white text-center'>Rendering chats for { chatId } </h1>
            { arr.map((_, i) => {
                return (
                    <Fragment key={ i }>
                        <div className="chat chat-start">
                            <div className="chat-header">
                                Obi-Wan Kenobi
                                <time className="text-xs opacity-50">2 hours ago</time>
                            </div>
                            <div className="chat-bubble">You were the Chosen One!</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    </Fragment>
                )
            }) }

        </>
    )
}