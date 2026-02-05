import api from "../api/axios";
import type { UpdateUserAvatarResponse } from "../types/avatar";

export async function updateAvatar(file: File): Promise<UpdateUserAvatarResponse> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post<UpdateUserAvatarResponse>('/api/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}