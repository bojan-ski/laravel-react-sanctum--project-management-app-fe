import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "../../services/admin";
import type { LaravelValidationErrors, NewUserFormData, User } from "../../types/types";

type CreateNewUserErrors = {
    name?: string;
    email?: string;
    password?: string;
    random?: string;
};

type UsersState = {
    isLoading: boolean;
    users: User[];
    errors: CreateNewUserErrors;
};

const initialUserState: UsersState = {
    isLoading: false,
    users: [],
    errors: {},
};

export const addUser = createAsyncThunk('users/createUser', async (newUserData: NewUserFormData, { rejectWithValue }) => {
    try {
        const response = await createUser(newUserData);

        return response;
    } catch (error: any) {
        if (error.response?.status === 422) {
            const fieldErrors = error?.response?.data?.errors as LaravelValidationErrors;
            const formattedErrors: CreateNewUserErrors = {};

            Object.keys(fieldErrors).forEach((key) => {
                formattedErrors[key as keyof CreateNewUserErrors] = fieldErrors[key][0];
            });

            return rejectWithValue(formattedErrors);
        } else {
            return rejectWithValue({ random: error.response.statusText || "Error - Create new user" });
        }
    }
}
);

const usersSlice = createSlice({
    name: 'users',
    initialState: initialUserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {
                state.isLoading = true;
                state.errors = {};
            })
            .addCase(addUser.fulfilled, (state, action) => {
                console.log(action);
                console.log(action.payload);

                state.isLoading = false;
            })
            .addCase(addUser.rejected, (state, { payload }) => {
                console.log(payload);

                state.isLoading = false;
                state.errors = payload as CreateNewUserErrors;
            });
    },
});

export default usersSlice.reducer;