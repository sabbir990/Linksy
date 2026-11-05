import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RegisterForm from '../src/Components/registerForm'
import LinksyLogo from "../src/Assets/Linksy_logo.png"

export default function RegisterPage() {
    return (
        <div className='flex flex-col items-center h-screen justify-center space-y-4 font-[family-name:var(--font-plus-jakarta-sans)]'>
            {/* Top Part */}
            <div className='flex flex-col items-center space-y-2'>
                <Image src={LinksyLogo} width={150} height={100} alt='Linksy logo'></Image>
                <h3 className='font-bold text-center text-3xl'>Create your account<div></div></h3>
                <p className='text-gray-500 text-center text-md'>It takes less than a minute. Then find people and start chatting.</p>
            </div>
            <div>
                <RegisterForm />
            </div>
            <div className="text-center">
                New to Linksy? <Link href={'/register'} className="font-semibold text-blue-500 cursor-pointer underline">Create an account</Link>
            </div>
        </div>
    )
}
