import { configureStore } from '@reduxjs/toolkit'
import countriesReducer from './listSlice'

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
})
