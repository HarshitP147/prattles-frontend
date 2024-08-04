import { Fragment, MutableRefObject, forwardRef } from 'react'

import type { MessageProps } from '../../misc/types';


type PropType = MessageProps & { selfId: string }

// this component shall contain the entire rendering of messages
const Messages = forwardRef((props: PropType, ref) => {

    const messages = props.messages

    const loading = messages === undefined ? true : false

    return (
        <section className='py-8'>
            { loading ?
                <span>Loading your chats </span>
                :
                <div className='flex flex-col'>
                    { messages.map((msg, i) => {
                        const isSelfMessage = msg.sender.userId === props.selfId

                        return (
                            <Fragment key={ i }>
                                <div className={ `my-2 chat ${isSelfMessage ? ' chat-end' : 'chat-start'} ` }>
                                    <div className={ `chat-bubble text-white ${isSelfMessage ? ' chat-bubble-info' : 'chat-bubble-warning'}   text-primary-content` }>{ msg.content.text }</div>
                                </div>
                            </Fragment>
                        )
                    }) }
                    <div ref={ ref as MutableRefObject<HTMLDivElement> } />
                </div>
            }
        </section>
    )
})
export default Messages;