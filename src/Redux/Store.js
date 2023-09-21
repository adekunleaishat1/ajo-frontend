import { configureStore } from '@reduxjs/toolkit'
import AlluserSlice from './AlluserSlice'  
import AllthriftSlice from './AllthriftSlice'

export const store = configureStore({
    reducer: {
        AlluserSlice,
        AllthriftSlice
    },
  })
  