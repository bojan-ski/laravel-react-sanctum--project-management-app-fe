import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, getUsers } from "../../services/admin";
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
    currentPage: number;
    firstPage: number;
    lastPage: number;
    total: number;
    errors: CreateNewUserErrors;
};

const initialUserState: UsersState = {
    isLoading: false,
    users: [],
    currentPage: 1,
    firstPage: 1,
    lastPage: 1,
    total: 0,
    errors: {},
};

export const getAllUsers = createAsyncThunk('users/getAllUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await getUsers();
        console.log(response);

        return response;
    } catch (error: any) {
        console.log(error);

        return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
}
);

export const addNewUser = createAsyncThunk('users/addNewUser', async (newUserData: NewUserFormData, { rejectWithValue }) => {
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
});

const usersSlice = createSlice({
    name: 'users',
    initialState: initialUserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, {payload}) => {
                console.log(payload);

                state.isLoading = false;

                state.users = payload.data.data
                state.currentPage = payload.data.current_page
                state.firstPage = payload.data.from
                state.lastPage = payload.data.last_page
                state.total = payload.data.total
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                console.log(action);
                console.log(action.payload);

                state.isLoading = false;
                state.errors = action.payload as CreateNewUserErrors;
            })

            .addCase(addNewUser.pending, (state) => {
                state.isLoading = true;
                state.errors = {};
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                console.log(action);
                console.log(action.payload);

                state.isLoading = false;
            })
            .addCase(addNewUser.rejected, (state, { payload }) => {
                console.log(payload);

                state.isLoading = false;
                state.errors = payload as CreateNewUserErrors;
            });
    },
});

export default usersSlice.reducer;