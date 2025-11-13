import api from "../api/axios";

export async function getNotifications() {
    const response = await api.get('/api/notifications');

    return response.data;
}

export async function getUnreadCount() {
    const response = await api.get('/api/notifications/unread_count');

    return response.data;
}

export async function markAsRead(notificationId: number) {
    const response = await api.post(`/api/notifications/${notificationId}/read`);

    return response.data;
}

export async function markAllAsRead() {
    const response = await api.post('/api/notifications/mark_all_as_read');

    return response.data;
}

export async function acceptInvitation(notificationId: number) {
    const response = await api.post(`/api/notifications/${notificationId}/accept`);

    return response.data;
}
