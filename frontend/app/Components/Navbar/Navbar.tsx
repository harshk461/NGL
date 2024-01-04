/* eslint-disable react/no-unescaped-entities */
'use client'

import { jwtDecode } from 'jwt-decode';
import { LogOutIcon, Menu, X } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<String | null>(null);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.replace("/auth/login");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const username = (jwtDecode(token) as { username: string }).username;
            setUser(username);
        }
    }, []);

    return (
        <div className='relative w-full flex justify-between px-4 md:px-8 py-4 z-100 items-center'>
            <Link
                href={"/"} className='text-xl text-red-600 font-bold'>
                IGL
            </Link>
            <div className='hidden md:block text-xl font-semibold'>
                I'm Gonna Lie
            </div>

            <div className='hidden md:flex h-fit gap-4'>
                {user ? (
                    <div className='flex gap-4 font-bold items-center'>
                        <h1 className='text-xl text-blue-500'>{user}</h1>

                        <Link
                            className='text-md px-4 py-2 border-4 border-blue-400 rounded-xl'
                            href={"/messages/all"}>
                            All Messages
                        </Link>

                        <button
                            onClick={handleLogout}
                            className='flex items-center gap-2 px-4 py-2 border-4 border-green-400 rounded-xl'>
                            Logout
                            <LogOutIcon />
                        </button>
                    </div>
                ) : (
                    <>
                        <Link
                            href={"/auth/login"}
                            className='w-full px-4 py-2 text-center bg-blue-400 rounded-lg font-semibold'>
                            Login {user}
                        </Link>
                        <Link
                            href={"/auth/sign-up"}
                            className='w-full px-4 py-2 text-center bg-green-400 rounded-lg font-semibold'>
                            SignUp
                        </Link>
                    </>
                )}
            </div>

            <div className='block md:hidden'>
                <Menu onClick={() => setOpen(true)} />
            </div>

            <div className={`absolute left-0 top-0 w-full h-fit flex flex-col md:hidden z-50 bg-gray-600
            ${open && 'windowO transition-all duration-300'}
            ${!open && 'windowC transition-all duration-300'}`}>
                <div className='flex justify-end p-4'>
                    <X
                        size={30}
                        onClick={() => setOpen(false)}
                    />
                </div>

                <div className='flex flex-col gap-4 mt-[20px] p-4 text-center'>
                    <div className='mb-7 text-2xl text-white font-semibold'>
                        I'm Gonna Lie
                    </div>
                    {user ? (
                        <div className='flex gap-4 font-bold items-center justify-center'>
                            <h1 className='text-xl text-blue-500'>{user}</h1>
                            <button
                                onClick={handleLogout}
                                className='flex items-center gap-2 px-4 py-2 border-4 border-green-400 rounded-xl'>
                                Logout
                                <LogOutIcon />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                href={"/auth/login"}
                                className='w-full px-4 py-2 text-center bg-blue-400 rounded-lg font-semibold'>
                                Login {user}
                            </Link>
                        </>
                    )}
                    <Link
                        href={"/messages/all"}
                        className='w-full px-4 py-2 text-center bg-yellow-800 rounded-lg font-bold'>
                        All Messages
                    </Link>
                    <Link
                        href={"/auth/sign-up"}
                        className='px-4 py-2 text-center bg-green-400 rounded-lg font-semibold'>
                        SignUp
                    </Link>
                </div>
            </div>
        </div>
    )
}
