import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "../../Firebase/config"

export interface Devices {
    id: string,
    Name?: string,
    Address?: string,
    Active?: string,
    MaID?: string,
    Connect?: string,
    Sevice?: string
}


interface DeviceState{
    Device: Devices[],
    loading: boolean,
    error: string | null
}

const initialState : DeviceState = {
    Device: [],
    loading: false,
    error: null
}

export const fetchDevice = createAsyncThunk(
    'Device/fetchDevice',
    async () => {
        try {
           let ALLData = await db.collection("device").get()
           console.log(ALLData.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Devices))
            return ALLData.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Devices)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const fetchDevice1 = createAsyncThunk(
    'Device/fetchDevice',
    async (id: string) => {
        try {
            const querySnapshot = await db
                .collection('device')
                .where('Action', '==', id)
                .get();

            const Devices: Devices[] = [];
            querySnapshot.forEach((doc) => {
                const report = doc.data() as Devices;
                Devices.push({
                    ...Devices,
                    id: report.id
                });
            });

            return Devices;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

const deviceSlice = createSlice({
    name: "Device",
    initialState,
    reducers: {
        addReport: (state, action) => {
            state.Device.push(action.payload);
        },
        clearReports: (state) => {
            state.Device = [];
        },
    },
    extraReducers: (builder) =>{
        builder
            .addCase(fetchDevice.pending , (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDevice.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                state.Device = action.payload;
            })
            .addCase(fetchDevice.rejected, (state, action)=>{
                state.error = "lỗi dữ liệu"
                state.loading = false;
            })
    }
})

export const { addReport, clearReports } = deviceSlice.actions;
export default deviceSlice.reducer;
