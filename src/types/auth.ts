export type AuthResponse = {
    is_admin: boolean;
    is_authenticated: boolean;
};

export type AuthState = {
    isLoading: boolean;
    user: AuthResponse;
};

export type LoginResponse = {
    status: 'success';
    message: string;
    data: AuthResponse;
};

export type LogoutResponse = {
    status: 'success';
    message: string;
    data: null;
};

export type AuthStateErrors = {
    email?: string;
    password?: string;
};