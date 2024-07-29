import { useState, useContext, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

import InputBox from '../components/small/InputBox';
import Messages from '../components/layout/Messages';

import AuthContext from '../context/AuthContext';
import { SocketContext } from '../context/SocketContext';

import type { MessageLoaderType, MessageType } from '../misc/types';

export default function Chat() {
    const { chatId } = useParams()

    const chatMessageLoader = useLoaderData() as MessageLoaderType

    const [message, setMessage] = useState('');
    const [messageSending, setSending] = useState(false);
    const [chatMessages, setChatMessages] = useState<MessageType[]>([]);

    const { state } = useContext(AuthContext)
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.emit('joinRoom', chatId);
        setChatMessages(chatMessageLoader.messages);

        return () => {
            setChatMessages([])
            socket.emit('leaveRoom', chatId);
        }
    }, [chatId])

    useEffect(() => {
        socket.on('newMessage', (response) => {
            setChatMessages(list => {
                return [...list, response]
            })
            setSending(false)
        })

        return () => {
            socket.off('newMessage');
        }
    }, [socket])

    async function sendMessage() {

        if (!message.trim() || messageSending) return;

        const messageContent = {
            content: {
                text: message,
            },
            sender: state.userId,
            chatId: chatId as string
        }


        socket.emit('chat', messageContent);

        setMessage('');
        setSending(true);
    }

    return (
        <>
            <div className='h-[100vh]  flex flex-col justify-end py-8 '>
                <div className='flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-info scrollbar-track-primary-content  px-4 ' >
                    <Messages messages={ chatMessages } selfId={ state.userId } chatId={ chatId as string } />
                </div>

                <InputBox sending={ messageSending } message={ message } setMessage={ setMessage } sendMessage={ sendMessage } />
            </div>
        </>
    )
}