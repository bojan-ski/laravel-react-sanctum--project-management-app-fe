import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer, { logoutUser } from './features/user/userSlice';
import notificationReducer from './features/regularUser/notificationSlice';
import projectReducer from './features/regularUser/projectSlice';
import documentReducer from './features/document/documentSlice';
import projectMemberReducer from './features/regularUser/projectMemberSlice';
import tasksReducer from './features/regularUser/taskSlice';
import messagesReducer from './features/regularUser/messageSlice';
import usersReducer from './features/adminUser/usersSlice';
import allProjectReducer from './features/adminUser/projectSlice';

const appReducer = combineReducers({
    user: userReducer,
    notifications: notificationReducer,
    projects: projectReducer,
    documents: documentReducer,
    projectMembers: projectMemberReducer,
    tasks: tasksReducer,
    messages: messagesReducer,
    users: usersReducer,
    allProjects: allProjectReducer,
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