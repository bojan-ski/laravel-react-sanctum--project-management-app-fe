import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassword } from "../../services/profile";
import type { LaravelValidationErrors } from "../../types/global";
import type { ChangePasswordFormDataErrors,  ProfileState } from "../../types/types";
import type { ChangePasswordFormData } from "../../schemas/profileSchema";

const initialProfileState: ProfileState = {
    isLoading: false
};

export const userChangePassword = createAsyncThunk('profile/userChangePassword', async (
    changePasswordFormData: ChangePasswordFormData,
    { rejectWithValue }
) => {
    try {
        const apiCall = await changePassword(changePasswordFormData);

        return apiCall;
    } catch (error: any) {
        if (error.response?.status === 422) {
            const fieldErrors = error?.response?.data?.errors as LaravelValidationErrors;
            const formattedErrors: ChangePasswordFormDataErrors = {};

            Object.keys(fieldErrors).forEach((key) => {
                formattedErrors[key as keyof ChangePasswordFormDataErrors] = fieldErrors[key][0];
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
            })
            .addCase(userChangePassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(userChangePassword.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default profileSlice.reducer;