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
    error: string | null
}

const initialState : DeviceState = {
    Device: [],
    loading: false,
    error: null
}

//all device
export const fetchDevice = createAsyncThunk(
    'Device/fetchDevice',
    async () => {
        try {
           let ALLData = await db.collection("device").get()
            if(ALLData){
            const Device: AddDevice[] = [];
            ALLData.docs.map((doc) => {
                const data = ({id: doc.id,...doc.data() }) as AddDevice;
                Device.push({
                    ...data,
                });
            });
            return Device;
           }else{
                throw new Error ("không tìm thấy data")
           }
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
                state.error = action.error.message ?? 'Error fetching Devices';
                state.loading = false;
            })
            .addCase(AddDevices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddDevices.fulfilled, (state, action) => {
                state.error = null
                state.loading = false;
                state.Device.push(action.payload)
            })
            .addCase(AddDevices.rejected, (state, action) => {
              state.error = action.error.message ?? 'Error fetching Devices';
              state.loading = false;
            })
            .addCase(UpdateDevices.pending, (state) => {
                state.loading = true;
                state.error = null;
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
              state.error = action.error.message ?? 'Error fetching Devices';
              state.loading = false;
            });
    }
})

export const {clearReports } = deviceSlice.actions;
export default deviceSlice.reducer;

