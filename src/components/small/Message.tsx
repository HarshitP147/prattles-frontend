import ReactTimeAgo from 'react-time-ago'

import { MessageType } from "../../misc/types";

type MessageProp = MessageType & { isSelfMessage: boolean }

export default function Message(props: MessageProp) {

    const messageTime = new Date(props.createdAt);

    return (
        <div className={ `my-2 chat ${props.isSelfMessage ? ' chat-end' : 'chat-start'} ` }>
            <div className={ `chat-bubble max-w-[35em] break-words  text-white ${props.isSelfMessage ? ' chat-bubble-info' : 'chat-bubble-success'}   text-primary-content` }>
                <div className='flex flex-col '>
                    <span className='text-lg text-wrap whitespace-pre-wrap ' style={ { wordBreak: 'break-word', } }>{ props.content.text }</span>
                    <span className={ `text-xs ${props.isSelfMessage && 'text-end'} ` }>
                        <ReactTimeAgo timeStyle={ 'twitter' } date={ messageTime } />
                    </span>
                </div>
            </div>
        </div>
    )
}