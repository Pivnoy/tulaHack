import { createSlice } from '@reduxjs/toolkit'

export type ChatType = '';

type stateType = {
    chats: ChatType
}

const state: stateType = {
    chats: ''
}

export const ChatsSlice = createSlice({
  name: 'Chat',
  initialState: state,
  
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload
    },
  },
})

export const { setChats } = ChatsSlice.actions;

export default ChatsSlice.reducer;