import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import notificationSlice from './features/regularUser/notificationSlice';
import projectSlice from './features/regularUser/projectSlice';
import documentSlice from './features/document/documentSlice';
import projectMemberSlice from './features/regularUser/projectMemberSlice';
import profileSlice from './features/regularUser/profileSlice';
import usersSlice from './features/adminUser/usersSlice';
import createUserSlice from './features/adminUser/createUserSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        notifications: notificationSlice,
        project: projectSlice,
        document: documentSlice,
        projectMembers: projectMemberSlice,
        profile: profileSlice,
        users: usersSlice,
        newUser: createUserSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;