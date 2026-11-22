import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import { userAPISlice } from "../RTK Query/userAPISlice";

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        [userAPISlice.reducerPath]: userAPISlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(userAPISlice.middleware)
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;