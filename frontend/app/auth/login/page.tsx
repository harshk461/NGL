'use client'

import useBase from '@/app/hooks/useBase';
import axios from 'axios';
import {
    Eye,
    EyeOff,
    Key,
    User2
} from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface LoginData {
    email: string;
    password: string;
}

export default function Login() {
    const [data, setData] = useState<LoginData>({
        'email': '',
        'password': '',
    });
    const [loading, setLoading] = useState(false);
    const url = useBase();
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((pre) => ({
            ...pre,
            [name]: value
        }))
    }

    const validator = () => {
        if (data.email.trim() === '' || data.password.trim() === '') {
            toast.error("Enter All Fields");
            return false;
        }
        if (data.password.length < 6) {
            toast.error("Password should be more than or equal 6 chars");
            return false;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(data.email) === false) {
            toast.error("Enter Valid Email");
            return false;
        }

        return true;
    }

    const handleClick = async () => {
        try {
            if (validator() === false) {
                return;
            }
            setLoading(true);
            await axios.post("http://localhost:4000/auth/login", data)
                .then(res => {
                    if (res.data.status === 'error') {
                        toast.error(res.data.message);
                        return;
                    }
                    const token = res.data.token;
                    if (typeof window !== 'undefined' && window.localStorage) {
                        localStorage.setItem("token", token);
                    }
                    router.replace("/");
                })
        }
        catch (e) {
            console.log((e as Error).message);
        }
        finally {
            setLoading(false);
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className='w-full h-screen flex justify-center items-center p-4'>
            <div className='w-full md:w-[500px] p-8 shadow-lg shadow-blue-400 rounded-3xl bg-white font-semibold'>
                <div className='my-[40px] text-center text-dark-text dark:text-light-text text-2xl'>
                    Login
                </div>

                <div className='w-full flex items-center p-4 rounded-lg shadow-md shadow-black gap-2 mb-[20px]'>
                    <User2 color='black' />
                    <input
                        className='w-full outline-none text-[18px] text-black font-bold'
                        type="email"
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        placeholder='Username'
                    />
                </div>
                <div className='w-full flex items-center p-4 rounded-lg shadow-md shadow-black gap-2 mb-[20px]'>
                    <Key color='black' />
                    <input
                        className='w-full outline-none text-[18px] text-black font-bold'
                        type={showPassword ? "text" : "password"}
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                        placeholder='Password'
                    />
                    {showPassword ?
                        <EyeOff color='black' onClick={() => setShowPassword(false)} />
                        : <Eye color='black' onClick={() => setShowPassword(true)} />}
                </div>

                <div className='w-full flex flex-col gap-4'>
                    <div className='w-full flex gap-2 mt-[50px]'>
                        <button
                            onClick={handleClick}
                            className='w-full bg-gray-500 px-3 py-2 rounded-md font-semibold text-white text-[18px] outline-none text-center'>
                            {loading ?
                                <div className="animate-spin ease-linear rounded-full w-6 h-6 border-t-2 border-b-2 border-blue-800 m-auto"></div>
                                :
                                'Login'}
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
