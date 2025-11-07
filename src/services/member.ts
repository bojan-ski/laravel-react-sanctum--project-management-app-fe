import api from "../api/axios";

export const getAvailableUsers = async (projectId: number) => {
    const response = await api.get(`/api/projects/${projectId}/members/available`);

    return response.data;
};

export const inviteMembers = async (projectId: number, userIds: number[]) => {
    const response = await api.post(`/api/projects/${projectId}/members/invite`, {
        user_ids: userIds
    });

    return response.data;
};