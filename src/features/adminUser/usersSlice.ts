import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers, addUser, deleteUser } from "../../services/admin";
import { handleAsyncThunkError } from "../../api/reduxErrorHandler";
import type { AddUserFormData } from "../../schemas/admin/userSchema";
import type { AddNewUserErrors, UsersState } from "../../types/admin";

const initialUsersState: UsersState = {
    isLoading: false,
    users: [],
    search: '',
    pagination: {
        currentPage: 1,
        lastPage: 1,
    },
    total: 0,
};

export const getAllUsers = createAsyncThunk('users/getAllUsers', async (
    { search, page }: { search?: string, page?: number; },
    { rejectWithValue }
) => {
    try {
        const apiCall = await getUsers(search, page);

        return apiCall.data;
    } catch (error: any) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const addNewUser = createAsyncThunk('users/addNewUser', async (
    formData: AddUserFormData,
    { rejectWithValue }
) => {
    try {
        const apiCall = await addUser(formData);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError<AddNewUserErrors>(error, rejectWithValue);
    }
});

export const removeUser = createAsyncThunk("users/removeUser", async (
    userId: number,
    { rejectWithValue }
) => {
    try {
        const apiCall = await deleteUser(userId);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState: initialUsersState,
    reducers: {
        setUsersSearch: (state, { payload }): void => {
            state.search = payload;
            state.pagination.currentPage = 1;
        },
        setUsersPage: (state, { payload }): void => {
            state.pagination.currentPage = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // get all users
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.users = payload.data;
                state.pagination.currentPage = payload.current_page;
                state.pagination.lastPage = payload.last_page;
                state.total = payload.total;
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.isLoading = false;
            })

            // add new user
            .addCase(addNewUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.users.unshift(payload.data);
            })
            .addCase(addNewUser.rejected, (state) => {
                state.isLoading = false;
            })

            // delete user
            .addCase(removeUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.users = state.users.filter(
                    user => user.id !== payload.data.id
                );
            })
            .addCase(removeUser.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const {
    setUsersSearch,
    setUsersPage
} = usersSlice.actions;
export default usersSlice.reducer;