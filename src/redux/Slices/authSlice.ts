import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { db } from "../../Firebase/config";
import firebase from "../../Firebase/config";

export interface user {
    UserName?: string,
    Password?: string,
    message?: string
    Name?: string
    Phone?: string
    Email?: string
    Role?: string
    id?: string,
    createdAt?: any
}

export interface SignInData {
    email: string;
    password: string
    name?: string
    id?: string
    createdAt?: any
    image?: string
    phoneNumber?: any
}
export interface forgotPass {
    password?: string
    NewPassword?: string
}

export interface SendMaillPass {
    email: string
}

interface userUpdate {
    displayName?: string,
    photoURL?: any
}

interface DataState {
    data: SignInData | null;
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

//login app
export const login = createAsyncThunk(
    'auth/login',
    async (user: SignInData) => {
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            const userData = userCredential.user;
            console.log(userCredential)
            if (userData) {
                const data = {
                    email: userData.email,
                    id: userData.uid,
                    name: userData.displayName,
                    image: userData.photoURL,
                    phoneNumber: userData.phoneNumber,
                } as SignInData;
                return data;
            } else {
                throw new Error('User data is missing');
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

//log out
export const SingOut = createAsyncThunk(
    'auth/logOut',
    async () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
);

// gửi email reset pass
export const sendPassword = createAsyncThunk(
    'auth/SendMailPass',
    async (user: SendMaillPass) => {
        try {
            const auth = getAuth();
            return sendPasswordResetEmail(auth, user.email);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.data = null
            state.authenticated = false
        },
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
                state.data = action.payload;
                // state.data.push(...action.payload);


            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = "sai tài khoản mật khẩu";
                state.authenticated = false;
            })
            .addCase(sendPassword.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(sendPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = "lỗi đang xuất"
            })
    },
})
export const { logout } = authSlice.actions;
export default authSlice.reducer;