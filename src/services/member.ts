import api from "../api/axios";
import type {
    GetAvailableUsersResponse,
    InviteMembersResponse,
    LeaveProjectResponse,
    RemoveProjectMemberResponse
} from "../types/member";

export const getAvailableUsers = async (projectId: number): Promise<GetAvailableUsersResponse> => {
    const response = await api.get(`/api/projects/${projectId}/members/available`);

    return response.data;
};

export const inviteMembers = async (
    projectId: number,
    userIds: number[]
): Promise<InviteMembersResponse> => {
    const response = await api.post(`/api/projects/${projectId}/members/invite`, {
        user_ids: userIds
    });

    return response.data;
};

export const leaveProject = async (projectId: number): Promise<LeaveProjectResponse> => {
    const response = await api.delete(`/api/projects/${projectId}/members/leave`);

    return response.data;
};

export const removeMember = async (
    projectId: number,
    memberId: number
): Promise<RemoveProjectMemberResponse> => {
    const response = await api.delete(`/api/projects/${projectId}/members/${memberId}/remove`);

    return response.data;
};