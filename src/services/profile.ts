import api from "../api/axios";
import type { ChangePasswordFormData } from "../types/types";

export async function changePassword(formData: ChangePasswordFormData) {
    const response = await api.put('/api/profile/change_password', formData);   

    return response.data;
}