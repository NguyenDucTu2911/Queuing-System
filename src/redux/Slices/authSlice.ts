import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../../firebase/config";
import firebase from "../../firebase/config";

export interface user {
  UserName?: string;
  Password?: string;
  message?: string;
  Name?: string;
  Phone?: string;
  Email?: string;
  Role?: string;
  id?: string;
  createdAt?: any;
}

export interface SignInData {
  email: string;
  password: string;
  name?: string;
  id?: string;
  createdAt?: any;
  image?: string;
  phoneNumber?: any;
  accessToken?: string;
}
export interface forgotPass {
  password?: string;
  NewPassword?: string;
}

export interface SendMaillPass {
  email: string;
}

interface userUpdate {
  displayName?: string;
  photoURL?: any;
}

export interface DataState {
  data: SignInData | null;
  authenticated: boolean;
  loading: boolean;
  error: string | null;
  needVerification: boolean;
}

const initialState: DataState = {
  loading: false,
  error: null,
  data: null,
  needVerification: false,
  authenticated: false,
};

const saveAuthState = (state: DataState) => {
  localStorage.setItem("authState", JSON.stringify(state));
};

//login app
export const login = createAsyncThunk(
  "auth/login",
  async (user: SignInData) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password);
      const userData = userCredential.user;
      console.log(userCredential?.user);
      if (userData) {
        const accessToken = await userData.getIdToken();
        const data = {
          email: userData.email,
          id: userData.uid,
          name: userData.displayName,
          image: userData.photoURL,
          phoneNumber: userData.phoneNumber,
          accessToken: accessToken,
        } as SignInData;
        saveAuthState({
          ...initialState,
          data: data,
          authenticated: true,
        });
        return data;
      } else {
        throw new Error("User data is missing");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

//log out
export const SingOut = createAsyncThunk("auth/logOut", async () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      localStorage.removeItem("authState");
    })
    .catch((error) => {
      throw new Error("Thất Bại");
    });
});

// gửi email reset pass
export const sendPassword = createAsyncThunk(
  "auth/SendMailPass",
  async (user: SendMaillPass) => {
    try {
      if (user) {
        const auth = getAuth();
        return sendPasswordResetEmail(auth, user.email);
      } else {
        throw new Error("Không có dữ liệu");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// gửi email reset pass
// export const resetPassword = createAsyncThunk(
//   "auth/resetPassword",
//   async (users: forgotPass) => {
//     try {
//       const auth = getAuth();

//       const user = auth.currentUser;
//       const newPassword = getASecureRandomPassword();

//       updatePassword(user, newPassword)
//         .then(() => {
//           // Update successful.
//         })
//         .catch((error) => {
//           // An error ocurred
//           // ...
//         });

//       return updatePassword(user, users.password);
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
        // state.data.push(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = "sai tài khoản mật khẩu";
        state.authenticated = false;
      })
      .addCase(sendPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching data";
      })
      .addCase(SingOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(SingOut.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(SingOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching data";
      });
  },
});

export default authSlice.reducer;
