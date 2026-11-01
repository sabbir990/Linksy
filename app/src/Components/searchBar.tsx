import React from 'react'
import { IoSearchOutline } from "react-icons/io5";


export default function SearchBar() {
  return (
    <div className='flex items-center space-x-2 p-2 border border-gray-300 rounded-md'>
        <IoSearchOutline />
        <input type="text" placeholder='Search chats or people' className='w-full outline-none text-sm' />
    </div>
  )
}
