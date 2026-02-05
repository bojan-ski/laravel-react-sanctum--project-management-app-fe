import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer, { logoutUser } from './features/user/userSlice';
import notificationReducer from './features/regularUser/notificationSlice';
import projectReducer from './features/regularUser/projectSlice';
import documentReducer from './features/document/documentSlice';
import projectMemberReducer from './features/regularUser/projectMemberSlice';
import usersReducer from './features/adminUser/usersSlice';
import createUserReducer from './features/adminUser/createUserSlice';

const appReducer = combineReducers({
    user: userReducer,
    notifications: notificationReducer,
    project: projectReducer,
    document: documentReducer,
    projectMembers: projectMemberReducer,
    users: usersReducer,
    newUser: createUserReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === logoutUser.fulfilled.type) {
        state = undefined;
    }

    return appReducer(state, action);
};


export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;