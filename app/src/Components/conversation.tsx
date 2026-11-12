
import React from 'react';
import { FaRegUser } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import ChatArea from './chatArea';

export default function Conversation() {

  // Static chat data
  const loadedChat = {
    chatName: "Alex Morgan",
    isOnline: true
  };

  return (
    <div className="flex flex-col h-full min-h-0 w-full">

      {/* Top title section */}
      <div className="flex w-full shrink-0 items-center space-x-3 bg-white border-b p-3 shadow-md">

        {/* Profile icon */}
        <div className="relative w-fit shrink-0 rounded-full border-2 border-gray-300 p-3">
          <FaRegUser size={18} color="#a6a4ab" />

          {/* Online indicator */}
          <div className={`absolute bottom-0 right-0 h-[13px] w-[13px] rounded-full border border-gray-100 ${loadedChat.isOnline ? "bg-green-500" : "bg-gray-500"}`} />
        </div>

        {/* User information */}
        <div className="flex-1 min-w-0 space-y-1 flex items-center justify-between">
          <div>
            <h4 className="truncate font-semibold">
              {loadedChat.chatName}
            </h4>

            <p className={`truncate text-sm ${loadedChat.isOnline ? "text-green-500" : "text-gray-500"}`}>
              {loadedChat.isOnline ? "Online" : "Offline"}
            </p>
          </div>

          <button className="p-3 bg-indigo-100 rounded-md cursor-pointer">
            <BsThreeDotsVertical size={18} color="#6366f1" />
          </button>
        </div>

      </div>

      {/* Chat area */}
      <div className="flex-1 min-h-0">
        <ChatArea />
      </div>

    </div>
  );
}
