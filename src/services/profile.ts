import api from "../api/axios";
import type { ChangePasswordFormData, DeleteAccountFormData } from "../schemas/profileSchema";
import type { DeleteAccountResponse, PasswordChangeResponse, ProfileResponse } from "../types/profile";

export async function getProfile(): Promise<ProfileResponse> {
    const response = await api.get<ProfileResponse>('/api/profile');
    console.log(response);

    return response.data;
}

export async function uploadAvatar(file: File): Promise<ProfileResponse> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post<ProfileResponse>('/api/profile/upload_avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    console.log(response);

    return response.data;
}

export async function changePassword(formData: ChangePasswordFormData): Promise<PasswordChangeResponse> {
    const response = await api.put<PasswordChangeResponse>('/api/profile/change_password', formData);
    console.log(response);

    return response.data;
}

export async function deleteAccount(password: DeleteAccountFormData): Promise<DeleteAccountResponse> {
    const response = await api.delete<DeleteAccountResponse>('/api/profile/destroy', {
        data: { password }
    });
    console.log(response);

    return response.data;
}