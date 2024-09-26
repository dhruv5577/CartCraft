import { configureStore } from '@reduxjs/toolkit';
import { ProductApi } from './API/ProductApi';
import { AuthApi } from './API/AuthhApi';
import { UserApi } from './API/UserApii';
import userReducer from './Actions/UserSlice.js';

export const store = configureStore({
  reducer: {
    auth:userReducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([ProductApi.middleware,AuthApi.middleware,UserApi.middleware]),
});
