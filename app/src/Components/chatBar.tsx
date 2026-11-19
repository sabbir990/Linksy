
import { FaRegUser } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

export default function ChatBar({ chat, isSelected, isOnline, lastMessage, lastMessageTime }: any) {

  const chatName = chat?.displayName || chat?.username || "Unknown User";

  return (
    <div
      className={`
        group flex w-full items-center gap-3 rounded-xl p-3
        cursor-pointer transition-all duration-200
        border
        ${
          isSelected
            ? "bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-100"
            : "bg-white border-transparent hover:bg-indigo-50 hover:border-indigo-100"
        }
      `}
    >
      {/* Profile Avatar */}
      <div
        className={`
          relative flex h-12 w-12 shrink-0 items-center justify-center
          rounded-full transition-colors
          ${
            isSelected
              ? "bg-indigo-500"
              : "bg-indigo-100 group-hover:bg-indigo-200"
          }
        `}
      >
        <FaRegUser
          size={20}
          className={isSelected ? "text-white" : "text-indigo-600"}
        />

        {/* Online Indicator */}
        <div
          className={`
            absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full
            border-2
            ${
              isSelected ? "border-indigo-600" : "border-white"
            }
            ${isOnline ? "bg-green-500" : "bg-gray-400"}
          `}
        />
      </div>

      {/* Chat Information */}
      <div className="flex-1 min-w-0 space-y-1">

        {/* Name and Time */}
        <div className="flex items-center justify-between gap-2">
          <h4
            title={chatName}
            className={`
              truncate text-sm font-semibold
              ${isSelected ? "text-white" : "text-gray-800"}
            `}
          >
            {chatName}
          </h4>

          <span
            className={`
              shrink-0 text-[11px]
              ${isSelected ? "text-indigo-100" : "text-gray-400"}
            `}
          >
            {lastMessageTime || ""}
          </span>
        </div>

        {/* Username */}
        <p
          className={`
            truncate text-xs
            ${isSelected ? "text-indigo-100" : "text-gray-400"}
          `}
        >
          @{chat?.username || "username"}
        </p>

        {/* Last Message */}
        <div className="flex items-center gap-1.5">
          <FiMessageCircle
            size={13}
            className={isSelected ? "text-indigo-200" : "text-gray-400"}
          />

          <p
            title={lastMessage}
            className={`
              truncate text-xs
              ${isSelected ? "text-indigo-100" : "text-gray-500"}
            `}
          >
            {lastMessage
              ? lastMessage.length > 30
                ? `${lastMessage.slice(0, 30)}...`
                : lastMessage
              : "Start a conversation"}
          </p>
        </div>
      </div>
    </div>
  );
}
