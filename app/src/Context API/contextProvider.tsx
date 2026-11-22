// import { useState } from "react";
// import { UserSchemaTypes } from "../Models/Users";
// import { ChatContext } from "./chatContext";

// const ChatContextProvider = ({ children, }: { children: React.ReactNode }) => {
//     const [isChatSelected, setIsChatSelected] = useState<boolean>(false);

//     const contextObject = {
//         isChatSelected, 
//         setIsChatSelected
//     }

//     return (
//         <ChatContext.Provider value={contextObject}>
//             {children}
//         </ChatContext.Provider>
//     )

// }

// export default ChatContextProvider;