import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import usersSlice from './features/admin/usersSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        users: usersSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;