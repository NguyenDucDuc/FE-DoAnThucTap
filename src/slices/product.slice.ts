import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthApi, endpoints } from "../configs/API";

export const getAllProductAsyncThunk = createAsyncThunk('product', async (url: any) => {
    const resProducts = await AuthApi().get(url)
    return resProducts.data.data
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        status: '',
        listProduct: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllProductAsyncThunk.fulfilled, (state, action: any) => {
            state.status = 'fulfilled'
            state.listProduct = action.payload
        })
    }
})

export default productSlice.reducer