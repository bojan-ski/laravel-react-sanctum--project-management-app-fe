import api from "../api/axios";
import type { NullDataApiResponse } from "../types/api";
import type { DeleteMessageResponse, GetMessagesResponse, SendMessageResponse } from "../types/message";

export async function getMessages(taskId: number): Promise<GetMessagesResponse> {
    const response = await api.get(`/api/tasks/${taskId}/messages`);

    return response.data;
}

export async function sendMessage(
    taskId: number,
    message: string
): Promise<SendMessageResponse> {
    const response = await api.post(`/api/tasks/${taskId}/messages/store`, { message });

    return response.data;
}

export async function markMessagesAsRead(taskId: number): Promise<NullDataApiResponse> {
    const response = await api.post(`/api/tasks/${taskId}/messages/mark_as_read`);

    return response.data;
}

export async function deleteMessage(
    taskId: number,
    messageId: number
): Promise<DeleteMessageResponse> {
    const response = await api.delete(`/api/tasks/${taskId}/messages/${messageId}`);

    return response.data;
}