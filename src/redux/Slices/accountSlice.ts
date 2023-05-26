import { db } from "../../Firebase/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Account {
  id: string;
  Name: string;
  description: string;
  quantity: number;
  quyenax: boolean;
  quyenay: boolean;
  quyenaz: boolean;
}

interface AccountState {
  Account: Account[];
  error: null | string;
  loading: boolean;
}

const initialState: AccountState = {
  Account: [],
  error: null,
  loading: false,
};

export const fetchRole = createAsyncThunk("account/fetchRole", async () => {
  try {
    let data = await db.collection("Role").get();
    if (data) {
      const Role: Account[] = [];
      data.docs.forEach((doc) => {
        const DateRole = { id: doc.id, ...doc.data() } as Account;
        Role.push({
          ...DateRole,
        });
        console.log(DateRole);
      });
      return Role;
    } else {
      throw new Error("Không có dữ liệu");
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
});

const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRole.fulfilled, (state, action) => {
        state.Account = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchRole.rejected, (state, action) => {
        state.error = action.error.message ?? "error data";
      });
  },
});

export default AccountSlice.reducer;
