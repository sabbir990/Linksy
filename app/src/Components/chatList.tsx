import React, { useContext } from 'react'
import ChatBar from './chatBar';
import { ChatContext } from '../Context API/chatContext';

export interface ChatBarPropTypes {
    id: string
    profileImage: string;
    isOnline: boolean;
    chatName: string;
    lastMessage: string;
    lastMessageTime: string;
    isSelected: boolean;
}


export default function ChatList() {

    const contextAPI = useContext(ChatContext);

    if(!contextAPI){
        throw new Error("ChatList must be used within ChatContextProvider")
    }

    return (
        <div className='space-y-2'>
            {contextAPI.chatData.map(chat => {
                return (
                    <ChatBar chat={chat} key={chat.id}/>
                )
            })}
        </div>
    )
}
