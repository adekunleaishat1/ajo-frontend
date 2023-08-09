import { configureStore } from '@reduxjs/toolkit'
import AlluserSlice from './AlluserSlice'  

export const store = configureStore({
    reducer: {
        AlluserSlice
    },
  })
  