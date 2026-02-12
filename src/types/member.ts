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
    status: 'success';
    message: string;
    data: User[];
};

export type InviteMembersResponse = {
    status: 'success';
    message: string;
    data: {
        member_ids: number[]
    };
};

export type LeaveProjectResponse = {
    status: 'success';
    message: string;
    data: {
        project_id: number
    };
};

export type RemoveProjectMemberResponse = {
    status: 'success';
    message: string;
    data: {
        member_id: number
    };
};

// member slice
export type ProjectMembersState = {
    isLoading: boolean;
    availableUsers: User[];
    members: Member[];
    membersLimit: number;
};