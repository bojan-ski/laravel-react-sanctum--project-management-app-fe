export type Notification = {
    id: number;
    type: string;
    notifiable_id: number;
    notifiable_type: string;
    data: any;
    action_taken: string | null;
    is_invitation: boolean;
    is_pending: boolean;
    read_at: string | null;
    created_at: string;
};

// api response
export type GetNotificationsResponse = {
    status: 'success';
    message: string;
    data: Notification[];
};

export type GetCountResponse = {
    status: 'success';
    message: string;
    data: {
        count: number;
    };
};

export type GetMarkAsReadResponse = {
    status: 'success';
    message: string;
    data: {
        id: number;
    };
};

export type GetNotificationResponse = {
    status: 'success';
    message: string;
    data: Notification;
};

// notification slice
export type NotificationState = {
    isLoading: boolean;
    unreadNotifications: Notification[];
    notifications: Notification[];
    unreadCount: number;
};