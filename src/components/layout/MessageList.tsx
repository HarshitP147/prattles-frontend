import { MutableRefObject, forwardRef, memo } from 'react'

import Message from '../small/Message';

import type { MessageProps } from '../../misc/types';


type PropType = MessageProps & { selfId: string }

// this component shall contain the entire rendering of messages
const MessageList = memo(forwardRef((props: PropType, ref) => {

    const messages = props.messages

    const loading = messages === undefined ? true : false

    return (
        <section className='py-8'>
            { loading ?
                <span>Loading your chats </span>
                :
                <div className='flex flex-col'>
                    { messages.map((msg, i) => {
                        const isSelfMessage = msg.sender.userId === props.selfId;

                        return (
                            <>
                                <Message isSelfMessage={ isSelfMessage } key={ i } { ...msg } />
                            </>
                        )
                    }) }
                    <div ref={ ref as MutableRefObject<HTMLDivElement> } />
                </div>
            }
        </section>
    )
}));
export default MessageList;