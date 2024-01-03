'use client'

import { useParams } from 'next/navigation'
import React, { useState } from 'react'

export default function Page() {
    const { userid } = useParams();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(!loading);
    }
    return (
        <div className='w-full lg:w-1/2 lg:m-auto p-4'>
            <div className='rounded-lg border-4 border-yellow-600 p-4 font-semibold flex flex-col items-center gap-6'>
                <h1 className='text-lg md:text-3xl text-center'>
                    Send message anonymously
                </h1>

                <textarea
                    placeholder='Enter your message...'
                    className='w-full lg:w-3/4 bg-transparent text-white border-4 border-purple-600 rounded-xl p-3 outline-none resize-y h-[100px] max-h-[300px]'
                />

                <button
                    onClick={handleClick}
                    className='px-6 py-2 rounded-xl border-blue-600 border-4'>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    )
}
