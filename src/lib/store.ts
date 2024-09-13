import productSlice from '@/redux/productSlice';
import userSlice from '@/redux/userSlice';
import {configureStore} from '@reduxjs/toolkit';

export const makeStore = () => {
 return configureStore({
  reducer: {
   user: userSlice,
   product: productSlice,
  },
  devTools: false,
 });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];