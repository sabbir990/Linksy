import { createContext } from 'react'
import { ChatBarPropTypes } from '../Components/chatList';

export interface ChatContextType {
    currentlySelectedChat: ChatBarPropTypes | null;
    chatData: ChatBarPropTypes[];
    selectChat: (chatId: string) => void;
    loadChat: () => ChatBarPropTypes;
    isChatChoosen: boolean;
}

export const ChatContext = createContext<ChatContextType | null>(null);