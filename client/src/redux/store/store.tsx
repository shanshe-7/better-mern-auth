import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: [...getDefaultMiddleware({ serializableCheck: false })],
  devTools: process.env.NODE_ENV !== 'development' ? false : true,
});
