import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import userProjectsSlice from './features/regularUser/userProjectsSlice';
import createProjectSlice from './features/regularUser/createProjectSlice';
import profileSlice from './features/regularUser/profileSlice';
import usersSlice from './features/adminUser/usersSlice';
import createUserSlice from './features/adminUser/createUserSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        userProjects: userProjectsSlice,
        newProject: createProjectSlice,
        profile: profileSlice,
        users: usersSlice,
        newUser: createUserSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;