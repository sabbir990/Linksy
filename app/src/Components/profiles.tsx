import React from 'react'
import { CgProfile } from "react-icons/cg";


export default function Profile() {
    return (
        <div className='px-3 py-3 rounded-md bg-indigo-200 flex items-center justify-center'>
            <button className='cursor-pointer w-full h-full'>
                <CgProfile color='#6220e6' size={22} />
            </button>
        </div>
    )
}
