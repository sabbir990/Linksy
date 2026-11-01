"use client"

import { useState } from "react";
import Chats from "./src/App Interfaces/chats";
import Login from "./src/App Interfaces/login";
import ChatContextProvider from "./src/Context API/contextProvider";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true)
  return (
    <ChatContextProvider>
      <main className="font-[family-name:var(--font-plus-jakarta-sans)]">

        {loggedIn ? <Chats /> : <Login />}
      </main>
    </ChatContextProvider>
  );
}
