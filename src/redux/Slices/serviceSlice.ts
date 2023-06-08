import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { Progressions } from "./ProgressionSlice";

export interface Services {
  id: string;
  Maid: string;
  MaDV: string;
  Name: string;
  description: string;
  Active: string;
  STT: number;
  Time: string;
  increaseStart: number;
  increaseEnd: number;
  Prefix: number;
  Surfix: string;
  reset: string;
  autoIncrement: boolean;
  PrefixCB?: Boolean;
  SurfixCB?: Boolean;
}

interface ServicetState {
  Service: Services[];
  loading: boolean;
  error: string | null;
}

const initialState: ServicetState = {
  Service: [],
  loading: false,
  error: null,
};

//all Service
export const fetchService = createAsyncThunk(
  "Service/fetchService",
  async () => {
    try {
      let ALLData = await db.collection("Service").get();
      if (ALLData) {
        const Services: Services[] = [];
        ALLData.docs.map((doc) => {
          const data = { id: doc.id, ...doc.data() } as Services;
          Services.push({
            ...data,
          });
        });

        return Services;
      } else {
        throw new Error("không tìm thấy data");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//add Service
export const addService = createAsyncThunk(
  "Service/addService",
  async (newData: Services) => {
    try {
      if (newData) {
        const data = await db
          .collection("Service")
          .where("Maid", "==", newData.Maid)
          .get();
        if (!data.empty) {
          throw new Error("Mã Dịch Vụ Đã Tồn tại");
        } else {
          await db.collection("Service").add(newData);
          return { ...newData, id: newData.id } as Services;
        }
      } else {
        throw new Error("Thêm Bị Lỗi");
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

//Edit Service
export const UpdateService = createAsyncThunk(
  "Service/UpdateService",
  async (item: Services) => {
    try {
      let dataUpdate = db.collection("Service").doc(item.id);
      if (dataUpdate) {
        await dataUpdate.update(item);
        return { ...item, id: item.id } as Services;
      } else {
        throw new Error("không tìm thấy ngời dùng");
      }
    } catch (error) {
      throw error;
    }
  }
);

const ServiceSlice = createSlice({
  name: "Service",
  initialState,
  reducers: {
    clearService: (state) => {
      state.Service = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.Service = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching service";
      })
      .addCase(addService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.Service.concat(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching service";
      })
      .addCase(UpdateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateService.fulfilled, (state, action) => {
        state.Service = state.Service.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(UpdateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching reports";
      });
  },
});

export const { clearService } = ServiceSlice.actions;
export default ServiceSlice.reducer;
