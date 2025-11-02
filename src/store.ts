import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import projectSlice from './features/regularUser/projectSlice';
import documentSlice from './features/document/documentSlice';
import profileSlice from './features/regularUser/profileSlice';
import usersSlice from './features/adminUser/usersSlice';
import createUserSlice from './features/adminUser/createUserSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        project: projectSlice,
        document: documentSlice,
        profile: profileSlice,
        users: usersSlice,
        newUser: createUserSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;