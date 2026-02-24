import api from "../api/axios";
import type { NullDataApiResponse } from "../types/api";

export async function updateAvatar(file: File): Promise<NullDataApiResponse> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post('/api/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}