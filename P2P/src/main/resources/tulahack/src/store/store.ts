import { configureStore } from '@reduxjs/toolkit'
import BaseReducer from '../pages/Main/AuthSlice';
import PageReducer from '../AppSlice';
import ChatsReducer from '../pages/Chats/ChatSlice';

export const store = configureStore({
  reducer: {
      base: BaseReducer,
      page: PageReducer,
      chats: ChatsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch