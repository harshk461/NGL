'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Link2, Share, Smile } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

export default function Page() {
    const router = useRouter();
    const url = 'https://igl-omega.vercel.app';
    const [sendUrl, setUrl] = useState('');

    const getData = (token: string) => {
        const data = jwtDecode(token);
        const username = (data as { username: string }).username;
        setUrl(`${url}/messages/send-message/${username}`);

    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/auth/login");
            return;
        }

        const data = jwtDecode(token);
        const username = (data as { username: string }).username;
        setUrl(`${url}/messages/send-message/${username}`);
    }, [])

    return (
        <div className='w-full flex flex-col p-5'>
            <section className="mb-8 border-8 border-yellow-700 p-4 rounded-lg">
                <h1 className="text-3xl font-bold mb-4">Welcome to IGL!</h1>
                <p className='text-white font-semibold'>
                    Anonymously connect with others through unique links.
                </p>
            </section>

            <div className='mb-8 border-8 border-lime-700 p-4 rounded-lg'>
                <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                <div className="flex flex-col gap-4 font-bold">
                    <div className='flex gap-4 w-fit'>
                        <p>1. Create a Link</p>
                        <Link2 />
                    </div>
                    <div className='flex gap-4 w-fit'>
                        <p>2. Share the Link</p>
                        <Share />
                    </div>
                    <div className='flex gap-4 w-fit'>
                        <p>3. Receive Anonymous Messages</p>
                        <Smile />
                    </div>
                </div>
            </div>

            <div className='mb-8 border-8 border-y-indigo-700 p-4 rounded-lg'>
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Features</h2>
                    <ul className="list-decimal list-inside font-bold">
                        <li>Complete Anonymity</li>
                        <li>Customizable Links</li>
                        <li>Moderation: Report and Block Inappropriate Content</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Privacy and Security</h2>
                    <p className="font-bold">
                        Your privacy is our priority. Messages are end-to-end encrypted. Read our
                        <Link
                            href="/privacy-policy"
                            className="text-blue-500 mx-1">
                            Privacy Policy
                        </Link>
                        for more details on data handling.
                    </p>
                </section>
            </div>


            <div className='mb-8 border-8 border-x-accent-dark p-4 rounded-lg'>
                <section className="mb-4 font-bold">
                    <h2 className="text-2xl font-bold mb-2">Get Started</h2>
                    <h1>Your Link:
                        <Link
                            href={sendUrl}
                            target='__blank'
                            className='text-blue-400 ml-4 hover:underline duration-150 transition-all break-words'>
                            {sendUrl}
                        </Link>
                    </h1>
                </section>
            </div>
        </div>
    )
}
