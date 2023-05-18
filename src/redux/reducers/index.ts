import { combineReducers } from "redux";
import authSlice from "../Slices/authSlice";
import reportSlice from "../Slices/reportSlice";
import deviceSlice from "../Slices/deviceSlice";


const reducers = combineReducers({
    auth: authSlice,
    reports: reportSlice,
    device: deviceSlice,
})

export type State = ReturnType<typeof reducers>
export default reducers


