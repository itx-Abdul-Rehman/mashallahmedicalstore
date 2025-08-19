import { configureStore } from '@reduxjs/toolkit'
import addmedicineReducer from './Medicine/medicineDetailSlice.js'
import cartItemReducer from './Cart/cartItemSlice.js'
import showCartReducer from './Cart/showCartSlice.js'

export default configureStore({
  reducer: {
    addmedicine: addmedicineReducer,
    cartItem:cartItemReducer,
    showCart: showCartReducer,
  }
})