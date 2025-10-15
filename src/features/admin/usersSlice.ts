import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createUser } from "../../services/admin";
import type { User } from "../../types/types";

const initialUserState = {
    users: []
};

export const addUser = createAsyncThunk('adminUsers/createUser', async (userData, { rejectWithValue }) => {

}
);

const usersSlice = createSlice({
    name: 'users',
    initialState: initialUserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {

            })
            .addCase(addUser.fulfilled, (state) => {

            })
            .addCase(addUser.rejected, (state, action) => {

            });
    },
});

export default usersSlice.reducer;