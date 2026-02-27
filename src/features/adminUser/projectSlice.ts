import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleAsyncThunkError } from "../../api/reduxErrorHandler";
import type { AllProjectsState, SearchProjectsResponseErrors } from "../../types/admin";
import { getAllProjects } from "../../services/admin";

const initialAllProjectState: AllProjectsState = {
    isLoading: false,
    projects: [],
    search: '',
    pagination: {
        currentPage: 1,
        lastPage: 1,
    },
    total: 0
};

type FetchAllProjectsProps = {
    search?: string;
    page?: number;
};

export const fetchAllProjects = createAsyncThunk('allProjects/fetchAllProjects', async (
    { search, page }: FetchAllProjectsProps,
    { rejectWithValue }
) => {
    console.log('fetchAllProjects');

    try {
        const apiCall = await getAllProjects(search, page);
        console.log(apiCall);

        return apiCall.data;
    } catch (error: any) {
        console.log(error);
        return handleAsyncThunkError<SearchProjectsResponseErrors>(error, rejectWithValue);
    }
});

const projectSlice = createSlice({
    name: 'allProjects',
    initialState: initialAllProjectState,
    reducers: {
        setAllProjectsSearch: (state, { payload }): void => {
            console.log(payload);

            state.search = payload;
            state.pagination.currentPage = 1;
        },
        setAllProjectsPage: (state, { payload }): void => {
            console.log(payload);

            state.pagination.currentPage = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProjects.fulfilled, (state, { payload }) => {
                console.log(payload);

                state.isLoading = false;

                state.projects = payload.data;
                state.pagination.currentPage = payload.current_page;
                state.pagination.lastPage = payload.last_page;
                state.total = payload.total;
            })
            .addCase(fetchAllProjects.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const {
    setAllProjectsSearch,
    setAllProjectsPage,
} = projectSlice.actions;
export default projectSlice.reducer;