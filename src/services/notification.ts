import api from "../api/axios";
import type {
    GetNotificationsResponse,
    GetCountResponse,
    GetNotificationResponse,
    GetMarkAsReadResponse
} from "../types/notification";

export async function getNotifications(unread: boolean): Promise<GetNotificationsResponse> {
    const response = await api.get('/api/notifications', {
        params: {
            unread
        }
    });
    console.log(response);

    return response.data;
}

export async function getUnreadCount(): Promise<GetCountResponse> {
    const response = await api.get('/api/notifications/unread_count');
    console.log(response);

    return response.data;
}

export async function markAsRead(notificationId: number): Promise<GetMarkAsReadResponse> {
    const response = await api.post(`/api/notifications/${notificationId}/read`);
    console.log(response);

    return response.data;
}

export async function markAllAsRead(): Promise<GetCountResponse> {
    const response = await api.post('/api/notifications/read_all');
    console.log(response);

    return response.data;
}

export async function acceptInvitation(notificationId: number): Promise<GetNotificationResponse> {
    const response = await api.post(`/api/notifications/${notificationId}/accept_invitation`);
    console.log(response);

    return response.data;
}

export async function declineInvitation(notificationId: number): Promise<GetNotificationResponse> {
    const response = await api.post(`/api/notifications/${notificationId}/decline_invitation`);
    console.log(response);

    return response.data;
};