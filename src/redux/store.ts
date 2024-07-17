import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';

export const makeStore = () => {
 return configureStore({
  reducer: {
   auth: authSlice,
   user: userSlice,
   product: productSlice,
  }
 });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];