import api from "../api/axios";
import type { ChangePasswordFormData, DeleteAccountFormData } from "../schemas/profileSchema";
import type { DeleteAccountResponse, ChangePasswordResponse, ProfileResponse } from "../types/profile";

export async function getProfile(): Promise<ProfileResponse> {
    const response = await api.get<ProfileResponse>('/api/profile');

    return response.data;
}

export async function changePassword(formData: ChangePasswordFormData): Promise<ChangePasswordResponse> {
    const response = await api.put<ChangePasswordResponse>('/api/profile/change_password', formData);

    return response.data;
}

export async function deleteAccount(password: DeleteAccountFormData): Promise<DeleteAccountResponse> {
    const response = await api.delete<DeleteAccountResponse>('/api/profile/destroy', {
        data: password
    });

    return response.data;
}