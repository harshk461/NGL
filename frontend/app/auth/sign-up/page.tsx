'use client'

import {
    Eye,
    EyeOff,
    Globe,
    Key,
    User2
} from 'lucide-react'
import Link from 'next/link';
import React, { useState } from 'react'

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='w-full h-screen flex justify-center items-center p-4'>
            <div className='w-full md:w-[500px] p-8 shadow-lg shadow-blue-400 rounded-3xl bg-white font-semibold text-black'>
                <div className='my-[40px] text-center text-dark-text dark:text-light-text text-2xl'>
                    Sign Up
                </div>

                <div className='w-full flex items-center p-4 rounded-lg shadow-md shadow-black gap-2 mb-[20px]'>
                    <User2 color='black' />
                    <input
                        className='w-full outline-none text-md'
                        type="text"
                        placeholder='Fullname'
                    />
                </div>

                <div className='w-full flex items-center p-4 rounded-lg shadow-md shadow-black gap-2 mb-[20px]'>
                    <User2 color='black' />
                    <input
                        className='w-full outline-none text-md'
                        type="text"
                        placeholder='Username'
                    />
                </div>
                <div className='w-full flex items-center p-4 rounded-lg shadow-md shadow-black gap-2 mb-[20px]'>
                    <Globe color='black' />
                    <input
                        className='w-full outline-none text-md'
                        type="email"
                        placeholder='Email'
                    />
                </div>
                <div className='w-full flex items-center p-4 rounded-lg shadow-md shadow-black gap-2 mb-[20px]'>
                    <Key color='black' />
                    <input
                        className='w-full outline-none text-md'
                        type={showPassword ? "text" : "password"}
                        placeholder='Password'
                    />
                    {showPassword ?
                        <EyeOff color='black' onClick={() => setShowPassword(false)} />
                        : <Eye color='black' onClick={() => setShowPassword(true)} />}
                </div>
                <div className='w-full flex items-center p-4 rounded-lg shadow-md shadow-black gap-2 mb-[20px]'>
                    <Key color='black' />
                    <input
                        className='w-full outline-none text-md'
                        type={showPassword ? "text" : "password"}
                        placeholder='Confirm Password'
                    />
                    {showPassword ?
                        <EyeOff color='black' onClick={() => setShowPassword(false)} />
                        : <Eye color='black' onClick={() => setShowPassword(true)} />}
                </div>

                <div className='w-full flex flex-col gap-4'>
                    <Link
                        className='block mt-[40px] w-full bg-gray-500 px-3 py-2 text-white rounded-md font-semibold text-md outline-none text-center'
                        href={"/auth/sign-up"}>
                        Sign Up
                    </Link>

                    <h1 className='text-center font-semibold text-black'>
                        Already have an account?
                        <Link
                            className='pl-1 text-blue-400'
                            href={"/auth/login"}>
                            Login
                        </Link>
                    </h1>
                </div>
            </div>
        </div >
    )
}
