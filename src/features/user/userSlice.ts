import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../../services/auth";
import { getUserDataFromLS, removeUserDataFromLS, setUserDataInLS } from "../../utils/storage";
import type { LaravelValidationErrors, User } from "../../types/types";

type LoginErrors = {
    email?: string;
    password?: string;
    random?: string;
};

type UserState = {
    isLoading: boolean;
    user: User;
    errors: LoginErrors;
};

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

export const loginUser = createAsyncThunk("user/loginUser", async ({ email, password }: { email: string, password: string; }, { rejectWithValue }) => {
    try {
        const response = await login(email, password);

        return response;
    } catch (error: any) {
        if (error.response?.status === 422) {
            const fieldErrors = error.response.data.errors as LaravelValidationErrors;
            const formattedErrors: LoginErrors = {};

            for (const key in fieldErrors) {
                formattedErrors[key as keyof LoginErrors] = fieldErrors[key][0];
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
        const response = await logout();

        return response;
    } catch (error: any) {
        return rejectWithValue({ random: "Logout failed" });
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
                state.errors = payload as LoginErrors;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = initialUserState.user;

                removeUserDataFromLS();
            })
            .addCase(logoutUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.errors = payload as LoginErrors;
            });
    }
});

export default userSlice.reducer;