import { useState, useContext, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import { FaChevronDown } from "react-icons/fa6";

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
    }, [chatId, socket, chatMessageLoader.messages])

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
            <div className='h-screen overflow-y-scroll' >
                <div className=' overflow-y-scroll scrollbar scrollbar-thumb-info scrollbar-track-primary-content  px-6' >
                    <Messages messages={ chatMessages } selfId={ state.userId } chatId={ chatId as string } />

                </div>

                { chatMessages.length !== 0 &&
                    <>
                        <AnimatePresence>
                            <div className='sticky bottom-[6rem] z-20  mx-auto w-fit '>
                                <FaChevronDown className=' rounded-full w-10 h-10 p-2 transition  hover:bg-white hover:text-black hover:cursor-pointer' />
                            </div>
                        </AnimatePresence>
                        <div className='sticky z-20 bottom-6'>

                            <InputBox sending={ messageSending } message={ message } setMessage={ setMessage } sendMessage={ sendMessage } />
                        </div>
                    </>
                }
            </div>
        </>
    )
}