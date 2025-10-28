import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../../services/auth";
import { getUserDataFromLS, removeUserDataFromLS, setUserDataInLS } from "../../utils/storage";
import type { LaravelValidationErrors, LoginFormData, UserState, UserStateErrors } from "../../types/types";
import { deleteAccount } from "../../services/profile";

const initialUserState: UserState = {
    isLoading: false,
    user: getUserDataFromLS() || {
        id: '',
        name: '',
        email: '',
        avatar: null,
        role: '',
        created_at: '',
        updated_at: ''
    },
    errors: {}
};

export const loginUser = createAsyncThunk("user/loginUser", async ({ email, password }: LoginFormData, { rejectWithValue }) => {
    try {
        const apiCall = await login(email, password);

        return apiCall;
    } catch (error: any) {
        if (error.response?.status === 422) {
            const fieldErrors = error.response.data.errors as LaravelValidationErrors;
            const formattedErrors: UserStateErrors = {};

            for (const key in fieldErrors) {
                formattedErrors[key as keyof UserStateErrors] = fieldErrors[key][0];
            }

            return rejectWithValue(formattedErrors);
        }

        if (error.response?.status === 404) {
            return rejectWithValue({ random: error.response.statusText || "Error - Login" });
        }

        return rejectWithValue({ random: error.response.data.message });
    }
});

export const logoutUser = createAsyncThunk("user/logoutUser", async (_, { rejectWithValue }) => {
    try {
        const apiCall = await logout();
        console.log(apiCall);
        

        return apiCall;
    } catch (error: any) {
        console.log(error);
        
        return rejectWithValue({ random: "Error - Logout" });
    }
});

export const deleteUserAccount = createAsyncThunk('user/deleteAccount', async (password: string, { rejectWithValue }) => {    
    try {
        const apiCall = await deleteAccount(password);

        return apiCall;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return rejectWithValue({ random: error.response.statusText || "Error - Change Password" });
        }

        return rejectWithValue({ random: error.response.data.message });
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.errors = {};
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.data;

                setUserDataInLS(payload.data);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.errors = payload as UserStateErrors;
            })

            // logout
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.errors = {};
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = initialUserState.user;

                removeUserDataFromLS();
            })
            .addCase(logoutUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.errors = payload as UserStateErrors;
            })

            // delete user account
            .addCase(deleteUserAccount.pending, (state) => {
                state.isLoading = true;
                state.errors = {};
            })
            .addCase(deleteUserAccount.fulfilled, (state) => {
                state.isLoading = false;
                state.user = initialUserState.user;

                removeUserDataFromLS();
            })
            .addCase(deleteUserAccount.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.errors = payload as UserStateErrors;
            });
    }
});

export default userSlice.reducer;