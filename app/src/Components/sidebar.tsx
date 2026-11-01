import React from 'react'
import NewChat from './newChat'
import Profile from './profiles'
import SearchBar from './searchBar'
import ChatList from './chatList'

export default function Sidebar() {
    return (
        <div className='px-4 py-3'>
            <div className='flex items-center justify-between pb-3'>
                <h3 className='text-3xl font-bold text-tiny'>Linksy</h3>
                <div className='flex items-center space-x-2'>
                    <Profile />
                    <NewChat />
                </div>
            </div>

            <hr className='border-gray-300'/>
            {/* Search Bar! */}
            <div className='py-3'>
            <SearchBar />
            </div>
            <div className='py-3'>
                <ChatList />
            </div>
        </div>
    )
}
