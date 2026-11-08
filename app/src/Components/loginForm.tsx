import React, { useContext, useState } from 'react'
import loginSchema from '../Frontend Schemas/loginSchems';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { ChatContext } from '../Context API/chatContext';
import { UserSchemaTypes } from '../Models/Users';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type loginFormData = z.infer<typeof loginSchema>;

// type ContextProviderValueType = {
//     user: UserSchemaTypes;
//     setUser: (user: UserSchemaTypes) => void;
// }

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema)
    })
    const chatContext = useContext(ChatContext);
    const setUser = chatContext?.setUser!;
    const user = chatContext?.user;
    const router = useRouter();

    const onLoginSubmit = async (loginData: loginFormData) => {
        setIsLoading(true);
        try {
            const loginRequest = await fetch("/api/user-login", {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(loginData)
            })

            const loginResponse = await loginRequest.json();

            if (loginResponse.success) {
                if (loginResponse.status === 200) {
                    toast.success("Login Successful!");
                    setUser(loginResponse.user);
                    router.push(process.env.NEXT_PUBLIC_BASE_URL!)
                }
            }

            if (!loginResponse.success) {
                if (loginResponse.status === 401) {
                    toast.error("Wrong password given! Please recheck your password!");
                    return;
                }
            }

            if(!loginResponse.success){
                if(loginResponse.status === 402){
                    toast.error("This user isn't registered yet! Please register first!");
                    return;
                }
            }

            if(!loginResponse.success){
                if(loginResponse.status === 405){
                    toast.error("Something went wrong! Please try again after some time!");
                    console.error("Error logging in: ", loginResponse.errorMessage);
                    return;
                }
            }
        } catch (error) {
            console.error(error)
        }
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
                    <input className='w-[500px] mt-2 p-3 border-2 border-gray-300 rounded-md outline-none text-md' type={showPassword ? "text" : "password"} placeholder='Enter your password...' id='password' {...register("password")} />
                    <div className='text-gray-500 text-sm space-x-2'>
                        <input type="checkbox" id='show' className='cursor-pointer' onChange={(event) => {
                            if (event.target.checked) {
                                setShowPassword(true)
                            } else {
                                setShowPassword(false)
                            }
                        }} />
                        <label htmlFor="show" className='cursor-pointer'>Show password</label>
                    </div>
                    {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                </div>

                <button className='font-semibold border-2 border-indigo-500 text-center w-[500px] p-3 bg-indigo-500 text-white rounded-md cursor-pointer hover:bg-transparent hover:text-gray-500 hover:border-gray-500 ease-in duration-200' type='submit'>Login</button>
            </form>
        </div>
    )
}
