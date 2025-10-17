import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, getUsers } from "../../services/admin";
import type { CreateNewUserErrors, LaravelValidationErrors, NewUserFormData, UsersState } from "../../types/types";

const initialUserState: UsersState = {
    isLoading: false,
    users: [],
    search: '',
    currentPage: 1,
    lastPage: 1,
    total: 0,
    errors: {},
};

export const getAllUsers = createAsyncThunk('users/getAllUsers', async ({ search, page }: { search?: string, page?: number; }, { rejectWithValue }) => {
    console.log('getAllUsers');

    try {
        const response = await getUsers(search, page);

        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.message || 'Failed to fetch users');
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
    reducers: {
        setSearch: (state, {payload}) => {
            state.search = payload;
            state.currentPage = 1;
        },
        setPage: (state, { payload }) => {
            state.currentPage = payload;
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
                state.currentPage = payload.current_page;
                state.lastPage = payload.last_page;
                state.total = payload.total;
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.isLoading = false;
            })

            // create new user
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

export const {
    setSearch,
    setPage
} = usersSlice.actions;
export default usersSlice.reducer;