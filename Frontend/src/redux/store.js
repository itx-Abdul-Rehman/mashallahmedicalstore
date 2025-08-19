import { configureStore } from '@reduxjs/toolkit'
import addmedicineReducer from './Medicine/medicineDetailSlice.js'
import cartItemReducer from './Cart/cartItemSlice.js'

export default configureStore({
  reducer: {
    addmedicine: addmedicineReducer,
    cartItem:cartItemReducer,
  }
})