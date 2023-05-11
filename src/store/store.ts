import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/user.slice";
import { useDispatch } from "react-redux";
import productCartSlice from "../slices/product-cart.slice";
import productSlice from "../slices/product.slice";



export const store = configureStore({
    reducer: {
        user: userSlice,
        productCart: productCartSlice,
        product: productSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 