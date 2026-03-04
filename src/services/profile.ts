import api from "../api/axios";
import type { ChangePasswordFormData, DeleteAccountFormData } from "../schemas/profileSchema";
import type { NullDataApiResponse } from "../types/api";
import type { ProfileResponse } from "../types/profile";

export async function getProfile(): Promise<ProfileResponse> {
    const response = await api.get('/api/profile');

    return response.data;
}

export async function changePassword(formData: ChangePasswordFormData): Promise<NullDataApiResponse> {
    const response = await api.put('/api/profile/change_password', formData);

    return response.data;
}

export async function deleteAccount(password: DeleteAccountFormData): Promise<NullDataApiResponse> {
    const response = await api.delete('/api/profile', {
        data: password
    });

    return response.data;
}