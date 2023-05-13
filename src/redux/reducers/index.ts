import { combineReducers } from "redux";
import authSlice from "../Slices/authSlice";


const reducers = combineReducers({
    auth: authSlice,
    // events: eventSlice,
    // pay: paySlice,
})

export type State = ReturnType<typeof reducers>
export default reducers


