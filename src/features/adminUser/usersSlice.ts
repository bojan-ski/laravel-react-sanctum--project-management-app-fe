import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUsers } from "../../services/admin";
import type { UsersState } from "../../types/types";

const initialUsersState: UsersState = {
    isLoading: false,
    users: [],
    search: '',
    currentPage: 1,
    lastPage: 1,
    total: 0,
    error: '',
};

export const getAllUsers = createAsyncThunk('users/getAllUsers', async ({ search, page }: { search?: string, page?: number; }, { rejectWithValue }) => {
    console.log('getAllUsers');

    try {
        const apiCall = await getUsers(search, page);

        return apiCall.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.statusText || 'Error - Fetch users');
    }
});

export const removeUser = createAsyncThunk("users/removeUser", async (userId: number | string, { rejectWithValue }) => {
    try {
        const apiCall = await deleteUser(userId);

        return { userId, message: apiCall.message };
    } catch (error: any) {
        console.log(error);

        return rejectWithValue(error?.response?.statusText || "Error - Delete user");
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState: initialUsersState,
    reducers: {
        setSearch: (state, { payload }): void => {
            state.search = payload;
            state.currentPage = 1;
        },
        setPage: (state, { payload }): void => {
            state.currentPage = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // get all users
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(getAllUsers.fulfilled, (state, { payload }) => {
                state.isLoading = false;                
                state.users = payload.data;
                state.currentPage = payload.current_page;
                state.lastPage = payload.last_page;
                state.total = payload.total;
            })
            .addCase(getAllUsers.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload as string;
            })

            // delete user
            .addCase(removeUser.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(removeUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.users = state.users.filter(user => user.id !== payload.userId);
            })
            .addCase(removeUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload as string;
            });
    },
});

export const {
    setSearch,
    setPage
} = usersSlice.actions;
export default usersSlice.reducer;