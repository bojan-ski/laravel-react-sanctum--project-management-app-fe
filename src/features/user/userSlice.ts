import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../../services/auth";
import { changePassword, deleteAccount, uploadAvatar } from "../../services/profile";
import { getUserDataFromLS, removeUserDataFromLS, setUserDataInLS } from "../../utils/storage";
import { handleAsyncThunkError } from "../../utils/reduxErrorHandler";
import type { LoginFormData } from "../../schemas/authSchema";
import type { ChangePasswordFormData } from "../../schemas/profileSchema";
import type { UserState, UserStateErrors } from "../../types/user";
import type { ChangePasswordFormDataErrors } from "../../types/profile";

const initialUserState: UserState = {
    isLoading: false,
    user: getUserDataFromLS() || {
        id: 0,
        name: '',
        email: '',
        avatar: null,
        role: 'user',
        is_admin: false,
        created_at: '',
        updated_at: ''
    }
};

export const loginUser = createAsyncThunk("user/loginUser", async (
    { email, password }: LoginFormData,
    { rejectWithValue }
) => {
    try {
        const apiCall = await login(email, password);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError<UserStateErrors>(error, rejectWithValue);
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
        return handleAsyncThunkError<UserStateErrors>(error, rejectWithValue);
    }
});

export const uploadUserAvatar = createAsyncThunk('user/uploadAvatar', async (
    avatar: File,
    { rejectWithValue }
) => {
    try {
        const apiCall = await uploadAvatar(avatar);
        console.log(apiCall);

        return apiCall;
    } catch (error: any) {
        console.log(error);

        return handleAsyncThunkError<UserStateErrors>(error, rejectWithValue);
    }
});

export const userChangePassword = createAsyncThunk('user/userChangePassword', async (
    formData: ChangePasswordFormData,
    { rejectWithValue }
) => {
    try {
        const apiCall = await changePassword(formData);
        console.log(apiCall);

        return apiCall;
    } catch (error: any) {
        console.log(error);

        return handleAsyncThunkError<ChangePasswordFormDataErrors>(error, rejectWithValue);
    }
});

export const deleteUserAccount = createAsyncThunk('user/deleteAccount', async (password: string, { rejectWithValue }) => {
    try {
        const apiCall = await deleteAccount({ password });
        console.log(apiCall);

        return apiCall;
    } catch (error: any) {
        console.log(error);

        return handleAsyncThunkError<UserStateErrors>(error, rejectWithValue);
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

                // clear storage
                removeUserDataFromLS();
            })
            .addCase(logoutUser.rejected, (state) => {
                state.isLoading = false;
            })

            // upload avatar
            .addCase(uploadUserAvatar.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadUserAvatar.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.data;

                // update storage
                setUserDataInLS(payload.data);
            })
            .addCase(uploadUserAvatar.rejected, (state) => {
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

                // clear storage
                removeUserDataFromLS();
            })
            .addCase(deleteUserAccount.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default userSlice.reducer;