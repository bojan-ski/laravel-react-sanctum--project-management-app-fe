import type { User } from "./user";

export type Member = {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    joined_at: string;
};

// regularUser/notificationSlice
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

export type NotificationState = {
    isLoading: boolean;
    unreadNotifications: Notification[];
    notifications: Notification[];
    unreadCount: number;
    error: string;
};

// regularUser/projectMemberSlice
export type ProjectMembersState = {
    isLoading: boolean;
    availableUsers: User[];
};

// adminUser/createUserSlice
export type NewUserFormData = {
    name: string;
    email: string;
    password: string;
};

export type CreateNewUserErrors = {
    name?: string;
    email?: string;
    password?: string;
    random?: string;
};

export type NewUserState = {
    isLoading: boolean;
    formData: NewUserFormData;
    errors: CreateNewUserErrors;
};

// adminUser/usersSlice
export type UsersState = {
    isLoading: boolean;
    users: User[];
    search: string;
    currentPage: number;
    lastPage: number;
    total: number;
    error: string;
};