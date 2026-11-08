import { createContext } from 'react'
import { ChatBarPropTypes } from '../Components/chatList';
import { UserSchemaTypes } from '../Models/Users';

export interface ChatContextType {
    currentlySelectedChat: ChatBarPropTypes | null;
    chatData: ChatBarPropTypes[];
    selectChat: (chatId: string) => void;
    loadChat: () => ChatBarPropTypes;
    isChatChoosen: boolean;
    user: UserSchemaTypes | null,
    setUser: (user: UserSchemaTypes) => void;
}

export const ChatContext = createContext<ChatContextType | null>(null);