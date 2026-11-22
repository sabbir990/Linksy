import { createSlice } from "@reduxjs/toolkit";

interface ChatState{
    selectedChat : string | null,
}

const initialState: ChatState = {
    selectedChat: null
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        selectChat: (state, action) => {
            state.selectedChat = action.payload;
        },

        exitChat: (state, action) => {
            state.selectedChat = null;
        }
    }
})

export const {selectChat} = chatSlice.actions;
export default chatSlice.reducer;