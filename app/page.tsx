"use client"

import Chats from "./src/App Interfaces/chats";
import PrivateRoute from "./src/Utils/privateRoute";

export default function Home() {


  return (
    <PrivateRoute>
      <main className="font-[family-name:var(--font-plus-jakarta-sans)]">
        <Chats />
      </main>
    </PrivateRoute>
  );
}
