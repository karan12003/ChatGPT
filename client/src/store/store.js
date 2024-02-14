import { configureStore } from "@reduxjs/toolkit";
import chatReducer  from "./chats";

export const store = configureStore({
    reducer : chatReducer
})