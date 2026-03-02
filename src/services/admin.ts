import api from "../api/axios";
import type { AddUserFormData } from "../schemas/admin/userSchema";
import type {
    AddNewUserResponse,
    AllProjectStatsResponse,
    DeleteUserResponse,
    GetAllProjectsResponse,
    SelectedRegularUserDetailsResponse,
    GetUsersResponse
} from "../types/admin";

export async function getUsers(
    search: string = '',
    page: number = 1
): Promise<GetUsersResponse> {
    const response = await api.get(`/api/admin/users`, {
        params: { search, page },
    });

    return response.data;
}

export async function addUser(formData: AddUserFormData): Promise<AddNewUserResponse> {
    const response = await api.post('/api/admin/users', formData);

    return response.data;
}

export async function getUser(userId: number): Promise<SelectedRegularUserDetailsResponse> {
    const response = await api.get(`/api/admin/users/${userId}`);

    return response.data;
}

export async function deleteUser(userId: number): Promise<DeleteUserResponse> {
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