import { createSlice } from '@reduxjs/toolkit';
import { placeholder } from './placeholder';

export type message = {
	from: string,
	timeStamp: number,
	content: string
}

export type dialog = {
	login: string,
	conversation: message[] | [],
	lastMessageTime: number,
}

export type ChatType = dialog[] | null;

export type client = {
  login: string,
  publicKey: string
}

type stateType = {
    chats: ChatType | null,
    pickedChat: number,
    conversationMode: boolean,
    currentClient: client | null,
}

const state: stateType = {
    chats: null,
    pickedChat: -1,
    conversationMode: false,
    currentClient: null
}

export const ChatsSlice = createSlice({
  name: 'Chat',
  initialState: state,
  
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload
    },

    setConversationMode: (state, action) => {
      state.conversationMode = action.payload;
    },

    addEmptyChat: (state, action) => {
      console.log(action.payload.login);
      const msg = { login: action.payload.login, conversation: [], lastMessageTime: -1 };
      state.chats = state.chats?.concat(msg) || [msg];
    },

    setPickedChat: (state, action) => {
      state.pickedChat = action.payload;
    },

    setCurrentClient: (state, action) => {
      state.currentClient = action.payload;
    }
  },
})

export const { setChats, setPickedChat, addEmptyChat, setConversationMode, setCurrentClient } = ChatsSlice.actions;

export default ChatsSlice.reducer;