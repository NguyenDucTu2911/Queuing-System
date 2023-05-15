import { ThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import { db, dbRef } from "../../Firebase/config";
import { RootState } from "../store";

export interface user {
    UserName: string,
    Password: string,
    message: string
    Name: string
    Phone: string
    Email: string
    Role: string
    id: string,
    createdAt: any
}

export interface SingInData {
    email: string;
    password: string
}
export interface forgotPass {
    password: string
    NewPassword: string
}

interface DataState {
    data: SingInData | null;
    authenticated: boolean,
    loading: boolean;
    error: string | null;
    needVerfication: boolean,

}

const initialState: DataState = {
    loading: false,
    error: null,
    data: null,
    needVerfication: false,
    authenticated: false,

};


export const login = createAsyncThunk(
    'auth/login',
    async (user: SingInData, { rejectWithValue }) => {
        console.log(user.email, user.password)
        try {
            const response = await firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password);
            return response.user;
        } catch (error) {
            return rejectWithValue('Invalid credentials.');
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.authenticated = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.authenticated = true;
                // state.data = [action.payload];
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = "sai tài khoản mật khẩu";
                state.authenticated = false;
            })
    },
})
export default authSlice.reducer;