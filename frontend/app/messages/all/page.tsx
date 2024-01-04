'use client'

import MessageBox from '@/app/Components/MessageBox/MessageBox'
import useBase from '@/app/hooks/useBase';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface Message {
    msg: string;
    timestamp: string;
}

export default function AllMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const url = useBase();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const token = localStorage.getItem('token');
    useEffect(() => {
        const getMessages = async () => {
            if (token == null) {
                router.replace("/");
                return;
            }
            try {
                setLoading(true);
                const username = (jwtDecode(token) as { username: string }).username;
                await axios.get(url + "/messages/get/" + username)
                    .then(res => {
                        const data = res.data;
                        if (data.status === 'error') {
                            toast.error("Server Error Try some time later");
                            router.replace('/');
                            return;
                        }
                        else {
                            const sortedMessages = data.sort((a: { timestamp: string | number | Date; }, b: { timestamp: string | number | Date; }) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                            setMessages(data);
                        }
                    })
            }
            catch (e) {
                console.log((e as Error).message);
            }
            finally {
                setLoading(false);
            }
        }

        getMessages();
    }, [])

    return (
        <div className='w-[95%] lg:w-[1200px] flex flex-col m-auto p-4 border-4 border-lime-300 rounded-lg my-8'>
            <div className='text-3xl font-bold text-blue-400'>
                All Messages
            </div>
            <div className='flex flex-col'>
                {messages.length > 0 ? (
                    messages.map((msg, i) => (
                        <MessageBox
                            key={i}
                            message={msg.msg}
                            time={msg.timestamp}
                        />
                    ))
                ) : (
                    <div className='text-xl text-red-400'>No messages</div>
                )}

            </div>
        </div>
    )
}
