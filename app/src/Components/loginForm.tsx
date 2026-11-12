
"use client";

import React, { useState } from 'react';
import loginSchema from '../Frontend Schemas/loginSchems';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const router = useRouter();

    const onLoginSubmit = async (loginData: LoginFormData) => {
        setIsLoading(true);

        try {
            const loginRequest = await fetch("/api/user-login", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData)
            });

            const loginResponse = await loginRequest.json();

            if (loginResponse.success) {
                toast.success("Login Successful!");

                // Navigate to the chats page
                router.push("/");
                return;
            }

            if (loginResponse.status === 401) {
                toast.error("Wrong password! Please recheck your password!");
                return;
            }

            if (loginResponse.status === 402) {
                toast.error("This user isn't registered yet! Please register first!");
                return;
            }

            toast.error("Something went wrong! Please try again later!");

            console.error("Login error:", loginResponse.errorMessage);

        } catch (error) {
            console.error(error);
            toast.error("Unable to connect to the server!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='p-6 border-2 border-gray-300 rounded-lg'>
            <form onSubmit={handleSubmit(onLoginSubmit)} className='space-y-6'>

                <div className='space-y-2'>
                    <label htmlFor="email" className='font-semibold'>Email:</label>
                    <br />

                    <input
                        className='w-[500px] mt-2 p-3 border-2 border-gray-300 rounded-md outline-none text-md'
                        type="email"
                        placeholder='ex. youremail@gmail.com'
                        id='email'
                        {...register("email")}
                    />

                    {errors.email && (
                        <p className='text-red-500 text-sm'>{errors.email.message}</p>
                    )}
                </div>

                <div className='space-y-2'>
                    <label htmlFor="password" className='font-semibold'>Password:</label>
                    <br />

                    <input
                        className='w-[500px] mt-2 p-3 border-2 border-gray-300 rounded-md outline-none text-md'
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter your password...'
                        id='password'
                        {...register("password")}
                    />

                    <div className='text-gray-500 text-sm space-x-2'>
                        <input
                            type="checkbox"
                            id='show'
                            className='cursor-pointer'
                            onChange={(event) => setShowPassword(event.target.checked)}
                        />

                        <label htmlFor="show" className='cursor-pointer'>
                            Show password
                        </label>
                    </div>

                    {errors.password && (
                        <p className='text-red-500 text-sm'>{errors.password.message}</p>
                    )}
                </div>

                <button
                    className='font-semibold border-2 border-indigo-500 text-center w-[500px] p-3 bg-indigo-500 text-white rounded-md cursor-pointer hover:bg-transparent hover:text-gray-500 hover:border-gray-500 ease-in duration-200 disabled:opacity-50'
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

            </form>
        </div>
    );
}
