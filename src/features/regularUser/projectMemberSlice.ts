import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAvailableUsers, inviteMembers, removeMember } from "../../services/member";
import type { ProjectMembersState } from "../../types/types";

const initialProjectMembersState: ProjectMembersState = {
    isLoading: false,
    availableUsers: []
};

export const getAllAvailableUsers = createAsyncThunk('projectMembers/fetchAvailableUsers', async (
    projectId: number,
    { rejectWithValue }
) => {
    try {
        const apiCall = await getAvailableUsers(projectId);

        return apiCall;
    } catch (error: any) {
        return rejectWithValue(error.response.statusText || 'Error - Get all available users');
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
        if (error.response?.status === 500) {
            return rejectWithValue(error.response.data.message);
        }

        return rejectWithValue(error.response.statusText || 'Error - Invite members');
    }
});

type RemoveSelectedMemberProps = {
    projectId: number;
    memberId: number;
};

export const removeSelectedMember = createAsyncThunk('projectMembers/removeSelectedMember', async (
    { projectId, memberId }: RemoveSelectedMemberProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await removeMember(projectId, memberId);

        return apiCall;
    } catch (error: any) {
        if (error.response?.status === 500) {
            return rejectWithValue(error.response.data.message);
        }

        return rejectWithValue(error.response.statusText || 'Error - Remove member');
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
            .addCase(getAllAvailableUsers.rejected, (state) => {
                state.isLoading = false;
            })

            // invite selected users to project
            .addCase(inviteSelectedUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(inviteSelectedUsers.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(inviteSelectedUsers.rejected, (state) => {
                state.isLoading = false;
            })

            // remove selected member from project
            .addCase(removeSelectedMember.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeSelectedMember.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(removeSelectedMember.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default projectMemberSlice.reducer;