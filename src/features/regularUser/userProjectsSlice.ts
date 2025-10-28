import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProjects } from "../../services/project";
import type { UserProjectsState } from "../../types/types";

const initialUserProjectsState: UserProjectsState = {
    isLoading: false,
    userProjects: [],
    filterOwnership: '',
    filterStatus: '',
    currentPage: 1,
    lastPage: 1,
    total: 0,
    error: '',
};

type getAllUserProjectsProps = {
    ownership?: string;
    status?: string;
    page?: number;
};

export const getAllUserProjects = createAsyncThunk('userProjects/getAllUserProjects', async (
    { ownership, status, page }: getAllUserProjectsProps,
    { rejectWithValue }
) => {
    console.log('getUserProjects');

    try {
        const apiCall = await getUserProjects(ownership, status, page);

        return apiCall.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.statusText || 'Error - Fetch users');
    }
});

const userProjectsSlice = createSlice({
    name: 'userProjects',
    initialState: initialUserProjectsState,
    reducers: {
        setFilterOwnership: (state, { payload }): void => {
            state.filterOwnership = payload;
            state.currentPage = 1;
        },
        setFilterStatus: (state, { payload }): void => {
            state.filterStatus = payload;
            state.currentPage = 1;
        },
        setUserProjectsPage: (state, { payload }): void => {
            state.currentPage = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // get all projects
            .addCase(getAllUserProjects.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(getAllUserProjects.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.userProjects = payload.data;
                state.currentPage = payload.current_page;
                state.lastPage = payload.last_page;
                state.total = payload.total;
            })
            .addCase(getAllUserProjects.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload as string;
            });
    },
});

export const {
    setFilterOwnership,
    setFilterStatus,
    setUserProjectsPage
} = userProjectsSlice.actions;
export default userProjectsSlice.reducer;