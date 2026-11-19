import React, { useContext, useEffect, useState } from 'react'
import ChatBar from './chatBar';
import { getCurrentUser } from '../Utils/getCurrentUser';


export default function ChatList() {
    const [currentUser, setCurrentUser] = useState<any>();
    const [allFriends, setAllFriends] = useState<any>([]);

    useEffect(() => {
        getCurrentUser().then(result => {
            setCurrentUser(result);
        })
    }, [])

    const getAllFriendRequests = async (userEmail: string) => {
        try {
            const getAllFriends = await fetch(`/api/get-all-friends?userEmail=${encodeURIComponent(userEmail)}`, { method: "GET" });
            const getAllFriendsResponse = await getAllFriends.json();

            setAllFriends(getAllFriendsResponse?.allFriends)

            // console.log("All friends: ", getAllFriendsResponse);

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (currentUser?.user) {
            getAllFriendRequests(currentUser?.user?.email);
        }
    }, [currentUser])

    if(!allFriends){
        return;
    }

    return (
        <div className='space-y-2'>
            {allFriends.map((chat: any) => {
                return (
                    <ChatBar chat={chat} key={chat._id} />
                )
            })}
        </div>
    )
}
