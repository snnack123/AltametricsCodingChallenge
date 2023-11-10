import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import globalReducer from './reducers/globalReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    global: globalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch