import api from "../api/axios";
import type {
    GetNotificationsResponse,
    CountResponse,
    GetNotificationResponse,
    GetMarkAsReadResponse
} from "../types/notification";

export async function getNotifications(unread: boolean): Promise<GetNotificationsResponse> {
    const response = await api.get('/api/notifications', {
        params: {
            unread
        }
    });

    return response.data;
}

export async function getUnreadCount(): Promise<CountResponse> {
    const response = await api.get('/api/notifications/unread_count');

    return response.data;
}

export async function markAsRead(notificationId: number): Promise<GetMarkAsReadResponse> {
    const response = await api.post(`/api/notifications/${notificationId}/read`);

    return response.data;
}

export async function markAllAsRead(): Promise<CountResponse> {
    const response = await api.post('/api/notifications/read_all');

    return response.data;
}

export async function acceptInvitation(notificationId: number): Promise<GetNotificationResponse> {
    const response = await api.post(`/api/notifications/${notificationId}/accept_invitation`);

    return response.data;
}

export async function declineInvitation(notificationId: number): Promise<GetNotificationResponse> {
    const response = await api.post(`/api/notifications/${notificationId}/decline_invitation`);

    return response.data;
};