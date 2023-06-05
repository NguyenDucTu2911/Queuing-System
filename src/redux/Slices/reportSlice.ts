import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../Firebase/config";

export interface Report {
  id: string;
  des?: string;
  idCha?: string;
  date?: number[];
  data?: number[];
}

interface ReportState {
  reports: Report[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  reports: [],
  loading: false,
  error: null,
};

export const fetchReports = createAsyncThunk(
  "report/fetchReports",
  async (id: string) => {
    try {
      console.log(id);
      const querySnapshot = await db
        .collection("chart")
        .where("id-cha", "==", id)
        .get();

      const reports: Report[] = [];
      querySnapshot.forEach((doc) => {
        const report = doc.data() as Report;
        reports.push(report);
      });
      return reports;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.reports = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching reports";
      });
  },
});

export default reportSlice.reducer;
