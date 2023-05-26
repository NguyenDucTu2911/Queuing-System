import { combineReducers } from "redux";
import authSlice from "../Slices/authSlice";
import reportSlice from "../Slices/reportSlice";
import deviceSlice from "../Slices/deviceSlice";
import serviceSlice from "../Slices/serviceSlice";
import ProgressionSlice from "../Slices/ProgressionSlice";
import AccountSlice from '../Slices/accountSlice';


const reducers = combineReducers({
  auth: authSlice,
  reports: reportSlice,
  device: deviceSlice,
  service: serviceSlice,
  Progression: ProgressionSlice,
  account: AccountSlice,
});

export type State = ReturnType<typeof reducers>;
export default reducers;
