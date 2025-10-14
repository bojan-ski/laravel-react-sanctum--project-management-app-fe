import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/types";

const initialUserState: User = {
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
        }
    }
});

export const {
    setUserData, // Login
} = userSlice.actions;

export default userSlice.reducer;