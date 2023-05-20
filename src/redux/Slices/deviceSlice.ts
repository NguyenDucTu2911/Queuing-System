import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "../../Firebase/config"

export interface Devices {
    id: string,
    Name?: string,
    Address?: string,
    Active?: string,
    MaID?: string,
    Connect?: string,
    Service?: string
    TypeDevice?: string,
    NameLogin?: string,
    pass?: string,
}

export interface AddDevice{
    id: string,
    MaID: string,
    Name: string,
    Address: string,
    Service: string,
    TypeDevice: string,
    NameLogin: string,
    pass: string,
    Connect?: string,
    Active?: string,
}


interface DeviceState{
    Device: Devices[],
    loading: boolean,
    error: string | undefined
}

const initialState : DeviceState = {
    Device: [],
    loading: false,
    error: undefined
}

//all device
export const fetchDevice = createAsyncThunk(
    'Device/fetchDevice',
    async () => {
        try {
           let ALLData = await db.collection("device").get()
           console.log(ALLData.docs.map((doc) => ({ id: doc.id }) as AddDevice))
            return ALLData.docs.map((doc) => ({id: doc.id,...doc.data() }) as AddDevice)
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

//add device
export const AddDevices = createAsyncThunk('Device/AddDevice', async (item: AddDevice) => {
  try {
    const data = await db.collection('device')
      .where('NameLogin', '==', item.NameLogin)
      .get();

    if (!data.empty) {
      console.log("Tài khoản đã tồn tại.");
      throw new Error('Tài khoản đã tồn tại.');
    } else {
      await db.collection('device').add(item);
      return {...item} as AddDevice;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});
 
//update
export const UpdateDevices = createAsyncThunk('Device/UpdateDevices', async (item: AddDevice) => {
  try {
    if(item && item.id){
        const data = await db.collection('device').doc(item.id)
        if(data && data.id){
            await data.update(item)
            return { ...item } as AddDevice; 
        }else{
            throw new Error("không có Người dùng") 
        }    
    }else{
        throw new Error("không có dữ liệu")
    }
   
  } catch (error) {
    console.error(error);
    throw error;
  }
});



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
                state.error = undefined;
            })
            .addCase(fetchDevice.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = undefined;
                state.Device = action.payload;
            })
            .addCase(fetchDevice.rejected, (state, action)=>{
                state.error = "lỗi dữ liệu"
                state.loading = false;
            })
            .addCase(AddDevices.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(AddDevices.fulfilled, (state, action) => {
                state.error = undefined
                state.loading = false;
                state.Device.push(action.payload)
            })
            .addCase(AddDevices.rejected, (state, action) => {
              state.error = action.error.message; 
              state.loading = false;
            })
            .addCase(UpdateDevices.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(UpdateDevices.fulfilled, (state, action) => {
                state.loading = false;
                state.Device = state.Device.map(device => {
                  if (device.id === action.payload.id) {
                    return action.payload; 
                  }
                  return device; 
                });
              })
            .addCase(UpdateDevices.rejected, (state, action) => {
              state.error = action.error.message; 
              state.loading = false;
            });
    }
})

export const { addReport, clearReports } = deviceSlice.actions;
export default deviceSlice.reducer;

