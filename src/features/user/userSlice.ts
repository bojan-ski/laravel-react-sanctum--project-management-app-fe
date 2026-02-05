import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../../services/auth";
import { changePassword, deleteAccount } from "../../services/profile";
import { updateAvatar } from "../../services/avatar";
import { getUserDataFromLS, removeUserDataFromLS, setUserDataInLS } from "../../utils/storage";
import { handleAsyncThunkError } from "../../utils/reduxErrorHandler";
import type { LoginFormData } from "../../schemas/authSchema";
import type { ChangePasswordFormData } from "../../schemas/profileSchema";
import type { AuthState, AuthStateErrors } from "../../types/auth";
import type { ChangePasswordFormDataErrors, DeleteAccountFormDataError } from "../../types/profile";
import type { UpdateUserAvatarFormDataError } from "../../types/avatar";

const INIT_STATE = {
    is_admin: false,
    is_authenticated: false,
};

const initialUserState: AuthState = {
    isLoading: false,
    user: getUserDataFromLS() || INIT_STATE
};

export const loginUser = createAsyncThunk("user/loginUser", async (
    { email, password }: LoginFormData,
    { rejectWithValue }
) => {
    try {
        const apiCall = await login(email, password);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError<AuthStateErrors>(error, rejectWithValue);
    }
});

export const logoutUser = createAsyncThunk("user/logoutUser", async (
    _,
    { rejectWithValue }
) => {
    try {
        const apiCall = await logout();

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const updateUserAvatar = createAsyncThunk('user/updateAvatar', async (
    avatar: File,
    { rejectWithValue }
) => {
    try {
        const apiCall = await updateAvatar(avatar);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError<UpdateUserAvatarFormDataError>(error, rejectWithValue);
    }
});

export const userChangePassword = createAsyncThunk('user/userChangePassword', async (
    formData: ChangePasswordFormData,
    { rejectWithValue }
) => {
    try {
        const apiCall = await changePassword(formData);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError<ChangePasswordFormDataErrors>(error, rejectWithValue);
    }
});

export const deleteUserAccount = createAsyncThunk('user/deleteAccount', async (password: string, { rejectWithValue }) => {
    try {
        const apiCall = await deleteAccount({ password });

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError<DeleteAccountFormDataError>(error, rejectWithValue);
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
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.data;

                // update storage
                setUserDataInLS(payload.data);
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
            })

            // logout
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = INIT_STATE;

                // clear storage
                removeUserDataFromLS();
            })
            .addCase(logoutUser.rejected, (state) => {
                state.isLoading = false;
            })

            // upload avatar
            .addCase(updateUserAvatar.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserAvatar.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateUserAvatar.rejected, (state) => {
                state.isLoading = false;
            })

            // change password
            .addCase(userChangePassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userChangePassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(userChangePassword.rejected, (state) => {
                state.isLoading = false;
            })

            // delete user account
            .addCase(deleteUserAccount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUserAccount.fulfilled, (state) => {
                state.isLoading = false;
                state.user = INIT_STATE;

                // clear storage
                removeUserDataFromLS();
            })
            .addCase(deleteUserAccount.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default userSlice.reducer;