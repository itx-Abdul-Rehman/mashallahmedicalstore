import { configureStore } from '@reduxjs/toolkit'
import addmedicineReducer from './Medicine/medicineDetailSlice.js'

export default configureStore({
  reducer: {
    addmedicine: addmedicineReducer
  }
})