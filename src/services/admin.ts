import api from "../api/axios";
import type { NewUserFormData } from "../types/types";

export async function createUser(newUserData: NewUserFormData) {    
    const response = await api.post('/api/admin/users', newUserData);

    return response.data;
}