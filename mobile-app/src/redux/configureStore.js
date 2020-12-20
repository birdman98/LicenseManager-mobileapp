import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { appReducer } from './slices/appSlice';
import { authenticationReducer } from './slices/authenticationSlice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    app: appReducer,
  },
  middleware: [...getDefaultMiddleware()],
  devTools: false,
});

export default store;
