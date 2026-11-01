import React from 'react'
import { FiEdit3 } from "react-icons/fi";

export default function NewChat() {
    return (
        <div className='px-3 py-3 rounded-md bg-indigo-200 flex items-center justify-center'>
            <button className='cursor-pointer w-full h-full'>
                <FiEdit3 color='#6220e6' size={22} />
            </button>
        </div>
    )
}
