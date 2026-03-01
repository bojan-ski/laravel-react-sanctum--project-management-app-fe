import api from "../api/axios";
import type { AllProjectStatsResponse, GetAllProjectsResponse } from "../types/admin";
import type { NewUserFormData } from "../types/types";

export async function getUsers(
    search: string = '',
    page: number = 1
) {
    const response = await api.get(`/api/admin/users`, {
        params: { search, page },
    });

    return response.data;
}

export async function createUser(newUserData: NewUserFormData) {
    const response = await api.post('/api/admin/users', newUserData);

    return response.data;
}

export async function deleteUser(userId: number | string) {
    const response = await api.delete(`/api/admin/users/${userId}`);

    return response.data;
}

export async function getAllProjects(
    search: string = '',
    page: number = 1
): Promise<GetAllProjectsResponse> {
    const response = await api.get(`/api/admin/projects`, {
        params: {
            search,
            page
        },
    });

    return response.data;
}

export async function getAllProjectStats(): Promise<AllProjectStatsResponse> {
    const response = await api.get('/api/admin/projects/stats');

    return response.data;
}