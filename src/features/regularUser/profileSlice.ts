import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassword } from "../../services/profile";
import type { ProfileStateErrors, ChangePasswordFormData, LaravelValidationErrors, ProfileState } from "../../types/types";

const initialProfileState: ProfileState = {
    isLoading: false,
    changePasswordFormData: {
        old_password: '',
        new_password: '',
        new_password_confirm: ''
    },
    errors: {},
};

export const userChangePassword = createAsyncThunk('profile/userChangePassword', async (changePasswordFormData: ChangePasswordFormData, { rejectWithValue }) => {
    try {
        const apiCall = await changePassword(changePasswordFormData);

        return apiCall;
    } catch (error: any) {
        if (error.response?.status === 422) {
            const fieldErrors = error?.response?.data?.errors as LaravelValidationErrors;
            const formattedErrors: ProfileStateErrors = {};

            Object.keys(fieldErrors).forEach((key) => {
                formattedErrors[key as keyof ProfileStateErrors] = fieldErrors[key][0];
            });

            return rejectWithValue(formattedErrors);
        }

        if (error.response?.status === 404) {
            return rejectWithValue({ random: error.response.statusText || "Error - Change Password" });
        }

        return rejectWithValue({ random: error.response.data.message });
    }
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialProfileState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userChangePassword.pending, (state) => {
                state.isLoading = true;
                state.errors = {};
            })
            .addCase(userChangePassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(userChangePassword.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.errors = payload as ProfileStateErrors;
            });
    },
});

export default profileSlice.reducer;