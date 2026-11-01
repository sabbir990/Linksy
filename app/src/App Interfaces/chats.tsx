import Sidebar from '../Components/sidebar'
import NoChatChoosen from '../Components/noChatChoosen';
import { useContext } from 'react';
import { ChatContext } from '../Context API/chatContext';
import Conversation from '../Components/conversation';

export default function Chats() {

  const contextAPI = useContext(ChatContext)

  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* Sidebar */}
      <div className="flex-1 min-w-0 border-r-2 border-r-[#cecfd9]">
        <Sidebar />
      </div>

      {/* Conversation */}
      <div className="flex-3 min-w-0 min-h-0">
        {contextAPI?.isChatChoosen
          ? <Conversation />
          : <NoChatChoosen />
        }
      </div>

    </div>
  )
}