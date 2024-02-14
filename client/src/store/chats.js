import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    chats:[],
    chat:{}
}

export const chatSlice = createSlice({
    name:"Chats",
    initialState,
    reducers:{
        setChats : (state,action)=>{
            state.chats = action.payload
            state.chats = state.chats.reverse()
        },
        setChat:(state,action)=>{
            state.chat = action.payload
        }
    }
})

export const {setChats , setChat} = chatSlice.actions;

export default chatSlice.reducer