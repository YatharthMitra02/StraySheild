import {configureStore} from '@reduxjs/toolkit';
import authSlice  from '../features/slice';

export const store = configureStore({
    reducer: authSlice
});