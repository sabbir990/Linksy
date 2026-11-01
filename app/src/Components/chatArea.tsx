
import React, { useState } from 'react'
import { FiSend } from "react-icons/fi";

export default function ChatArea() {
    const [inputMessage, setInputMessage] = useState<string>("");

    const handleKeyOperations = (key: string) => {
        if(key === "Enter"){
            if(inputMessage.trim().length < 1){
                console.warn("Nothing found to send!")
                return;
            }

            else{
                console.log("message is being sent!")
            }
        }
    }
    
    return (
        <div className="flex flex-col h-full min-h-0 w-full">

            {/* Chats */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4">
                chatting....
            </div>

            {/* Message Input */}
            <div className="shrink-0 px-3 py-4 bg-white border-t border-gray-200 flex items-center justify-center space-x-4">

                <div className="flex items-center gap-3 w-[85%] bg-gray-100 rounded-full p-2 text-sm">
                    <input
                    onChange={(event) => {
                        setInputMessage(event.target.value);
                    }}

                    onKeyDown={(event) => {
                        handleKeyOperations(event.key)
                    }}
                        type="text"
                        placeholder="Write a message"
                        className="flex-1 outline-none px-3 py-2"
                    />

                    <p className="text-sm text-gray-400">{inputMessage.length}/2000</p>

                </div>
                <button className={`p-4 rounded-full ${inputMessage.trim().length > 0 ? "bg-indigo-500" : "bg-gray-100"} cursor-pointer`}>
                    <FiSend color={`${inputMessage.trim().length > 0 ? "#ffffff": "#6A7282"}`} />
                </button>

            </div>

        </div>
    )
}
