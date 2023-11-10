import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { navigation } from '../../utils/constants'
import { NavigationItem } from '../../types/types'

interface GlobalState {
  navigation: NavigationItem[]
}

const initialState: GlobalState = {
  navigation,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setCurrentSidebarLink: (state, action: PayloadAction<string>) => {
      state.navigation.forEach((item) => {
        if (item.name === action.payload) {
          item.current = true
        } else {
          item.current = false
        }
      })
    },
  },
})

export const { setCurrentSidebarLink } = sidebarSlice.actions

export default sidebarSlice.reducer