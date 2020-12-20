import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authenticationReducer } from './slices/authenticationSlice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
  middleware: [...getDefaultMiddleware()],
  devTools: false,
});

export default store;
