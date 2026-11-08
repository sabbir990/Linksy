import { useState } from "react";
import { ChatContext, ChatContextType } from "./chatContext";
import { ChatBarPropTypes } from "../Components/chatList";
import { UserSchemaTypes } from "../Models/Users";

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

const ChatContextProvider = ({ children, }: { children: React.ReactNode }) => {
    const [currentlySelectedChat, useCurrentlySelectedChat] = useState<ChatBarPropTypes | null>(null);
    const [isChatChoosen, setIsChatChoosen] = useState<boolean>(false);
    const [user, setUser] = useState<UserSchemaTypes | null>(null);

    console.log(user)

    // Function 1: Selecting chat.

    const selectChat = (chatId: string) => {
        const selectionRequest = chatData.find(chat => chat.id === chatId);
        const others = chatData.filter(chat => chat.id !== chatId);

        if (!selectionRequest) {
            console.log("Invalid request. No chat found to be selected!")
            return;
        }

        others.forEach((chat => {
            chat.isSelected = false;
        }))

        selectionRequest.isSelected = true;
        setIsChatChoosen(true);
        useCurrentlySelectedChat(selectionRequest);
    }

    const loadChat = () => {
        const findSelectedChat = chatData.find(chat => chat.isSelected === true);

        if(!findSelectedChat){
            throw new Error("Chat cannot load! Chat is not found!")
        }

        return findSelectedChat;
    }


    const contextObject: ChatContextType = {
        currentlySelectedChat,
        chatData,
        selectChat,
        loadChat,
        isChatChoosen,
        user,
        setUser
    }

    return (
        <ChatContext.Provider value={contextObject}>
            {children}
        </ChatContext.Provider>
    )

}

export default ChatContextProvider;