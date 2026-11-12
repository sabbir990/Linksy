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

const chatData: ChatBarPropTypes[] = [
    {
        id: "chat-001",
        profileImage: "https://i.pravatar.cc/150?img=12",
        isOnline: true,
        chatName: "Alex Morgan",
        lastMessage: "Hey! How's your project going?",
        lastMessageTime: "12:30 PM",
        isSelected: false,
    },
    {
        id: "chat-002",
        profileImage: "https://i.pravatar.cc/150?img=47",
        isOnline: true,
        chatName: "Sarah Wilson",
        lastMessage: "I'll send you the files tonight.",
        lastMessageTime: "11:45 AM",
        isSelected: false,
    },
    {
        id: "chat-003",
        profileImage: "https://i.pravatar.cc/150?img=33",
        isOnline: false,
        chatName: "David Chen",
        lastMessage: "Thanks for your help!",
        lastMessageTime: "Yesterday",
        isSelected: false,
    },
    {
        id: "chat-004",
        profileImage: "https://i.pravatar.cc/150?img=5",
        isOnline: true,
        chatName: "Emily Parker",
        lastMessage: "Are we still meeting tomorrow?",
        lastMessageTime: "Yesterday",
        isSelected: false,
    },
    {
        id: "chat-005",
        profileImage: "https://i.pravatar.cc/150?img=68",
        isOnline: false,
        chatName: "Michael Scott",
        lastMessage: "See you later 👋",
        lastMessageTime: "Oct 30",
        isSelected: false,
    },
];


export default function ChatList() {

    return (
        <div className='space-y-2'>
            {chatData.map(chat => {
                return (
                    <ChatBar chat={chat} key={chat.id}/>
                )
            })}
        </div>
    )
}
