import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  token: string | null
  name: string | null
}

const initialState: UserState = {
  token: null,
  name: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

export const { setToken, setName } = userSlice.actions

export default userSlice.reducer