import { configureStore , combineReducers} from '@reduxjs/toolkit'
import AlluserSlice from './AlluserSlice'  
import AllthriftSlice from './AllthriftSlice'
import Allnotification from './Allnotification'
import message from './Allmessage'
import  joinslice  from './Jointhrift'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'


  const persistConfig ={
    key: 'root',
    storage
  }
  const rootReducer = combineReducers({
    AlluserSlice,
    AllthriftSlice,
    Allnotification,
    message,
    joinslice
  })
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  export const store = configureStore({
    reducer: persistedReducer

  })

  export const persistor = persistStore(store)
