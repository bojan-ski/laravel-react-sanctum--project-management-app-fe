export type UserRole = 'user' | 'admin';

export type User = {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    role: UserRole;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
};

export type UserState = {
    isLoading: boolean;
    user: User;
};

export type UserStateErrors = {
    email?: string;
    password?: string;
    avatar?: string;
};