import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleAsyncThunkError } from "../../api/reduxErrorHandler";
import { getAllProjects, getAllProjectStats } from "../../services/admin";
import type { AllProjectsState, SearchProjectsResponseErrors } from "../../types/admin";

const initialAllProjectState: AllProjectsState = {
    isLoading: false,
    stats: {
        total: 0,
        by_status: {
            pending: 0,
            active: 0,
            completed: 0,
            closed: 0,
        },
        created_this_month: 0,
        created_this_week: 0
    },
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
    try {
        const apiCall = await getAllProjects(search, page);

        return apiCall.data;
    } catch (error: any) {
        return handleAsyncThunkError<SearchProjectsResponseErrors>(error, rejectWithValue);
    }
});

export const fetchAllProjectStats = createAsyncThunk('allProjects/fetchAllProjectStats', async (
    _,
    { rejectWithValue }
) => {
    try {
        const apiCall = await getAllProjectStats();

        return apiCall.data;
    } catch (error: any) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

const projectSlice = createSlice({
    name: 'allProjects',
    initialState: initialAllProjectState,
    reducers: {
        setAllProjectsSearch: (state, { payload }): void => {
            state.search = payload;
            state.pagination.currentPage = 1;
        },
        setAllProjectsPage: (state, { payload }): void => {
            state.pagination.currentPage = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // get all projects
            .addCase(fetchAllProjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProjects.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.projects = payload.data;
                state.pagination.currentPage = payload.current_page;
                state.pagination.lastPage = payload.last_page;
                state.total = payload.total;
            })
            .addCase(fetchAllProjects.rejected, (state) => {
                state.isLoading = false;
            })

            // get all projects stats
            .addCase(fetchAllProjectStats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProjectStats.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                
                state.stats = payload;
            })
            .addCase(fetchAllProjectStats.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const {
    setAllProjectsSearch,
    setAllProjectsPage,
} = projectSlice.actions;
export default projectSlice.reducer;