'use client'

import useBase from '@/app/hooks/useBase';
import axios from 'axios';
import {
    Eye,
    EyeOff,
    Globe,
    Key,
    User2
} from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface RegisterData {
    name: string;
    email: string;
    username: string;
    password: string;
    password2: string;
}

export default function SignUp() {
    const [data, setData] = useState<RegisterData>({
        'name': '',
        'username': '',
        'email': '',
        'password': '',
        'password2': ''
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
        if (data.email.trim() === '' || data.password.trim() === '' || data.password2.trim() === '' || data.name.trim() === '' || data.username.trim() === '') {
            toast.error("Enter All Fields");
            return false;
        }
        if (data.password.length < 6 || data.password2.length < 6) {
            toast.error("Password should be more than or equalto 6 characters");
            return false;
        }

        if (data.password !== data.password2) {
            toast.error("Both Password should be same");
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
            await axios.post(url + "/auth/register", data)
                .then(res => {
                    if (res.data.status === 'error') {
                        toast.error(res.data.message);
                        return;
                    }
                    toast.success("Sign Up Successful");
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
            <div className='w-full md:w-[500px] p-8 shadow-lg shadow-blue-400 rounded-3xl bg-white font-semibold text-black'>
                <div className='my-[40px] text-center text-dark-text dark:text-light-text text-2xl'>
                    Sign Up
                </div>

                <div className='w-full flex items-center p-4 rounded-lg shadow-md shadow-black gap-2 mb-[20px]'>
                    <User2 color='black' />
                    <input
                        className='w-full outline-none text-md'
                        type="text"
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                        placeholder='Fullname'
                    />
                </div>

                <div className='w-full flex items-center p-4 rounded-lg shadow-md shadow-black gap-2 mb-[20px]'>
                    <User2 color='black' />
                    <input
                        className='w-full outline-none text-md'
                        type="text"
                        name='username'
                        value={data.username}
                        onChange={handleChange}
                        placeholder='Username'
                    />
                </div>
                <div className='w-full flex items-center p-4 rounded-lg shadow-md shadow-black gap-2 mb-[20px]'>
                    <Globe color='black' />
                    <input
                        className='w-full outline-none text-md'
                        type="email"
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        placeholder='Email'
                    />
                </div>
                <div className='w-full flex items-center p-4 rounded-lg shadow-md shadow-black gap-2 mb-[20px]'>
                    <Key color='black' />
                    <input
                        className='w-full outline-none text-md'
                        name='password'
                        value={data.password}
                        onChange={handleChange}
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
                        name='password2'
                        value={data.password2}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        placeholder='Confirm Password'
                    />
                    {showPassword ?
                        <EyeOff color='black' onClick={() => setShowPassword(false)} />
                        : <Eye color='black' onClick={() => setShowPassword(true)} />}
                </div>

                <div className='w-full flex flex-col gap-4'>
                    <button
                        onClick={handleClick}
                        className='block mt-[40px] w-full bg-gray-500 px-3 py-2 text-white rounded-md font-semibold text-md outline-none text-center'>
                        {loading ?
                            <div className="animate-spin ease-linear rounded-full w-6 h-6 border-t-2 border-b-2 border-blue-800 m-auto"></div>
                            :
                            'Sign Up'}
                    </button>

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
