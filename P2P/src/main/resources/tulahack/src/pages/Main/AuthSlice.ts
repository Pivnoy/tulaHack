import { createSlice } from '@reduxjs/toolkit'

export type BaseType = 'Info' | 'SignUp' | 'SignIn';

type stateType = {
    base: BaseType
}

const state: stateType = {
    base: 'Info'
}

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState: state,
  
  reducers: {
    setBase: (state, action) => {
      state.base = action.payload
    },
  },
})

export const { setBase } = AuthSlice.actions;

export default AuthSlice.reducer;