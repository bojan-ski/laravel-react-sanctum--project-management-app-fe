import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import usersSlice from './features/admin/usersSlice';
import createUserSlice from './features/admin/createUserSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        users: usersSlice,
        newUser: createUserSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;