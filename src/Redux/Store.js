import { configureStore } from '@reduxjs/toolkit'
import AlluserSlice from './AlluserSlice'  
import AllthriftSlice from './AllthriftSlice'
import Allnotification from './Allnotification'
import message from './Allmessage'

export const store = configureStore({
    reducer: {
        AlluserSlice,
        AllthriftSlice,
        Allnotification,
        message
    },
  })
  