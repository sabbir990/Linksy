
"use client";

import React, { useEffect, useEffectEvent, useState } from 'react';
import { FiEdit3, FiX, FiSearch } from "react-icons/fi";
import { ImSpinner } from 'react-icons/im';
import { UserSchemaTypes } from '../Models/Users';
import { FaChevronRight } from 'react-icons/fa';
import { BsFillSendPlusFill } from 'react-icons/bs';
import { getCurrentUser } from '../Utils/getCurrentUser';
import toast from 'react-hot-toast';
import { success } from 'zod';

export default function NewChat() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchedUsers, setSearchedUsers] = useState<UserSchemaTypes[] | []>([]);

    useEffect(() => {
        setIsSearching(true);

        if (!searchQuery.trim()) {
            setIsSearching(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsSearching(false);
            findUser(searchQuery);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchQuery])

    const findUser = async (userIdOrEmail: string) => {
        try {
            const searchUserRequest = await fetch(`/api/find-friends?usernameOrEmail=${encodeURIComponent(userIdOrEmail)}`, {
                method: "GET",
            })

            const searchUserResponse = await searchUserRequest.json();

            if (searchUserResponse?.users) {
                setSearchedUsers(searchUserResponse?.users);
                return;
            }

            setSearchedUsers([]);

        } catch (error) {
            console.error(error)
        }
    }

    const sendMessageRequest = async (friendEmail: string) => {
        try {

            const currentUser = await getCurrentUser();

            const friendRequestRequest = await fetch(`/api/send-friend-request`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    requestSender: currentUser?.user.email,
                    requestReciever: friendEmail,
                })
            })

            const friendRequestResponse = await friendRequestRequest.json();

            if (friendRequestResponse?.success) {
                if (friendRequestResponse?.status === 204) {
                    toast('Request has already been sent!', {
                        icon: '⚠️',
                    });

                    setIsModalOpen(false);

                    return;
                } else if (friendRequestResponse?.status === 201){
                    toast.success("Friend request sent!");
                    setIsModalOpen(false);

                    return;
                }
            }

            toast.error("Something went wrong! Try again later!");
            console.log("Friend request sending issue: ", friendRequestResponse)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {/* New Chat Button */}
            <div className='px-3 py-3 rounded-md bg-indigo-200 flex items-center justify-center'>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className='cursor-pointer w-full h-full'
                    aria-label="Create new chat"
                >
                    <FiEdit3 color='#6220e6' size={22} />
                </button>
            </div>

            {/* Create Contact Modal */}
            {isModalOpen && (
                <div
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className='w-full max-w-md rounded-xl bg-white p-6 shadow-xl space-y-3'
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="new-chat-title"
                    >
                        {/* Modal Header */}
                        <div className='flex items-center justify-between mb-6'>
                            <div>
                                <h2 id="new-chat-title" className='text-xl font-semibold text-gray-800'>
                                    Create a New Chat
                                </h2>
                                <p className='text-sm text-gray-500 mt-1'>
                                    Find your friends on Linksy.
                                </p>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className='p-2 rounded-md hover:bg-gray-100 cursor-pointer'
                                aria-label="Close modal"
                            >
                                <FiX size={22} color='#6b7280' />
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className='space-y-2'>
                            <label
                                htmlFor="user-search"
                                className='text-sm font-medium text-gray-700'
                            >
                                Email or Username
                            </label>

                            <div className='flex items-center border-2 border-gray-200 rounded-lg px-3 focus-within:border-indigo-500 transition-colors'>
                                <FiSearch size={20} color='#9ca3af' />

                                <input
                                    id="user-search"
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder='Enter email or username...'
                                    className='w-full p-3 outline-none text-sm'
                                    autoFocus
                                />
                            </div>

                            <p className='text-xs text-gray-400'>
                                Search for someone using their registered email or username.
                            </p>
                        </div>

                        {/* Users appears here... */}

                        <div className="w-full bg-gray-100 rounded-md overflow-hidden">

                            {isSearching ? (
                                <div className="flex justify-center items-center py-8">
                                    <ImSpinner className="animate-spin" size={22} />
                                </div>
                            ) : searchedUsers?.length > 0 ? (

                                <div className="flex flex-col divide-y divide-gray-200">

                                    {searchedUsers?.map((user, index) => (
                                        <div
                                            key={user.userId}
                                            className="flex items-center gap-3 p-3 hover:bg-indigo-50 cursor-pointer transition-colors"
                                        >

                                            {/* Profile image */}
                                            <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden bg-indigo-200 flex items-center justify-center">

                                                {user.avatarImageURL ? (
                                                    <img
                                                        src={user.avatarImageURL}
                                                        alt={user.displayName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-indigo-700 font-semibold text-lg">
                                                        {user.displayName?.charAt(0).toUpperCase()}
                                                    </span>
                                                )}

                                            </div>

                                            {/* User information */}
                                            <div className="flex-1 min-w-0">

                                                <h3 className="font-semibold text-gray-800 truncate">
                                                    {user.displayName}
                                                </h3>

                                                <p className="text-sm text-gray-500 truncate">
                                                    @{user.username}
                                                </p>

                                                <p className="text-xs text-gray-400 truncate">
                                                    {user.email}
                                                </p>

                                            </div>

                                            {/* Arrow icon */}
                                            <div className="shrink-0 text-gray-400">
                                                <button onClick={() => {
                                                    sendMessageRequest(user.email)
                                                }} className='text-black cursor-pointer p-3 rounded-full border border-black hover:text-white hover:bg-black ease-in duration-150'><BsFillSendPlusFill /></button>
                                            </div>

                                        </div>
                                    ))}

                                </div>

                            ) : (

                                <div className="py-8 text-center">
                                    <p className="text-sm text-gray-500">
                                        No users found.
                                    </p>
                                </div>

                            )}

                        </div>

                        {/* Modal Footer */}
                        <div className='flex justify-end mt-6'>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSearchQuery("");
                                }}
                                className='px-4 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
