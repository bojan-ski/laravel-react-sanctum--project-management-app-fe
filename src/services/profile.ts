import api from "../api/axios";
import type { ChangePasswordFormData } from "../schemas/profileSchema";

export async function changePassword(formData: ChangePasswordFormData) {
    const response = await api.put('/api/profile/change_password', formData);

    return response.data;
}

export async function deleteAccount(password: string) {
    const response = await api.delete('/api/profile', {
        data: { password }
    });    

    return response.data;
}