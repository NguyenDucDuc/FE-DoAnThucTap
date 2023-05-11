import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API, { endpoints } from "../configs/API";


interface IUser {
    id: number;
    fullName: string;
    username: string;
    avatar: string;
    access_token: string;
    status: string;
}

const initialState: IUser = {
    id: 0,
    fullName: "Đăng nhập",
    username: "",
    avatar: "",
    access_token: "",
    status: ""
}

export const loginAsyncThunk = createAsyncThunk('user/login', async (reqBody: any, {rejectWithValue}) => {
    try {
        const res = await API.post(endpoints.user.login, {
            username: reqBody.username,
            password: reqBody.password
        })
        console.log(res.data)
        return res.data.data
    } catch (error: any) {
        console.log(error)
        return rejectWithValue(error.response.data)
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUsernameRedux: (state, action: any) => {
            state.fullName = action.payload.fullName
            state.id = action.payload.id
            state.avatar = action.payload.avatar
        },
        logOutUserRedux: (state) => {
            state.access_token = ""
            state.fullName = ""
            state.username = ""
            state.avatar = ""
            state.id = 0
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsyncThunk.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(loginAsyncThunk.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.status = "fulfilled"
            state.id = action.payload.id
            state.fullName = action.payload.fullName
            state.avatar = action.payload.avatar
            state.username = action.payload.username
            state.access_token = action.payload.access_token
        })
        builder.addCase(loginAsyncThunk.rejected, (state) => {
            state.status = "rejected"
        })
    }
})

export default userSlice.reducer
export const {updateUsernameRedux, logOutUserRedux} = userSlice.actions
