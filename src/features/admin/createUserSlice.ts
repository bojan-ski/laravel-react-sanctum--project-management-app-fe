import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "../../services/admin";
import type { CreateNewUserErrors, LaravelValidationErrors, NewUserFormData, NewUserState } from "../../types/types";

const initialUserState: NewUserState = {
    isLoading: false,
    formData: {
        name: '',
        email: '',
        password: ''
    },
    errors: {},
};

export const addNewUser = createAsyncThunk('newUser/addNewUser', async (newUserData: NewUserFormData, { rejectWithValue }) => {
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

const createUserSlice = createSlice({
    name: 'newUser',
    initialState: initialUserState,
    reducers: {
        setFormData: (state, { payload }):void => {
            state.formData = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewUser.pending, (state) => {
                state.isLoading = true;
                state.errors = {};
            })
            .addCase(addNewUser.fulfilled, (state) => {
                state.isLoading = false;                
                state.formData = initialUserState.formData;
            })
            .addCase(addNewUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.errors = payload as CreateNewUserErrors;
            });
    },
});

export const {
    setFormData
} = createUserSlice.actions;
export default createUserSlice.reducer;