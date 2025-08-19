import { createSlice } from '@reduxjs/toolkit'

export const cartItemSlice = createSlice({
    name: 'cartItem',
    initialState: {
        value: []
    },
    reducers: {
        setCartItem: (state, action) => {
            const newitem = {
                id: action.payload.id,
                name: action.payload.name,
                image: action.payload.image,
                price: action.payload.price,
                quantity: action.payload.quantity,
                option: action.payload.option,
            }
            state.value.push(newitem);
        },
        clearCartItem: (state) => {
            state.value = []
        },
        setQuantity: (state, action) => {
            const { index, key, value } = action.payload;
            state.value[index][key] = value;
        },
        removeCartItem:(state,action) => {
            const {index}=action.payload;
            state.value.splice(index, 1);
        }
       
    }
})

export const { setCartItem, clearCartItem, setQuantity, removeCartItem } = cartItemSlice.actions

export default cartItemSlice.reducer