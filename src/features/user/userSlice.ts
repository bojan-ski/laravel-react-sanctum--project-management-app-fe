import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/types";
import { getUserDataFromLS, removeUserDataFromLS, setUserDataInLS } from "../../utils/storage";

const initialUserState: User = getUserDataFromLS() || {
    id: '',
    name: '',
    email: '',
    avatar: null,
    is_admin: 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserData: (state, { payload }: PayloadAction<User>): void => {
            state.id = payload.id;
            state.name = payload.name;
            state.email = payload.email;
            state.avatar = payload.avatar;
            state.is_admin = payload.is_admin;

            // set user data in storage
            setUserDataInLS(payload);
        },
        logoutUser: (state) => {
            state.id = '';
            state.name = '';
            state.email = '';
            state.avatar = null;
            state.is_admin = 0;

            // clear storage
            removeUserDataFromLS();
        },
    }
});

export const {
    setUserData, // Login
    logoutUser, // LogoutOption
} = userSlice.actions;

export default userSlice.reducer;