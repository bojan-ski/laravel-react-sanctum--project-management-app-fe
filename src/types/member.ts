import type { ApiResponse } from "./api";
import type { User } from "./user";

export type Member = {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    is_owner: boolean;
    joined_at: string;
};

// api response
export type GetAvailableUsersResponse = {
    data: User[];
} & ApiResponse;

export type InviteMembersResponse = {
    data: {
        member_ids: number[];
    };
} & ApiResponse;

export type LeaveProjectResponse = {
    data: {
        project_id: number;
    };
} & ApiResponse;

export type RemoveProjectMemberResponse = {
    data: {
        member_id: number;
    };
} & ApiResponse;

// member slice
export type ProjectMembersState = {
    isLoading: boolean;
    availableUsers: User[];
    members: Member[];
    membersLimit: number;
};