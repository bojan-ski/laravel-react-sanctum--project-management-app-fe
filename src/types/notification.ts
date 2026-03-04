import type { ApiResponse } from "./api";

export type Notification = {
    id: number;
    type: string;
    notifiable_id: number;
    notifiable_type: string;
    data: {
        sender_name: string;
        message: number;
    };
    action_taken: string | null;
    is_invitation: boolean;
    is_pending: boolean;
    read_at: string | null;
    created_at: string;
};

// api response
export type GetNotificationsResponse = {
    data: Notification[];
} & ApiResponse;

export type CountResponse = {
    data: {
        count: number;
    };
} & ApiResponse;

export type GetMarkAsReadResponse = {
    data: {
        id: number;
    };
} & ApiResponse;

export type GetNotificationResponse = {
    data: Notification;
} & ApiResponse;

// notification slice
export type NotificationState = {
    isLoading: boolean;
    unreadNotifications: Notification[];
    notifications: Notification[];
    unreadCount: number;
};