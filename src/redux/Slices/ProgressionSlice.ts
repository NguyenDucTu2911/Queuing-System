import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";

export interface Progressions {
  id: string;
  NameDV?: string;
  Active?: string;
  HSD?: string;
  Time?: string;
  STT?: number;
  Name?: string;
  power?: string;
  email?: string;
  SDT?: string;
  MaDV: String;
}

interface ProgressionsState {
  Progression: Progressions[];
  loading: boolean;
  error: string | null;
}

const initialState: ProgressionsState = {
  Progression: [],
  loading: false,
  error: null,
};

export const fetchProgressions = createAsyncThunk(
  "Progression/fetchProgressions",
  async () => {
    try {
      let data = await db.collection("Progression").get();
      if (data) {
        const Progressions: Progressions[] = [];
        data.docs.map((doc) => {
          const ProgressionData = { id: doc.id, ...doc.data() } as Progressions;
          Progressions.push({
            ...ProgressionData,
          });
        });

        return Progressions;
      } else {
        throw new Error("không tìm thấy data");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const addProgressions = createAsyncThunk(
  "Service/addService",
  async (newData: Progressions) => {
    try {
      if (newData) {
        const data = await db
          .collection("Progression")
          .where("Maid", "==", newData.STT)
          .get();
        if (!data.empty) {
          throw new Error("STT Đã Tồn tại");
        } else {
          await db.collection("Progression").add(newData);
          return { ...newData, id: newData.id } as Progressions;
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

export const fetchProgressionsId = createAsyncThunk(
  "Service/fetchProgressionsId",
  async (MaDv: string) => {
    try {
      if (!MaDv) {
        throw new Error("Không có mã dv");
      } else {
        const data = await db
          .collection("Progression")
          .where("MaDV", "==", MaDv)
          .get();
        if (data.empty) {
          throw new Error("Không có dữ liệu");
        } else {
          const progressions: Progressions[] = [];
          data.docs.forEach((doc) => {
            const progressionData = {
              id: doc.id,
              ...doc.data(),
            } as Progressions;
            progressions.push(progressionData);
          });
          console.log(progressions);
          return progressions;
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const ProgressionSlice = createSlice({
  name: "Progression",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgressions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgressions.fulfilled, (state, action) => {
        state.Progression = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProgressions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching service";
      })
      .addCase(addProgressions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProgressions.fulfilled, (state, action) => {
        state.Progression.concat(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addProgressions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching service";
      })
      .addCase(fetchProgressionsId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgressionsId.fulfilled, (state, action) => {
        state.Progression = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProgressionsId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching service";
      });
  },
});

export default ProgressionSlice.reducer;
