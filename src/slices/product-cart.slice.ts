import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API, { AuthApi, endpoints } from "../configs/API";


interface IProduct {
    id: number;
    price: number;
    name: string;
    image: string;
    quantity: number;
    product?: {
        id: number;
    }
}

interface IInitialState {
    listProduct: IProduct[];
    totalProduct: number;
    totalPice: number;
    status: string;
}

const initialState: IInitialState = {
    listProduct: [],
    totalProduct: 0,
    totalPice: 0,
    status: ""
}

export const getAllProductCartAsyncThunk = createAsyncThunk('productCart', async() => {
    try {
        const resCurrentUser = await AuthApi().get(endpoints.user.currentUser)
        const res = await API.get(endpoints.productCart.getByCartId(resCurrentUser.data.data.id))
        console.log(' get all')
        console.log(res.data.data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const deleteProductCart = createAsyncThunk('productCart/delete', async (reqBody: any) => {
    try {
        const res = await API.post(endpoints.productCart.delete, {
            productId: reqBody.productId,
            cartId: reqBody.cartId
        })
        console.log(res.data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const createProductCartAsyncThunk = createAsyncThunk('productCart/create', async (reqBody: any) => {
    try {
        const res = await AuthApi().post(endpoints.productCart.add, reqBody)
        console.log(res.data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const updateQuantityAsyncThunk = createAsyncThunk('productCart/updateQuantity', async (reqBody: any) => {
    try {
        const res = await AuthApi().post(endpoints.productCart.updateQuantity, reqBody)
        console.log(res.data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateTotalProduct: (state) => {
            state.totalProduct +=1
        },
        updateTotalProductCheckout: (state, action) => {
            state.totalProduct += action.payload
        },
        updateTotalPriceRedux: (state, action) => {
            state.totalPice = action.payload
        },
        incOrDecTotalPriceRedux: (state, action) => {
            state.totalPice += action.payload
        },
        setNullProductCart: (state) => {
            state.listProduct = []
            state.totalPice = 0
            state.status = ''
            state.totalProduct = 0
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProductCartAsyncThunk.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(getAllProductCartAsyncThunk.fulfilled, (state, action: any) => {
            state.status = "fulfilled"
            state.listProduct = action.payload.productCarts
            state.totalProduct = action.payload.totalProduct
            state.totalPice = action.payload.totalPrice
        })
        builder.addCase(getAllProductCartAsyncThunk.rejected, (state) => {
            state.status = "rejected"
        })

        builder.addCase(deleteProductCart.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(deleteProductCart.fulfilled, (state, action) => {
            state.status = "fulfilled"           
            const newList = state.listProduct.filter(item => item.id !== action.payload.id)
            state.listProduct = newList
        })

        builder.addCase(createProductCartAsyncThunk.pending, (state) => {
            state.status = 'pending'
        })
        builder.addCase(createProductCartAsyncThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.listProduct = [...state.listProduct, action.payload]
        })

        builder.addCase(updateQuantityAsyncThunk.pending, (state) => {
            state.status = 'pending'
        })
        builder.addCase(updateQuantityAsyncThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            const index = state.listProduct.findIndex((item) => item.id === action.payload.id)
            if(index !== -1){
                state.listProduct[index] = action.payload
            }
        })
    }
})

export default productSlice.reducer
export const {
    updateTotalProduct,
    updateTotalProductCheckout, 
    updateTotalPriceRedux,
    incOrDecTotalPriceRedux,
    setNullProductCart
} = productSlice.actions