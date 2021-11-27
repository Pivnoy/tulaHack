import { createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs';

export type PageType = 'auth' | 'chat';

type stateType = {
    page: PageType,
    showAlert: boolean,
    alertText: string,
}

const state: stateType = {
    page: 'chat',
    showAlert: false,
    alertText: 'Вы пидорас ебучий'
}

export const PageSlice = createSlice({
  name: 'page',
  initialState: state,
  
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },

    setShowAlert: (state, action) => {
      state.showAlert = action.payload
    },

    setAlertText: (state, action) => {
      state.alertText = action.payload
    }
  },
})

export const { setPage, setAlertText, setShowAlert } = PageSlice.actions;

export default PageSlice.reducer;