import api from "../api/axios";
import type { ChangePasswordFormData } from "../types/types";

export async function changePassword(formData: ChangePasswordFormData) {
    const response = await api.put('/api/profile/change_password', formData);

    return response.data;
}

export async function deleteAccount(password: string) {
    const response = await api.delete('/api/profile', {
        data: { password }
    });    
    console.log(response);

    return response.data;
}