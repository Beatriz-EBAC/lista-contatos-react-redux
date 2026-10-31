import { configureStore } from '@reduxjs/toolkit'
import contatosReducer from './contatosSlice'

export const store = configureStore({
  reducer: {
    contatos: contatosReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch