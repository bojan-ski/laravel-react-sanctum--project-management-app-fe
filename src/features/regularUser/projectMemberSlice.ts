import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleAsyncThunkError } from "../../utils/reduxErrorHandler";
import { getAvailableUsers, inviteMembers, removeMember } from "../../services/member";
import type { Member, ProjectMembersState } from "../../types/member";
import type { User } from "../../types/user";

const initialProjectMembersState: ProjectMembersState = {
    isLoading: false,
    availableUsers: [],
    members: [],
    membersLimit: 0,
};

export const getAllAvailableUsers = createAsyncThunk('projectMembers/fetchAvailableUsers', async (
    projectId: number,
    { rejectWithValue }
) => {
    console.log('getAllAvailableUsers');

    try {
        const apiCall = await getAvailableUsers(projectId);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError(error, rejectWithValue);
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
        return handleAsyncThunkError(error, rejectWithValue);
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
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

const projectMemberSlice = createSlice({
    name: 'projectMembers',
    initialState: initialProjectMembersState,
    reducers: {
        setMembers(state, { payload }) {
            state.members = payload.members;
            state.membersLimit = payload.membersLimit;
        },
    },
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
            .addCase(inviteSelectedUsers.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.availableUsers = state.availableUsers.filter(
                    (user: User) => !payload.data.user_ids.includes(user.id)
                );
            })
            .addCase(inviteSelectedUsers.rejected, (state) => {
                state.isLoading = false;
            })

            // remove selected member from project
            .addCase(removeSelectedMember.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeSelectedMember.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.members = state.members.filter((member: Member) => member.id !== payload.data.member_id);
            })
            .addCase(removeSelectedMember.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setMembers } = projectMemberSlice.actions;
export default projectMemberSlice.reducer;