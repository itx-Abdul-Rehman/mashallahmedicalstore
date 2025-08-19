import { createSlice } from '@reduxjs/toolkit'

export const showCartSlice = createSlice({
    name: 'showCart',
    initialState: {
        value: false
    },
    reducers: {
        setShowCart: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setShowCart } = showCartSlice.actions

export default showCartSlice.reducer