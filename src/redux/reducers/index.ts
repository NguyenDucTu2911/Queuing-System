import { combineReducers } from "redux";
import authSlice from "../slices/AuthSlice";
import reportSlice from "../slices/ReportSlice";
import deviceSlice from "../slices/DeviceSlice";
import serviceSlice from "../slices/ServiceSlice";
import ProgressionSlice from "../slices/ProgressionSlice";
import AccountSlice from "../slices/AccountSlice";

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
