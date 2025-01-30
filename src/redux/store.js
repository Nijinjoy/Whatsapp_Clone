import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

console.log('Initial Redux State:', store.getState());

export default store;
