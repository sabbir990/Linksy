import Sidebar from '../Components/sidebar'
import NoChatChoosen from '../Components/noChatChoosen';
import Conversation from '../Components/conversation';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function Chats() {

  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* Sidebar */}
      <div className="flex-1 min-w-0 border-r-2 border-r-[#cecfd9]">
        <Sidebar />
      </div>

      {/* Conversation */}
      <div className="flex-3 min-w-0 min-h-0">
        {useSelector(
          (state: RootState) => state.chat.selectedChat
        )
          ? <Conversation />
          : <NoChatChoosen />
        }
      </div>

    </div>
  )
}