import { FaRegUser } from "react-icons/fa";
import { ChatBarPropTypes } from "./chatList";
// import { useContext } from "react";
// import { ChatContext } from "../Context API/chatContext";

interface ChatBarProps{
    chat: ChatBarPropTypes
}

export default function ChatBar({ chat }: ChatBarProps) {
  const {
    isOnline,
    chatName,
    lastMessage,
    lastMessageTime,
    isSelected
  } = chat;

  // const handleChatSelection = () => {
  //   if(!chat.id){
  //       throw new Error("Your chat selection request cannot be completed. No chat found for it!");
  //   }

  //   if(!contextAPI){
  //       throw new Error("Chat context cannot possibly be null!")
  //   }

  //   contextAPI.selectChat(chat.id);
  // }

  return (
    <div className={`flex w-full items-center space-x-3 rounded-lg bg-gray-100 p-3 cursor-pointer ${isSelected ? "bg-indigo-200" : ""}`}>
      {/* Profile icon */}
      <div className={`relative w-fit shrink-0 rounded-full ${isSelected ? "border-2 border-white" : "border-2 border-gray-300"} p-3`}>
        <FaRegUser size={18} color={`${isSelected ? "#ffffff": "#a6a4ab"}`} />

        <div
          className={`${
            isOnline ? "block" : "hidden"
          } absolute bottom-0 right-0 h-[13px] w-[13px] rounded-full border border-gray-100 bg-green-500`}
        />
      </div>

      {/* Text content — THIS is where flex-1 belongs */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h4 title={chatName} className="truncate font-semibold">
            {chatName}
          </h4>

          <p className="shrink-0 text-sm text-gray-500">
            {lastMessageTime}
          </p>
        </div>

        <p title={lastMessage} className={`truncate text-sm text-gray-500`}>
          {lastMessage.length > 30 ? `${lastMessage.slice(0, 30)}...` : lastMessage}
        </p>
      </div>
    </div>
  );
}