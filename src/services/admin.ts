import api from "../api/axios";
import type { NewUserFormData } from "../types/types";

export async function getUsers(page: number) {  
    const response = await api.get(`/api/admin/users`, {
        params: { page },
    });

    return response.data;
}

export async function createUser(newUserData: NewUserFormData) {
    const response = await api.post('/api/admin/users', newUserData);

    return response.data;
}