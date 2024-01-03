'use client'

import {
    Eye,
    EyeOff,
    Key,
    User2
} from 'lucide-react'
import Link from 'next/link';
import React, { useState } from 'react'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className='w-full h-screen flex justify-center items-center p-4'>
            <div className='w-full md:w-[500px] p-8 shadow-lg shadow-blue-400 rounded-3xl bg-white font-semibold'>
                <div className='my-[40px] text-center text-dark-text dark:text-light-text text-2xl'>
                    Login
                </div>

                <div className='w-full flex items-center p-4 rounded-lg shadow-md shadow-black gap-2 mb-[20px]'>
                    <User2 />
                    <input
                        className='w-full outline-none text-[18px]'
                        type="text"
                        placeholder='Username'
                    />
                </div>
                <div className='w-full flex items-center p-4 rounded-lg shadow-md shadow-black gap-2 mb-[20px]'>
                    <Key />
                    <input
                        className='w-full outline-none text-[18px]'
                        type={showPassword ? "text" : "password"}
                        placeholder='Password'
                    />
                    {showPassword ?
                        <EyeOff onClick={() => setShowPassword(false)} />
                        : <Eye onClick={() => setShowPassword(true)} />}
                </div>

                <div className='w-full flex flex-col gap-4'>
                    <div className='w-full flex gap-2 mt-[50px]'>
                        <button
                            className='w-full bg-gray-500 px-3 py-2 rounded-md font-semibold text-white text-[18px] outline-none text-center'>
                            Login
                        </button>
                        <Link
                            className='w-full bg-gray-500 px-3 py-2 rounded-md font-semibold text-white text-[18px] outline-none text-center'
                            href={"/auth/sign-up"}>
                            Sign Up
                        </Link>
                    </div>
                    <Link
                        href={"/auth/"}
                        className='w-full bg-gray-500 px-3 py-2 rounded-md font-semibold text-white text-[18px] outline-none text-center
                        transition-all duration-300 hover:bg-red-600 '>
                        Forgot Password
                    </Link>
                </div>
            </div>
        </div >
    )
}
