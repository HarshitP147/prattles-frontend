import { MutableRefObject, forwardRef, memo } from 'react'
import moment from 'moment';

import Message from '../small/Message';

import type { MessageProps, MessageType } from '../../misc/types';


type PropType = MessageProps & { selfId: string }

// this component shall contain the entire rendering of messages
const MessageList = memo(forwardRef((props: PropType, ref) => {

    const messages = props.messages

    const loading = messages === undefined ? true : false


    const msgDates = new Set();

    const formatMsgDate = (created_date: string) => {

        const today = moment().startOf('day');
        const msgDate = moment(created_date);
        let dateDay = '';

        if (msgDate.isSame(today, 'day')) {
            dateDay = 'Today';
        }
        else if (msgDate.isSame(today.clone().subtract(1, 'days'), 'day')) {
            dateDay = 'Yesterday';
        }
        else {
            dateDay = msgDate.format('MMMM D, YYYY');
        }

        return dateDay
    }

    const renderMsgDate = (message: MessageType, nextMessage: MessageType) => {
        const dateTimeStamp = moment(message.createdAt, 'YYYY-MM-DD').valueOf();
        let nextMsgdateTimeStamp = 0;
        if (nextMessage) {
            nextMsgdateTimeStamp = moment(nextMessage.createdAt, 'YYYY-MM-DD').valueOf();
        }

        if (msgDates.has(dateTimeStamp) || (nextMsgdateTimeStamp && nextMsgdateTimeStamp === dateTimeStamp)) {
            return null
        }
        else {

            msgDates.add(dateTimeStamp);

            return (
                <div className='py-2 flex justify-center items-center'>
                    <span id="msg_day" className='px-2 py-1 shadow font-medium rounded-lg text-white bg-base-200   border-gray-300'>
                        { formatMsgDate(message.createdAt) }
                    </span>
                </div>
            )
        }
    }

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
                                { renderMsgDate(msg, messages[i + 1]) }
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