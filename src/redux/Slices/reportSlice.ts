import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../Firebase/config";

export interface Report {
    id: string;
    des?: string,
    idCha?: string,
    date?: string
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
    'report/fetchReports',
    async (id: string) => {
        try {
            const querySnapshot = await db
                .collection('chart')
                .where('id-cha', '==', id)
                .get();

            const reports: Report[] = [];
            querySnapshot.forEach((doc) => {
                const report = doc.data() as Report;
                reports.push({ ...report });
            });

            return reports;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);


const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        addReport: (state, action) => {
            console.log("check", state.reports)
            state.reports.push(action.payload);
        },
        clearReports: (state) => {
            state.reports = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReports.fulfilled, (state, action) => {
                state.reports = action.payload;
                // state.reports.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchReports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Error fetching reports';
            });
    },
});

export const { addReport, clearReports } = reportSlice.actions;
export default reportSlice.reducer;