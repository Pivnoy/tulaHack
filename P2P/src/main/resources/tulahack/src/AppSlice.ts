import { createSlice } from '@reduxjs/toolkit'

export type PageType = 'auth' | 'chat';

type stateType = {
    page: PageType
}

const state: stateType = {
    page: 'chat'
}

export const PageSlice = createSlice({
  name: 'page',
  initialState: state,
  
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
})

export const { setPage } = PageSlice.actions;

export default PageSlice.reducer;