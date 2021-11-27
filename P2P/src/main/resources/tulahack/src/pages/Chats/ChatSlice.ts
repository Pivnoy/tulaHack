import { createSlice } from '@reduxjs/toolkit';
import { placeholder } from './placeholder';

export type message = {
	from: string,
	timeStamp: number,
	content: string
}

export type dialog = {
	login: string,
	conversation: message[],
	lastMessageTime: number,
}

export type ChatType = dialog[] | null;

type stateType = {
    chats: ChatType,
    pickedChat: number,
}

const state: stateType = {
    chats: placeholder,
    pickedChat: -1
}

export const ChatsSlice = createSlice({
  name: 'Chat',
  initialState: state,
  
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload
    },

    setPickedChat: (state, action) => {
      state.pickedChat = action.payload;
    }
  },
})

export const { setChats, setPickedChat } = ChatsSlice.actions;

export default ChatsSlice.reducer;