import { db } from "../../Firebase/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { user } from "./authSlice";

export interface Account {
  id: string;
  Name: string;
  description: string;
  quantity: number;
  quyenax?: boolean;
  quyenay?: boolean;
  quyenaz?: boolean;
  quyenBx?: boolean;
  quyenBy?: boolean;
  quyenBz?: boolean;
}

export interface User {
  id?: string;
  Action?: string;
  Name: string;
  Role?: string;
  SDT?: string;
  UserName?: string;
  password?: string;
  email?: string;
  reviewPassword?: string;
}

export interface ActivityLogs {
  id?: string;
  IP?: string;
  Time?: string;
  Name: string;
  Active?: string;
}

export interface position {
  id: string;
  Name: string;
  label: string;
  value: string;
}

interface AccountState {
  Account: (Account | User | ActivityLogs | position)[];
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

export const newRole = createAsyncThunk(
  "account/newDate",
  async (newData: Account) => {
    try {
      const checkData = await db
        .collection("Role")
        .where("Name", "==", newData.Name)
        .get();
      if (!checkData.empty) {
        throw new Error("Role đã tồn tại");
      } else {
        await db.collection("Role").add(newData);
        return { ...newData } as Account;
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const updateRole = createAsyncThunk(
  "account/updateRole",
  async (Role: Account) => {
    try {
      if (Role) {
        const data = await db.collection("Role").doc(Role.id);
        if (data && data.id) {
          data.update(Role);
          return { ...Role, id: Role.id } as Account;
        } else {
          throw new Error("Role Không Tồn Tại");
        }
      } else {
        throw new Error("Không có dữ liệu");
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const fetchUsers = createAsyncThunk("account/fetchUsers", async () => {
  try {
    const data = await db.collection("users").get();
    if (data) {
      const UsersData: User[] = [];
      data.docs.forEach((item) => {
        const allData = { id: item.id, ...item.data() } as User;
        UsersData.push(allData);
      });
      return UsersData;
    } else {
      throw new Error("Không có dữ liệu");
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const newUser = createAsyncThunk(
  "account/newUser",
  async (newData: User) => {
    try {
      const data = await db
        .collection("users")
        .where("email", "==", newData.email)
        .get();
      if (!data.empty) {
        throw new Error("Tài Khoản đã Tồn Tại");
      } else {
        await db.collection("users").add(newData);
        return { ...newData, id: newData.id };
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const updateUser = createAsyncThunk(
  "account/updateUser",
  async (users: User) => {
    try {
      if (users && users.id) {
        const data = db.collection("users").doc(users.id);
        if (data) {
          await data.update(users);
          return { ...users, id: users.id } as User;
        } else {
          throw new Error("không có Người dùng");
        }
      } else {
        throw new Error("Không có data");
      }
    } catch (e) {
      throw e;
    }
  }
);

export const fetchActivityLog = createAsyncThunk(
  "account/fetchActivityLog",
  async () => {
    try {
      const data = await db.collection("ActivityLog").get();
      if (data) {
        const ActivityLogData: ActivityLogs[] = [];
        data.docs.forEach((doc) => {
          const ActivityLog = { id: doc.id, ...doc.data() } as ActivityLogs;
          ActivityLogData.push(ActivityLog);
        });
        return ActivityLogData;
      } else {
        throw new Error("không có dữ liệu");
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const fetchPosition = createAsyncThunk(
  "account/fetchPosition",
  async () => {
    try {
      const data = await db.collection("Role").get();

      if (!data.empty) {
        const dataPositions: position[] = data.docs.map((doc) => ({
          id: doc.data().id,
          Name: doc.data().Name,
          label: doc.data().Name,
          value: doc.data().Name,
        }));

        console.log(dataPositions);
        return dataPositions;
      } else {
        throw new Error("Không có data");
      }
    } catch (e) {
      throw e;
    }
  }
);

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
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.Account = state.Account.map((account) =>
          account.id === action.payload.id ? action.payload : account
        );
        state.loading = false;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.error = action.error.message ?? "error data";
        state.loading = false;
      })
      .addCase(newRole.fulfilled, (state, action) => {
        state.Account.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(newRole.rejected, (state, action) => {
        state.error = action.error.message ?? "error data";
        state.loading = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.Account = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message ?? "error data";
        state.loading = false;
      })
      .addCase(newUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newUser.fulfilled, (state, action) => {
        state.Account.push(action.payload);
        state.loading = false;
      })
      .addCase(newUser.rejected, (state, action) => {
        state.error = action.error.message ?? "error data";
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.Account = state.Account.map((account) =>
          account.id === action.payload.id ? action.payload : account
        );
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message ?? "error data";
        state.loading = false;
      })
      .addCase(fetchActivityLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityLog.fulfilled, (state, action) => {
        state.Account = action.payload;
        state.loading = false;
      })
      .addCase(fetchActivityLog.rejected, (state, action) => {
        state.error = action.error.message ?? "error data";
        state.loading = false;
      })
      .addCase(fetchPosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.Account = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosition.rejected, (state, action) => {
        state.error = action.error.message ?? "error data";
        state.loading = false;
      });
  },
});

export default AccountSlice.reducer;
