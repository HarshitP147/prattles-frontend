import { Fragment } from 'react'

import type { MessageProps } from '../../misc/types';


// this component shall contain the entire rendering of messages
export default function Messages(props: MessageProps) {

    const { chatId } = props;

    const messages = props.messages

    const loading = messages === undefined ? true : false

    return (
        <section className='py-8 '>
            <h1 className='text-2xl text-white text-center mb-6'>Rendering chat messages for { chatId } </h1>
            { loading ?
                <span>Loading your chats </span>
                :
                <>
                    { messages.map((msg, i) => {
                        return (
                            <Fragment key={ i }>
                                <div className="chat chat-start">
                                    <div className="chat-bubble">{ msg.content.text }</div>
                                    <div className="chat-footer opacity-50">Seen</div>
                                </div>
                            </Fragment>
                        )
                    }) }
                </>
            }
        </section>
    )
}