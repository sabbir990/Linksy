
import React from 'react'
import NewChat from './newChat'
import Profile from './profiles'
import SearchBar from './searchBar'
import ChatList from './chatList'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

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

            <hr className='border-gray-300' />

            {/* Search Bar! */}
            <div className='py-3'>
                <SearchBar />
            </div>

            <div>
                <Tabs>
                    <TabList className="flex items-center gap-2 p-1.5 bg-gray-100 rounded-full w-fit border-0">

                        <Tab
                            selectedClassName="!bg-indigo-600 !text-white !shadow-md"
                            className="
                px-5 py-2 rounded-full text-sm font-semibold
                text-gray-500 cursor-pointer
                transition-all duration-200
                hover:bg-indigo-100 hover:text-indigo-700
                border-0 outline-none
            "
                        >
                            Friends
                        </Tab>

                        <Tab
                            selectedClassName="!bg-indigo-600 !text-white !shadow-md"
                            className="
                px-5 py-2 rounded-full text-sm font-semibold
                text-gray-500 cursor-pointer
                transition-all duration-200
                hover:bg-indigo-100 hover:text-indigo-700
                border-0 outline-none
            "
                        >
                            Requests
                        </Tab>

                    </TabList>

                    <TabPanel className="pt-4">
                            <ChatList />
                    </TabPanel>

                    <TabPanel className="">
                        This is for Tab 2
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
