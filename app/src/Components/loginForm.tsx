import React from 'react'
import loginSchema from '../Frontend Schemas/loginSchems';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

type loginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onLoginSubmit = (loginData: loginFormData) => {
        console.log("Login data is here: ", loginData)
    }

    return (
        <div className='p-6 border-2 border-gray-300 rounded-lg'>
            <form onSubmit={handleSubmit(onLoginSubmit)} className='space-y-6'>
                <div className='space-y-2'>
                    <label htmlFor="email" className='font-semibold'>Email: </label><br />
                    <input className='w-[500px] mt-2 p-3 border-2 border-gray-300 rounded-md outline-none text-md' type="email" placeholder='ex. youremail@gmail.com' id='email' {...register("email")} />
                    {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="password" className='font-semibold'>Password: </label><br />
                    <input className='w-[500px] mt-2 p-3 border-2 border-gray-300 rounded-md outline-none text-md' type="password" placeholder='Enter your password...' id='password' {...register("password")} />
                    {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                </div>

                <button className='font-semibold border-2 border-indigo-500 text-center w-[500px] p-3 bg-indigo-500 text-white rounded-md cursor-pointer hover:bg-transparent hover:text-gray-500 hover:border-gray-500 ease-in duration-200' type='submit'>Login</button>
            </form>
        </div>
    )
}
