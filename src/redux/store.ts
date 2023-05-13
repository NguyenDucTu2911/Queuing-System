import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reducers from './reducers/index';
import thunk, { ThunkDispatch } from 'redux-thunk';

// Define root state type
export type RootState = ReturnType<typeof store.getState>;

// Define thunk action type
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

// Configure store with thunk middleware
export const store = configureStore({
    reducer: reducers,
    middleware: [thunk],
});


// Define dispatch type using ThunkDispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

// Export store and dispatch types
export default store;