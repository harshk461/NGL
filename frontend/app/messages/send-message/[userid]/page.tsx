/* eslint-disable react/no-unescaped-entities */
'use client'

import useBase from '@/app/hooks/useBase';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface MessageData {
    username: string;
    message: string;
}

export default function Page() {
    const { userid } = useParams();
    const [loading, setLoading] = useState(false);
    const [self, setSelf] = useState(false);
    const url = useBase();
    const [data, setData] = useState<MessageData>({
        'username': userid,
        'message': ''
    })

    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token != null) {
            const username = jwtDecode(token).username;
            if (username === userid) {
                setSelf(true);
            }
        }
    }, [token])

    const handleClick = async () => {
        try {
            if (data.message.trim() === '') {
                toast.error("Enter Message");
                return;
            }
            setLoading(true);
            await axios.post(url + "/messages/send", data)
                .then(res => {
                    const data = res.data;
                    if (data.status === 'error') {
                        toast.error(data.message);
                        return;
                    }
                    else {
                        toast.success("Sent Successfully");
                        setData((pre) => ({ ...pre, "message": '' }));
                        return;
                    }
                })
        }
        catch (e) {
            console.log(e.message);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className='w-full lg:w-1/2 lg:m-auto p-4'>
            <div className='rounded-lg border-4 border-yellow-600 p-4 font-semibold flex flex-col items-center gap-6'>
                {self ?
                    (
                        <>
                            <div className='text-3xl font-bold text-blue-700'>
                                Can't Send message to yourself
                            </div>
                            <Link href={"/"}>
                                Return to Home
                            </Link>
                        </>
                    )
                    :
                    (
                        <>
                            <h1 className='text-md md:text-2xl text-center'>
                                Send message anonymously to {userid}
                            </h1>
                            <textarea
                                value={data.message}
                                onChange={(e) => setData((pre) => ({ ...pre, "message": e.target.value }))}
                                placeholder='Enter your message...'
                                className='w-full lg:w-3/4 bg-transparent text-white border-4 border-purple-600 rounded-xl p-3 outline-none resize-y h-[100px] max-h-[300px]'
                            />

                            <button
                                onClick={handleClick}
                                className='px-6 py-2 rounded-xl border-blue-600 border-4 font-bold'>
                                {loading ? 'Sending...' : 'Send'}
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    )
}
