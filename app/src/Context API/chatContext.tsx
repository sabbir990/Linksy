import { createContext } from 'react'
import { UserSchemaTypes } from '../Models/Users';

export interface ChatContextType {
    isChatSelected: boolean,
    setIsChatSelected: (chatInfo: any) => void,
}

export const ChatContext = createContext<ChatContextType | null>(null);