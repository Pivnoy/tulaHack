import { createSlice } from '@reduxjs/toolkit'

export type BaseType = 'Info' | 'SignUp' | 'SignIn';

type stateType = {
    base: BaseType,
    login: string,
}

const state: stateType = {
    base: 'Info',
    login: 'Toha Pulya'
}

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState: state,
  
  reducers: {
    setBase: (state, action) => {
      state.base = action.payload
    },

    setLogin: (state, action) => {
      state.login = action.payload
    }
  },
})

export const { setBase, setLogin } = AuthSlice.actions;

export default AuthSlice.reducer;