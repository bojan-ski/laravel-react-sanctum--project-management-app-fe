import api from "../api/axios";
import type { ChangePasswordFormData, UploadAvatarFormData } from "../schemas/profileSchema";

export async function uploadAvatar(formData: UploadAvatarFormData) {
    const response = await api.post('/api/profile/upload_avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}

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