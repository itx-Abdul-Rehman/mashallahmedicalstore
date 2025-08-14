import { createSlice } from '@reduxjs/toolkit'

export const medicineDetailSlice = createSlice({
    name: 'medicineDetail',
    initialState: {
        value: {
            name: "",
            description: "",
            category: "",
        }
    },
    reducers: {
        setMedicine: (state, action) => {
            console.log(action.payload)
            const { key, value } = action.payload;
            state.value[key] = value;
        },
        clearMedicine: (state, action) => {
            state.value = {
                name: "",
                description: "",
                category: "",
            }
        }
    }
})


export const { setMedicine, clearMedicine } = medicineDetailSlice.actions

export default medicineDetailSlice.reducer