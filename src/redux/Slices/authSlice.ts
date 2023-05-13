import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import { db } from "../../Firebase/config";

export interface user {
    UserName: string,
    Password: string,
    message: string
    Name: string
    Phone: string
    Email: string
    Role: string

    //neww pass
    NewPassword: any,
    reviewPassword: any
}

export interface Users {
    email: string;
    displayName?: string;
}

interface DataState {
    loading: boolean;
    error: string | null;
    data: Users | null;
}

const initialState: DataState = {
    loading: false,
    error: null,
    data: null,
};



export const fetchlogin = createAsyncThunk<Users, { email: string; password: string }>(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(response.user)

            const user: Users = {
                email: response.user?.email ?? '',
                displayName: response.user?.displayName ?? "",
            };
            return user;
        } catch (error) {
            return rejectWithValue('Invalid credentials.');
        }
    }
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
            .addCase(fetchlogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchlogin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchlogin.rejected, (state, action) => {
                state.loading = false
                state.error = "Invalid credentials"
            })
    },
})
export default authSlice.reducer;