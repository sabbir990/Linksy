"use client"

import { useContext, useState } from "react";
import Chats from "./src/App Interfaces/chats";
import Login from "./src/App Interfaces/login";
import ChatContextProvider from "./src/Context API/contextProvider";
import { ChatContext } from "./src/Context API/chatContext";

export default function Home() {
  const chatAppContext = useContext(ChatContext);
  const user = chatAppContext?.user;

  return (
    <ChatContextProvider>
      <main className="font-[family-name:var(--font-plus-jakarta-sans)]">

        {user ? <Chats /> : <Login />}
      </main>
    </ChatContextProvider>
  );
}
