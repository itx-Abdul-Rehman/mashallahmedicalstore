import { createSlice } from '@reduxjs/toolkit'

export const cartItemSlice = createSlice({
    name: 'cartItem',
    initialState: {
        value: [{
            name: "",
            image: "",
            price:"",
            quantity: "",
        }]
    },
    reducers: {
        setCartItem: (state, action) => {
            const {  key, value } = action.payload;
            state.value.push({ [key]: value });
        },
        clearCartItem: (state) => {
            state.value = [{
            name: "",
            image: "",
            price:"",
            quantity: "",
        }]
        }
    }
})

export const { setCartItem, clearCartItem } = cartItemSlice.actions

export default cartItemSlice.reducer