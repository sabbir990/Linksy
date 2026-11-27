
import React, { useEffect, useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import ChatArea from './chatArea';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGetSpecificUserQuery } from "../RTK Query/userAPISlice";
import { socket } from "../socket/socket";

interface FriendStatus {
  userId: string;
  status: "online" | "offline";
}

export default function Conversation() {

  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );

  const {
    data: user,
    error,
    isLoading
  } = useGetSpecificUserQuery(selectedChat);

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {

    const handleOnlineStatus = (data: FriendStatus) => {

      console.log("Received status:", data);

      // Only update the currently selected friend's status
      if (data.userId === user?.friend?.userId) {

        setIsOnline(data.status === "online");

      } else {
        setIsOnline(false)
      }

    };

    const handleOfflineStatus = (statusObject: { userId: string, status: "online" | "offline", disconnection_reason: string }) => {

      if (statusObject.userId === user?.friend?.userId) {
        if (statusObject.status === "offline") {
          setIsOnline(false);
        }
      }
    }

    const handleSelfDisconnection = (reason: string) => {
      console.log("The reason of self disconnection: ", handleSelfDisconnection)
    }

    socket.on("user-online", handleOnlineStatus);
    socket.on("user-offline", handleOfflineStatus);
    socket.on("disconnect", handleSelfDisconnection);

    return () => {
      socket.on("user-online", handleOnlineStatus);
      socket.on("user-offline", handleOfflineStatus);
      socket.on("disconnect", handleSelfDisconnection);
    };

  }, [user?.friend?.userId]);

  return (
    <div className="flex flex-col h-full min-h-0 w-full">

      <div className="flex w-full shrink-0 items-center space-x-3 bg-white border-b p-3 shadow-md">

        <div className="relative w-fit shrink-0 rounded-full border-2 border-gray-300 p-3">

          <FaRegUser size={18} color="#a6a4ab" />

          <div className={`absolute bottom-0 right-0 h-[13px] w-[13px] rounded-full border border-gray-100 ${isOnline ? "bg-green-500" : "bg-gray-500"
            }`} />

        </div>

        <div className="flex-1 min-w-0 space-y-1 flex items-center justify-between">

          <div>
            <h4 className="truncate font-semibold">
              {user?.friend?.displayName}
            </h4>

            <p className={`truncate text-sm ${isOnline ? "text-green-500" : "text-gray-500"
              }`}>
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>

          <button className="p-3 bg-indigo-100 rounded-md cursor-pointer">
            <BsThreeDotsVertical size={18} color="#6366f1" />
          </button>

        </div>

      </div>

      <div className="flex-1 min-h-0">
        <ChatArea />
      </div>

    </div>
  );
}
