import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAvailableUsers, inviteMembers } from "../../services/member";
import type { ProjectMembersState } from "../../types/types";

const initialProjectMembersState: ProjectMembersState = {
    isLoading: false,
    availableUsers: [],
    error: '',
};

export const getAllAvailableUsers = createAsyncThunk('projectMembers/fetchAvailableUsers', async (
    { projectId }: { projectId: number; },
    { rejectWithValue }
) => {
    try {
        const apiCall = await getAvailableUsers(projectId);

        return apiCall;
    } catch (error: any) {
        return rejectWithValue(error?.response?.statusText || 'Error - Get all available users');
    }
});

type InviteSelectedUsersProps = {
    projectId: number;
    userIds: number[];
};

export const inviteSelectedUsers = createAsyncThunk('projectMembers/inviteMembers', async (
    { projectId, userIds }: InviteSelectedUsersProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await inviteMembers(projectId, userIds);

        return apiCall;
    } catch (error: any) {
        return rejectWithValue(error?.response?.statusText || 'Error - Invite members');
    }
});

const projectMemberSlice = createSlice({
    name: 'projectMembers',
    initialState: initialProjectMembersState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get available users
            .addCase(getAllAvailableUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllAvailableUsers.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.availableUsers = payload.data;
            })
            .addCase(getAllAvailableUsers.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload as string;
            })

            // invite selected users to project
            .addCase(inviteSelectedUsers.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(inviteSelectedUsers.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(inviteSelectedUsers.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload as string;
            });
    },
});

export default projectMemberSlice.reducer;