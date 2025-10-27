import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CreateNewProjectErrors, LaravelValidationErrors, NewProjectFormData, NewProjectState } from "../../types/types";
import { createProject } from "../../services/project";

const initialNewProjectState: NewProjectState = {
    isLoading: false,
    formData: {
        title: '',
        description: '',
        deadline: ''
    },
    errors: {},
};

export const addNewProject = createAsyncThunk('newProject/addNewProject', async (newProjectData: NewProjectFormData, { rejectWithValue }) => {
    try {
        const apiCall = await createProject(newProjectData);

        return apiCall;
    } catch (error: any) {
        if (error.response?.status === 422) {
            const fieldErrors = error?.response?.data?.errors as LaravelValidationErrors;
            const formattedErrors: CreateNewProjectErrors = {};

            Object.keys(fieldErrors).forEach((key) => {
                formattedErrors[key as keyof CreateNewProjectErrors] = fieldErrors[key][0];
            });

            return rejectWithValue(formattedErrors);
        } else {
            return rejectWithValue({ random: error.response.statusText || "Error - Create new project" });
        }
    }
});

const createProjectSlice = createSlice({
    name: 'newProject',
    initialState: initialNewProjectState,
    reducers: {
        setNewProjectFormData: (state, { payload }): void => {
            state.formData = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewProject.pending, (state) => {
                state.isLoading = true;
                state.errors = {};
            })
            .addCase(addNewProject.fulfilled, (state) => {
                state.isLoading = false;
                state.formData = initialNewProjectState.formData;
            })
            .addCase(addNewProject.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.errors = payload as CreateNewProjectErrors;
            });
    },
});

export const {
    setNewProjectFormData
} = createProjectSlice.actions;
export default createProjectSlice.reducer;